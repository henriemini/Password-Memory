import { Routes } from '@angular/router';
import { SignInComponent } from './views/account/sign-in/sign-in.component';
import { SignUpComponent } from './views/account/sign-up/sign-up.component';
import { MyProfileComponent } from './views/account/my-profile/my-profile.component';
import { HelpComponent } from './views/app/help/help.component';
import { MainComponent } from './views/app/main/main.component';
import { HomeComponent } from './views/app/home/home.component';
import { ProductCreateComponent } from './views/app/product/product-create/product-create.component';
import { ProductDetailComponent } from './views/app/product/product-detail/product-detail.component';
import { ProductEditComponent } from './views/app/product/product-edit/product-edit.component';
import { ProductListComponent } from './views/app/product/product-list/product-list.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { authenticationGuard } from './services/security/guard/authentication.guard';
import { UserListComponent } from './views/app/user/user-list/user-list.component';
import { UserEditComponent } from './views/app/user/user-edit/user-edit.component';

export const routes: Routes = [
    {
        path: 'account/sign-in',
        component: SignInComponent
    },
    {
        path: 'account/sign-up',
        component: SignUpComponent
    },


    {
        path: '',
        component: MainComponent,
        canActivate: [authenticationGuard],
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'account/my-profile',
                component: MyProfileComponent
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
                path: 'user',

                children: [
                    {
                        path: 'create',
                        component: NotFoundComponent
                    },
                    {
                        path: 'detail/:id',
                        component: MyProfileComponent
                    },
                    {
                        path: 'edit/:id',
                        component: UserEditComponent
                    },
                    {
                        path: 'list',
                        component: UserListComponent
                    }

                ],

            },
            {
                path: 'product',

                children: [
                    {
                        path: 'create',
                        component: ProductCreateComponent
                    },
                    {
                        path: 'detail',
                        component: ProductDetailComponent
                    },
                    {
                        path: 'edit',
                        component: ProductEditComponent
                    },
                    {
                        path: 'list',
                        component: ProductListComponent
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
