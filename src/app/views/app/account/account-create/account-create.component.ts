import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountCreateService } from '../../../../services/account/account-create/account-create.service';
import { Account } from '../../../../domain/model/account';
import { AccountReadService } from '../../../../services/account/account-read/account-read.service';
import { firstValueFrom } from 'rxjs';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-account-create',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './account-create.component.html',
  styleUrl: './account-create.component.css'
})
export class AccountCreateComponent   implements OnInit{

  form: FormGroup;

  accountMinLength: number = 2;
  accountMaxLength: number = 40;
  usernameMinLength: number = 2;
  usernameMaxLength: number = 40;

  nomeCompleto: string = '';

  userId: string = '-1';
  

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,private toast: ToastrService, private router: Router,private accountCreateService: AccountCreateService, private accountReadService: AccountReadService) {
    this.inicializeForm();
  }
  

  async ngOnInit() {
    
  }

  inicializeForm() {
    this.form = this.formBuilder.group({
      account: ['', [
        Validators.required,
        Validators.minLength(this.accountMinLength),
        Validators.maxLength(this.accountMaxLength),
      ]],
      username: ['', [
        Validators.required,
        Validators.minLength(this.usernameMinLength),
        Validators.maxLength(this.usernameMaxLength),
      ]],
      password: ['', [
        Validators.required,
      ]],
      confirmPassword: ['', [
        Validators.required,
      ]],
      mainKey: ['', [
        Validators.required,
      ]],
    });
  }

  async create(){


    this.userId = await this.accountCreateService.getNextAccountId();

    let encryptPassword = this.encryptPassword(this.form.controls['password'].value, this.form.controls['mainKey'].value);

    let aux ={
      id: this.userId,
      account: this.form.controls['account'].value,
      username: this.form.controls['username'].value,
      password: encryptPassword,
    }

    let account: Account = this.createAccount(aux);

    try {
      await firstValueFrom(this.accountCreateService.create(account));

      this.toast.success(`Dados de ${account.account} foram salvos com sucesso.`);

      this.router.navigate(['account/list']);
    } catch (error: any) {
      this.toast.error(error.message);
    }
  }

   createAccount(aux: { id: string; account: string; username: string;  password: string;}): any{
    

    return {
      id: aux.id,
      account: aux.account,
      username: aux.username,
      password: aux.password,
    };
  }

  validadeFields(){
    if(!this.validadeAccountName()){
      return false;
    }
    if(!this.validadeUsername()){
      return false;
    }
    if(!this.validadePassword()){
      return false;
    }
    if(!this.validadeConfirmPassword()){
      return false;
    }
    return true;
  }
  validadeUsername() {
    return this.form.controls['username'].valid;
  }

  validadeAccountName(){
    return this.form.controls['account'].valid;
  }

  validadePassword(){
    return this.form.controls['password'].valid;
  }

  validadeConfirmPassword(){
    return this.form.controls['confirmPassword'].valid;
  }

  arePasswordsValid() : boolean{

    return this.form.controls['password'].value === this.form.controls['confirmPassword'].value;
  }

  encryptPassword(password: string, mainKey: string): string {
    return CryptoJS.AES.encrypt(password, mainKey).toString();
  }

  decryptPassword(encryptedPassword: string, mainKey: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, mainKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

}
