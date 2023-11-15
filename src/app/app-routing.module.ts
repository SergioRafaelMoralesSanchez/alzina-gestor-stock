import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'stock', loadChildren: () => import('./modules/stock/stock.module').then(m => m.StockModule) },
    { path: 'sold', loadChildren: () => import('./modules/sold/sold.module').then(m => m.SoldModule) },
    { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: "**", redirectTo: "stock" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
