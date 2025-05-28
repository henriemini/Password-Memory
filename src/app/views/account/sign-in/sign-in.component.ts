import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormControlDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'


import * as fontawesome from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-sign-in',
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
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {


  email = new FormControl(null);
  password = new FormControl(null, [Validators.minLength(2), Validators.maxLength(4)]);

  isLoginIncorrect: boolean = false;

  constructor(){
    console.log('sign-in constructor');
  }

  ngOnInit(): void {
    console.log('NgOninit');
    this.isLoginIncorrect = false;
  }

  validateFields(){
    return this.email.valid && this.password.valid;
  }

  login(){
    console.log('botão de login clicado');
  }


}
