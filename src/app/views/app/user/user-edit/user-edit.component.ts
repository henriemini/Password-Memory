import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserReadService } from '../../../../services/user/user-read.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserUpdateService } from '../../../../services/user/user-update.service';

@Component({
  selector: 'app-user-edit',
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit{

  form: FormGroup;

  fullnameMinLength: number = 2;
  fullnameMaxLength: number = 20;

  nomeCompleto: string = '';

  userId: string = '-1';
  

  constructor(private userReadService: UserReadService, private route: ActivatedRoute, private formBuilder: FormBuilder,private toast: ToastrService, private router: Router,private userUpdateService: UserUpdateService){
    this.inicializeForm();
  }
  

  async ngOnInit() {
    this.userId = await this.route.snapshot.paramMap.get('id')!;
    this.loadUserById(this.userId);

    // let user = await this.userReadService.findById(userId!);
    // this.nomeCompleto = user.fullname;
  }

  inicializeForm() {
    this.form = this.formBuilder.group({
      fullname: ['', [
        Validators.required,
        Validators.minLength(this.fullnameMinLength),
        Validators.maxLength(this.fullnameMaxLength),
      ]]
    });
  }

  async loadUserById(userId: string){
    let user = await this.userReadService.findById(userId!);

    this.form.controls['fullname'].setValue(user.fullname);
  }

  async update(){
    console.log('atualizando dados');

    let user ={
      id: this.userId,
      fullname: this.form.controls['fullname'].value,
    }

    try {
      await this.userUpdateService.update(user.id,user.fullname);

      this.toast.success(`Dados de ${user.fullname} foram salvos com sucesso.`);

      this.router.navigate(['user/list']);
    } catch (error: any) {
      this.toast.error(error.message);
    }
    
    

    console.log(user);
  }

  validadeFields(){
    if(!this.validadeFullname()){
      return false;
    }
    return true;
  }

  validadeFullname(){
    return this.form.controls['fullname'].valid;
  }

}
