import { Routes } from '@angular/router';
import { HelpComponent } from './views/app/help/help.component';
import { MainComponent } from './views/app/main/main.component';
import { HomeComponent } from './views/app/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { AccountListComponent } from './views/app/account/account-list/account-list.component';
import { AccountEditComponent } from './views/app/account/account-edit/account-edit.component';
import { MainProfileComponent } from './views/main-profile/main-profile/main-profile.component';
import { AccountCreateComponent } from './views/app/account/account-create/account-create.component';

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
                path: 'account/my-profile',
                component: MainProfileComponent
            },
            {
                path: 'help',
                component: HelpComponent
            },
            {
                path: 'main',
                component: MainComponent
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
                        path: 'list',
                        component: AccountListComponent
                    }

                ],

            },

            {
                path: '**',
                component: NotFoundComponent
            }

        ]
    },





];
