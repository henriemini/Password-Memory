import { Component, OnInit } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountReadService } from '../../../../services/account/account-read/account-read.service';
import { AccountDeleteService } from '../../../../services/account/account-delete/account-delete.service';
import { Account } from '../../../../domain/model/account';

@Component({
  selector: 'app-account-list',
  imports: [
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent  implements OnInit{

  fa = fontawesome;

  accounts: Account[] =[];
  
  constructor(
    private accountReadService: AccountReadService, private toast: ToastrService, private accountDeleteService: AccountDeleteService){

  }

  ngOnInit(): void {
    this.loadUsers();
  }
  async loadUsers() {
    console.log('preparando para obter os usuarios');

    let accountList = await this.accountReadService.findAll();

    if(accountList==null){
      console.log('Não achou usuários cadastrados');
      return;
    }

    this.accounts = accountList;
    
    console.log('usuarios obtidos com sucesso');
    console.log(accountList);
  }

  async deleteUser(userId: string) {
    try {
      console.log('tentando remover o item');

      await this.accountDeleteService.delete(userId);
      this.loadUsers();
      this.toast.success(`Usuario de id ${userId} removido com sucesso`);
    } catch (error) {
      console.error(error);
      this.toast.error(`Não foi possivel remover`);
    };
  }

}
