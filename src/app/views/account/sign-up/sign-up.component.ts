import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@Component({
  selector: 'app-sign-up',
  imports: [

    RouterOutlet,
    MatToolbarModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatInputModule,

  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  
  

  form: FormGroup;

  fullnameMinLength: number = 2;
  fullnameMaxLength: number = 10;

  passwordMinLength: number = 2;
  passwordMaxLength: number = 10;

  constructor(private formBuilder: FormBuilder){
    this.initializeForm();
  }

  ngOnInit(): void {
    
  }

  initializeForm(){
    console.log('formulario de sign-up sendo inicializado')
    this.form = this.formBuilder.group({
      fullname: ['',[Validators.required, Validators.minLength(this.fullnameMinLength), Validators.maxLength(this.fullnameMaxLength)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(this.passwordMinLength), Validators.maxLength(this.passwordMaxLength)]],
      repeatPassword: ['',[Validators.required, Validators.minLength(this.passwordMinLength), Validators.maxLength(this.passwordMaxLength)]],
    });
  }

  validateFields() : boolean{
/*
    if(!this.form.controls['fullname'].valid){
      return false;
    }

    if(!this.form.controls['email'].valid){
      return false;
    }

    if(!this.form.controls['password'].valid){
      return false;
    }

    if(!this.form.controls['repeatPassword'].valid){
      return false;
    }

    return true;
    */
    
    let isFullnameValid = this.form.controls['fullname'].valid;
    let isEmailValid = this.form.controls['email'].valid;
    let isPasswordValid = this.form.controls['password'].valid;
    let isRepeatPasswordValid = this.form.controls['repeatPassword'].valid;

    if(!this.arePasswordsValid()){
      return false;
    }

    return isFullnameValid
        && isEmailValid
        && isPasswordValid
        && isRepeatPasswordValid;

  }

  arePasswordsValid() : boolean{

    return this.form.controls['password'].value === this.form.controls['repeatPassword'].value;
  }


}
