import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard-page/dashboard.component';
// import { PruebasComponent } from "./pages/pruebas/pruebas.component";

const routes: Routes = [
    { path: '', component: DashboardComponent },
    // { path: 'pruebas', component: PruebasComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
