import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MaterialModule } from 'src/app/material.module';
import { SupabaseService } from 'src/app/services/supabase.service';
import { AddProductsDialogComponent, StockAvailability } from '../add-products-dialog/add-products-dialog.component';
import { CategoryFilter } from 'src/app/components/my-products/my-products.component';
import { ServiceService } from 'src/app/components/shared/service.service';


export interface AttachmentInfo{
  product_id : string;
  attachment_key : string;
}


@Component({
  selector: 'app-edit-products-dialog',
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
  templateUrl: './edit-products-dialog.component.html',
  encapsulation : ViewEncapsulation.None
})
export class EditProductsDialogComponent {

  productData : any;

    constructor(private supabaseService : SupabaseService, public sharedService : ServiceService,private dialogRef: MatDialogRef<AddProductsDialogComponent>
      ,@Inject(MAT_DIALOG_DATA) public data: any
    ){
      this.productData = data;
      this.supabaseService.fetchProductData(this.productData.product_id)
      .then(
        (data) => {
          console.log(data)
          this.form.get('product_name')?.setValue(data[0].product_name);
          this.form.get('product_category')?.setValue(data[0].product_category);
          this.form.get('product_description')?.setValue(data[0].product_description);
          this.form.get('current_stock')?.setValue(data[0].current_stock);
          this.form.get('product_keywords')?.setValue('');
          this.form.get('price')?.setValue(data[0].price);
          this.form.get('product_link')?.setValue(data[0].product_link);
          this.form.get('sm_post_link')?.setValue(data[0].sm_post_link);
          this.form.get('sm_video_link')?.setValue(data[0].sm_video_link);
          this.uploadedFiles = data[0].attachment_info;
        }
      )
      console.log(data);
    }

    form = new FormGroup({
      product_name: new FormControl({value : '', disabled: true}, [Validators.required, Validators.minLength(4)]),
      product_category: new FormControl('', [Validators.required]),
      product_description: new FormControl('', [Validators.required]),
      product_keywords: new FormControl(''),
      current_stock: new FormControl('', [Validators.required]),
      price : new FormControl(null, [Validators.required]),
      product_link : new FormControl(null),
      sm_post_link : new FormControl(null),
      sm_video_link : new FormControl(null)
    });
    uploading: boolean = false;
    uploadedFiles: AttachmentInfo[] = []; // To track uploaded file paths
    maxFiles: number = 5; // Maximum number of files allowed

    @Output() closeDialog = new EventEmitter<boolean>();

    categoryFilterList : CategoryFilter[] = [
      {value : 'ALL' , description : 'all'},
      {value : 'CLOTHING' , description : 'clothing'},
      {value : 'PRS' , description : 'Personal care products'}
    ];

    stockAvailability : StockAvailability[] = [
      { value: 'AVAILABLE', viewValue: 'Available' },
      { value: 'LIMITED', viewValue: 'Limited stocks available' },
      { value: 'NOTAVAILABLE', viewValue: 'Not available' },
    ];

    selectedStockAvailability: string;
    selectedCategory : string;

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
        } else {
          console.log('File uploaded successfully:', filePath);
          this.uploadedFiles.push({product_id: this.productData.product_id , attachment_key:  filePath}); // Add the unique file path to the list
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        this.uploading = false;
      }
    }
  
    removeFile(file: AttachmentInfo, index : number) {
      this.supabaseService.removeProductImage(file.attachment_key)
        .then((data) => {
          this.uploadedFiles.splice(index, 1);
        })
    }
  

    async saveProduct(){
      try{
        if(this.form.valid){
          let sellerId = sessionStorage.getItem('user_id');
          const {data , error} = await this.supabaseService.getSupabase()
          .from('products')
          .update([
            { seller_id: Number(sellerId), product_name: this.form.value['product_name'], product_category : this.form.value['product_category']
              , product_description : this.form.value['product_description'], product_keywords : '', current_stock : this.form.value ['current_stock'],
              price : this.form.value['price'], product_link : this.form.value['product_link'], sm_post_link : this.form.value['sm_post_link'],
              sm_video_link : this.form.value['sm_video_link']
            }
          ])
          .eq('product_id' ,this.productData.product_id)
          .select();
          console.log(data)
          this.dialogRef.close(true);
  
          await this.supabaseService.getSupabase()
            .from('attachment_info')
            .insert(
              this.uploadedFiles.map((file) => ({ product_id: data![0].product_id, seller_id: data![0].seller_id, attachment_key: file.attachment_key})));
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
