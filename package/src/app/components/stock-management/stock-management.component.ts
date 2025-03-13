import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialModule } from 'src/app/material.module';
import { StockAvailability } from 'src/app/pages/ui-components/add-products-dialog/add-products-dialog.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { SupabaseService } from 'src/app/services/supabase.service';

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  hrate: number;
  skills: string;
  priority: string;
  progress: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/profile/user-1.jpg',
    uname: 'Mark J. Freeman',
    position: 'Developer',
    skills: 'HTML',
    hrate: 80,
    priority: 'Available',
    progress: 'success',
  },
  {
    id: 2,
    imagePath: 'assets/images/profile/user-2.jpg',
    uname: 'Nina R. Oldman',
    position: 'Designer',
    skills: 'JavaScript',
    hrate: 70,
    priority: 'On Holiday',
    progress: 'primary',
  },
  {
    id: 3,
    imagePath: 'assets/images/profile/user-3.jpg',
    uname: 'Arya H. Shah',
    position: 'Developer',
    skills: 'React',
    hrate: 40,
    priority: 'Absent',
    progress: 'error',
  },
  {
    id: 4,
    imagePath: 'assets/images/profile/user-4.jpg',
    uname: 'June R. Smith',
    position: 'Designer',
    skills: 'Vuejs',
    hrate: 20,
    priority: 'On Leave',
    progress: 'warning',
  },
];


@Component({
  selector: 'app-stock-management',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MaterialModule],
  templateUrl: './stock-management.component.html'
})
export class StockManagementComponent implements OnInit {

  displayedColumns: string[] = ['profile', 'hrate', 'skills', 'status'];
  dataSource : any;
  stockAvailability : StockAvailability[] = [
    { value: 'AVAILABLE', viewValue: 'Available' },
    { value: 'LIMITED', viewValue: 'Limited stocks available' },
    { value: 'NOTAVAILABLE', viewValue: 'Not available' },
  ];
  selectedStockAvailability: string;

  constructor(public supabaseService : SupabaseService,private snackBarService : SnackBarService){}

  async ngOnInit() {
      let userId = sessionStorage.getItem('user_id');
      if(userId){
        this.dataSource = await this.supabaseService.fetchProducts(Number(userId));
        console.log(this.dataSource)
      }
  }

  async updateStock($event : any, product : any){
    try{
      await this.supabaseService.updateProductStock(product.product_id,$event);
      this.snackBarService.showSuccess('Data updated successfully !');
    }catch(e){
      this.snackBarService.showError('Opps !! something went wrong, Please try again');
    }
  }

}
