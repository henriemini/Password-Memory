import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountReadService } from '../../../services/account/account-read/account-read.service';

@Component({
  selector: 'app-main-profile',
  imports: [],
  templateUrl: './main-profile.component.html',
  styleUrl: './main-profile.component.css'
})
export class MainProfileComponent implements OnInit{

  username: string = '';
  account: string = '';

  constructor(private accountReadService: AccountReadService, private router: Router){ }

  async ngOnInit(){
    let user = await this.accountReadService.findById('1');
    console.log('on init');

    if(user== null){
      console.log('user not found');
      console.error('Id não encontrado');
      this.router.navigate(['account/sign-in']);
      return;
    }
    console.log('user founded');

    this.username = user.username;
    this.account = user.account;
    console.log(user);
  }
   
}
