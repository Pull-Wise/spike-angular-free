import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppProfitExpensesComponent } from 'src/app/components/profit-expenses/profit-expenses.component';
import { AppTrafficDistributionComponent } from 'src/app/components/traffic-distribution/traffic-distribution.component';
import { AppProductSalesComponent } from 'src/app/components/product-sales/product-sales.component';
import { AppUpcomingSchedulesComponent } from 'src/app/components/upcoming-schedules/upcoming-schedules.component';
import { AppTopEmployeesComponent } from 'src/app/components/top-employees/top-employees.component';
import { AppBlogComponent } from 'src/app/components/apps-blog/apps-blog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppSideLoginComponent } from '../authentication/side-login/side-login.component';
import { UserRegistrationComponent } from 'src/app/components/user-registration/user-registration.component';



@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    AppProfitExpensesComponent,
    AppTrafficDistributionComponent,
    AppProductSalesComponent,
    AppUpcomingSchedulesComponent,
    AppTopEmployeesComponent,
    AppBlogComponent
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { 

    readonly dialog = inject(MatDialog);
    sampleImages : string[] = ["/assets/images/products/p1.jpg","/assets/images/products/p2.jpg","/assets/images/products/p3.jpg"];

    openDialog(): void {
      console.log('opening dialog')
      this.dialog.open(UserRegistrationComponent, {
        width: "85%",
        height: "90%"
      });
    }

}