import { Component, OnInit } from '@angular/core';
import { UserReadService } from '../../../services/user/user-read.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/security/authentication.service';

@Component({
  selector: 'app-my-profile',
  imports: [],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{

  email: string = '';
  nomeCompleto: string = '';

  constructor(private userReadService: UserReadService, private router: Router, private authenticationService: AuthenticationService){ }

  async ngOnInit(){
    let user = await this.userReadService.findById('1');
    console.log('on init');

    if(user== null){
      console.log('user not found');
      console.error('Id não encontrado');
      this.authenticationService.logout;
      this.router.navigate(['account/sign-in']);
      return;
    }
    console.log('user founded');

    this.email = user.email;
    this.nomeCompleto = user.fullname;
    console.log(user);
  }
   
}
