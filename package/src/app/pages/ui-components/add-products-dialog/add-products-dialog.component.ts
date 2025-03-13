import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { CategoryFilter } from 'src/app/components/my-products/my-products.component';
import { ServiceService } from 'src/app/components/shared/service.service';
import { MaterialModule } from 'src/app/material.module';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { SupabaseService } from 'src/app/services/supabase.service';

export interface StockAvailability {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-products-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MaterialModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './add-products-dialog.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AddProductsDialogComponent {

  constructor(private supabaseService : SupabaseService,public sharedService : ServiceService, private dialogRef: MatDialogRef<AddProductsDialogComponent>,
    private snackBarService : SnackBarService
  ){

  }

    @Output() closeDialog = new EventEmitter<boolean>();

    categoryFilterList : CategoryFilter[] = [
      {value : 'CLOTHING' , description : 'clothing'},
      {value : 'PRS' , description : 'Personal care products'},
      {value : 'WJWELLARY' , description : 'Women\'s Jewllery'},
      {value : 'GIFTS' , description : 'Gifts & Presents'},
      {value : 'MJWELLARY' , description : 'Mens\'s Jewllery'},
      {value : 'ELECT' , description : 'Electronics & gadgets'},
      {value : 'HOME' , description : 'Home Appliances'},
      {value : 'CLEAN' , description : 'Clean & Hygine'},
      {value : 'WATCH' , description : 'Watches & Clocks'},
    ];

    stockAvailability : StockAvailability[] = [
      { value: 'AVAILABLE', viewValue: 'Available' },
      { value: 'LIMITED', viewValue: 'Limited stocks available' },
      { value: 'NOTAVAILABLE', viewValue: 'Not available' },
    ];

  selectedStockAvailability: string;
  selectedCategory : string;
  uploadedFiles: string[] = []; // To track uploaded file paths
  maxFiles: number = 5; // Maximum number of files allowed

  uploading: boolean = false;

  form = new FormGroup({
    product_name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    product_category: new FormControl('', [Validators.required]),
    product_description: new FormControl('', [Validators.required]),
    product_keywords: new FormControl(''),
    current_stock: new FormControl('', [Validators.required]),
    price : new FormControl(null, [Validators.required]),
    product_link : new FormControl(null),
    sm_post_link : new FormControl(null),
    sm_video_link : new FormControl(null)
  });

  async uploadFile(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;
    console.log(file.type);

    // Check if the file limit is reached
    if (this.uploadedFiles.length >= this.maxFiles) {
      alert('You can upload a maximum of 5 files.');
      return;
    }

    this.uploading = true;

    try {
      // Generate a unique filename using timestamp
      const uniqueName = `${Date.now()}`;
      const filePath = uniqueName;

      const { data , error } = await this.supabaseService
        .getSupabase()
        .storage
        .from('products') // Replace with your bucket name
        .upload(filePath, file);
        console.log(data);

      if (error) {
        console.error('Upload error:', error.message);
        this.snackBarService.showError('Opps !! something went wrong, Please try again');
      } else {
        console.log('File uploaded successfully:', filePath);
        this.uploadedFiles.push(filePath); // Add the unique file path to the list
        this.snackBarService.showSuccess('Product added successfully !');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      this.snackBarService.showError('Opps !! something went wrong, Please try again');
    } finally {
      this.uploading = false;
    }
  }

  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  async saveProduct(){
    try{
      if(this.form.valid){
        let sellerId = sessionStorage.getItem('user_id');
        const {data , error} = await this.supabaseService.getSupabase()
        .from('products')
        .insert([
          { seller_id: Number(sellerId), product_name: this.form.value['product_name'], product_category : this.form.value['product_category']
            , product_description : this.form.value['product_description'], product_keywords : '', current_stock : this.form.value ['current_stock'],
            price : this.form.value['price'], product_link : this.form.value['product_link'], sm_post_link : this.form.value['sm_post_link'],
            sm_video_link : this.form.value['sm_video_link']
          }
        ]).select();
        console.log(data)
        this.dialogRef.close(true);

        await this.supabaseService.getSupabase()
          .from('attachment_info')
          .insert(
            this.uploadedFiles.map((file) => ({ product_id: data![0].product_id, seller_id: data![0].seller_id, attachment_key: file})));
            this.sharedService.setRefreshMyProductsSection(true);
            this.closeDialog.emit(true);
      }else{
        console.log("Invalid products form");
      }            
    }catch(e){
      console.log(e);
    }
  }

  closePopup() : void {
    this.closeDialog.emit(true);
    this.dialogRef.close(true);
  }
}
