import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppLayoutComponent} from './layouts/app-layout/app-layout.component';
import { HomeComponent } from './components/home/home.component';
import { Error404Component } from './components/error404/error404.component';
import { BuyComponent } from './components/buy/buy.component';
import { SellComponent } from './components/sell/sell.component';
import { RulesComponent } from './components/rules/rules.component';
import { OrdersComponent } from './components/orders/orders.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: AppLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: '404',
                component: Error404Component
            },
            {
                path: 'buy',
                component: BuyComponent
            },
            {
                path: 'sell',
                component: SellComponent
            },
            {
                path: 'rules',
                component: RulesComponent
            },
            {
                path: 'orders',
                component: OrdersComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }]
    },
    {
        path: '**',
        component: Error404Component,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
