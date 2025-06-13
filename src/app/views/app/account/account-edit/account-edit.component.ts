import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountReadService } from '../../../../services/account/account-read/account-read.service';
import { AccountUpdateService } from '../../../../services/account/account-update/account-update.service';

@Component({
  selector: 'app-account-edit',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './account-edit.component.html',
  styleUrl: './account-edit.component.css'
})
export class AccountEditComponent  implements OnInit{

  form: FormGroup;

  accountMinLength: number = 2;
  accountMaxLength: number = 40;

  usernameMinLength: number = 2;
  usernameMaxLength: number = 40;

  nomeCompleto: string = '';

  accountId: string = '-1';
  

  constructor(private accountReadService: AccountReadService, private route: ActivatedRoute, private formBuilder: FormBuilder,private toast: ToastrService, private router: Router,private accountUpdateService: AccountUpdateService){
    this.inicializeForm();
  }
  

  async ngOnInit() {
    this.accountId = await this.route.snapshot.paramMap.get('id')!;
    this.loadUserById(this.accountId);
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
    });
  }

  async loadUserById(accountId: string){
    let account = await this.accountReadService.findById(accountId!);

    this.form.controls['account'].setValue(account.account);
    this.form.controls['username'].setValue(account.username);
  }

  async update(){

    let account ={
      id: this.accountId,
      account: this.form.controls['account'].value,
      username: this.form.controls['username'].value,
    }

    try {
      await this.accountUpdateService.update(account.id,account.account, account.username);

      this.toast.success(`Dados de ${account.account} foram salvos com sucesso.`);

      this.router.navigate(['account/list']);
    } catch (error: any) {
      this.toast.error(error.message);
    }
    
  }

  validadeFields(){
    if(!this.validadeAccountName()){
      return false;
    }
    return true;
  }

  validadeAccountName(){
    return this.form.controls['account'].valid;
  }

}
