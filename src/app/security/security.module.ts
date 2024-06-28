import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { SecurityRoutingModule } from './security-routing.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    InputTextModule,
    ButtonModule,

    SharedModule,
    SecurityRoutingModule
  ]
})
export class SecurityModule { }
