import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountCreateService } from '../../../../services/account/account-create/account-create.service';
import { Account } from '../../../../domain/model/account';
import { AccountReadService } from '../../../../services/account/account-read/account-read.service';
import { firstValueFrom } from 'rxjs';

import * as CryptoJS from 'crypto-js';
import { AccountUpdateService } from '../../../../services/account/account-update/account-update.service';

@Component({
  selector: 'app-account-update-password',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './account-update-password.component.html',
  styleUrl: './account-update-password.component.css'
})
export class AccountUpdatePasswordComponent  implements OnInit{

  form: FormGroup;

  accountMinLength: number = 2;
  accountMaxLength: number = 40;
  usernameMinLength: number = 2;
  usernameMaxLength: number = 40;
  mainKeyMinLength: number = 5;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  showMainKey: boolean = false;

  accountName: string = '';

  accountId: string = '-1';
  

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,private toast: ToastrService, private router: Router,private accountUpdateService: AccountUpdateService, private accountReadService: AccountReadService) {
    this.inicializeForm();
  }
  

  async ngOnInit() {
    this.accountId = await this.route.snapshot.paramMap.get('id')!;
    
    let account = await this.accountReadService.findById(this.accountId!);
    this.accountName = account.account
  }

  inicializeForm() {
    this.form = this.formBuilder.group({
      password: ['', [
        Validators.required,
      ]],
      confirmPassword: ['', [
        Validators.required,
      ]],
      mainKey: ['', [
        Validators.required,
        Validators.minLength(this.mainKeyMinLength),
        this.mainKeyComplexityValidator,
      ]],
    });
  }

  // Validador customizado para complexidade da chave mestra
  mainKeyComplexityValidator(control: any) {
    const value = control.value || '';
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{5,}$/;
    if (value && !regex.test(value)) {
      return { complexity: true };
    }
    return null;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  toggleShowMainKey() {
    this.showMainKey = !this.showMainKey;
  }

  async update(){

    if(this.arePasswordsValid() === false){
      this.toast.error('As senhas não conferem.');
      return;
    }
    
    let encryptPassword = this.encryptPassword(this.form.controls['password'].value, this.form.controls['mainKey'].value);

    let account ={
      id: this.accountId,
      password: encryptPassword,
    }

    let accountById: Account = await this.accountReadService.findById(this.accountId);
    console.log('Account by ID: ',accountById);

    try {
      await this.accountUpdateService.updatePassword(account.id,account.password);

      this.toast.success(`Dados de ${accountById.account} foram salvos com sucesso.`);

      this.router.navigate(['account/list']);
    } catch (error: any) {
      this.toast.error(error.message);
    }
    
  }


  validadeFields(){
    if(!this.validadePassword()){
      return false;
    }
    if(!this.validadeConfirmPassword()){
      return false;
    }
    if(!this.form.controls['mainKey'].valid){
      return false;
    }
    if(!this.arePasswordsValid()){
      return false;
    }
    return true;
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


