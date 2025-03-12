import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroImportModule } from '../../NgZorroImportsModule';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PostCarComponent } from './components/post-car/post-car.component';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { UpdateCarComponent } from './components/update-car/update-car.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    PostCarComponent,
    UpdateCarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgZorroImportModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
