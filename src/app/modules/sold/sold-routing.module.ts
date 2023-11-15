import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoldComponent } from './pages/sold-page/sold.component';

const routes: Routes = [{ path: '', component: SoldComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SoldRoutingModule { }
