import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

import {ToastModule} from 'primeng/toast';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ToastModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers : [MessageService]
})
export class AuthLayoutModule { }
