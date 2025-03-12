import { Component } from '@angular/core';
import { StorageService } from './auth/services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Car_Rental_UI';

  isAdminLoggedIn:boolean = StorageService.isAdminLoggedIn();
  isCustomerLoggedIn:boolean = StorageService.isCustomerLoggedIn();

  constructor(private router : Router){ }

  ngOnInit()
  {
    this.router.events.subscribe(event=>{
      if(event.constructor.name === "NavigationEnd")
      {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
      }
    })
  }

  logout()
  {
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
