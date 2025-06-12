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

  nomeCompleto: string = '';

  userId: string = '-1';
  

  constructor(private accountReadService: AccountReadService, private route: ActivatedRoute, private formBuilder: FormBuilder,private toast: ToastrService, private router: Router,private accountUpdateService: AccountUpdateService){
    this.inicializeForm();
  }
  

  async ngOnInit() {
    this.userId = await this.route.snapshot.paramMap.get('id')!;
    this.loadUserById(this.userId);
  }

  inicializeForm() {
    this.form = this.formBuilder.group({
      account: ['', [
        Validators.required,
        Validators.minLength(this.accountMinLength),
        Validators.maxLength(this.accountMaxLength),
      ]]
    });
  }

  async loadUserById(userId: string){
    let user = await this.accountReadService.findById(userId!);

    this.form.controls['account'].setValue(user.account);
  }

  async update(){
    console.log('atualizando dados');

    let user ={
      id: this.userId,
      account: this.form.controls['account'].value,
    }

    try {
      await this.accountUpdateService.update(user.id,user.account);

      this.toast.success(`Dados de ${user.account} foram salvos com sucesso.`);

      this.router.navigate(['account/list']);
    } catch (error: any) {
      this.toast.error(error.message);
    }
    
    

    console.log(user);
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
