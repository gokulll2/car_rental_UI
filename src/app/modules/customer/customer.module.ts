import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroImportModule } from '../../NgZorroImportsModule';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookCarComponent } from './components/book-car/book-car.component';



@NgModule({
  declarations: [
    CustomerDashboardComponent,
    BookCarComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgZorroImportModule
  ]
})
export class CustomerModule { }
