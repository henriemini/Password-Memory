import { Routes } from '@angular/router';
import { HelpComponent } from './views/app/help/help.component';
import { MainComponent } from './views/app/main/main.component';
import { HomeComponent } from './views/app/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { AccountListComponent } from './views/app/account/account-list/account-list.component';
import { AccountEditComponent } from './views/app/account/account-edit/account-edit.component';
import { AccountCreateComponent } from './views/app/account/account-create/account-create.component';
import { AccountUpdatePasswordComponent } from './views/app/account/account-update-password/account-update-password.component';
import { AccountUpdateAllInfoComponent } from './views/app/account/account-update-all-info/account-update-all-info.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'help',
                component: HelpComponent
            },
            {
                path: 'main',
                component: AccountUpdatePasswordComponent
            },
            {
                path: 'account',

                children: [
                    {
                        path: 'create',
                        component: AccountCreateComponent
                    },            
                    {
                        path: 'edit/:id',
                        component: AccountEditComponent
                    },            
                    {
                        path: 'update/password/:id',
                        component: AccountUpdatePasswordComponent
                    },            
                    {
                        path: 'update/all-info/:id',
                        component: AccountUpdateAllInfoComponent
                    },
                    {
                        path: 'list',
                        component: AccountListComponent
                    },

                ],

            },

            {
                path: '**',
                component: NotFoundComponent
            }

        ]
    },





];
