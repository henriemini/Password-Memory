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

  accountId: string = '-1';
  accountName: string = '';
  

  constructor(private accountReadService: AccountReadService, private route: ActivatedRoute){

  }
  

  async ngOnInit() {
    this.accountId = await this.route.snapshot.paramMap.get('id')!;
    
    let account = await this.accountReadService.findById(this.accountId!);
    this.accountName = account.account
  }

  
}
