import { Component, OnInit } from '@angular/core';
import { UserReadService } from '../../../../services/user/user-read.service';
import { User } from '../../../../domain/model/user';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import * as fontawesome from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDeleteService } from '../../../../services/user/user-delete.service';

@Component({
  selector: 'app-user-list',
  imports: [
    FontAwesomeModule,
    RouterModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  fa = fontawesome;

  users: User[] =[];
  
  constructor(
    private userReadService: UserReadService, private toast: ToastrService, private userDeleteService: UserDeleteService){

  }

  ngOnInit(): void {
    this.loadUsers();
  }
  async loadUsers() {
    console.log('preparando para obter os usuarios');

    let userList = await this.userReadService.findAll();

    if(userList==null){
      console.log('Não achou usuários cadastrados');
      return;
    }

    this.users = userList;
    
    console.log('usuarios obtidos com sucesso');
    console.log(userList);
  }

  async deleteUser(userId: string) {
    try {
      console.log('tentando remover o item');

      await this.userDeleteService.delete(userId);
      this.loadUsers();
      this.toast.success(`Usuario de id ${userId} removido com sucesso`);
    } catch (error) {
      console.error(error);
      this.toast.error(`Não foi possivel remover`);
    };
  }

}
