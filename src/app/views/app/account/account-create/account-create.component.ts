import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountCreateService } from '../../../../services/account/account-create/account-create.service';
import { Account } from '../../../../domain/model/account';

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
  

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,private toast: ToastrService, private router: Router,private accountCreateService: AccountCreateService){
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
        Validators.minLength(this.usernameMinLength),
        Validators.maxLength(this.usernameMaxLength),
      ]]
    });
  }

  async create(){
    console.log('atualizando dados');

    let aux ={
      id: this.userId,
      account: this.form.controls['account'].value,
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
      confirmPassword: this.form.controls['password'].value,
    }

    let account: Account = this.createAccount(aux);

    try {
      // await this.accountCreateService.create(account);

      this.toast.success(`Dados de ${account.account} foram salvos com sucesso.`);

      this.router.navigate(['account/list']);
    } catch (error: any) {
      this.toast.error(error.message);
    }
    
    

    console.log(account);
  }

   createAccount(aux: { id: string; account: string; username: string;  password: string;  confirmPassword: string; }): any{
    

    return {
      id: aux.id,
      account: aux.account,
      username: aux.username,
      password: aux.password,
      confirmPassword: aux.confirmPassword
    };
  }

  validadeFields(){
    if(!this.validadeAccountName()){
      return false;
    }
    if(!this.validadeUsername()){
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

}
