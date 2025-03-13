import { Component, ViewEncapsulation, OnInit, inject } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { AppFormsComponent } from "../../pages/ui-components/forms/forms.component";
import { MatDialog } from '@angular/material/dialog';
import { AddProductsDialogComponent } from 'src/app/pages/ui-components/add-products-dialog/add-products-dialog.component';
import { SupabaseService } from 'src/app/services/supabase.service';
import { AppBlogComponent } from "../apps-blog/apps-blog.component";
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ServiceService } from '../shared/service.service';

export interface CategoryFilter {
  value : string;
  description : string;
}

interface Products {
  product_id : number;
  seller_id : number;
  product_name : string;
  product_category : string;
  product_description : string;
  product_keywords : string;
  current_stock : string;
}

export interface ProductCardData {
  product_id : number;
  seller_id : number;
  product_name : string;
  attachment_links : string[];
  price : number;
}

interface AttachmentInfo{
  attachment_key: string;
  product_id: number;
}

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [MaterialModule, AppFormsComponent, AppBlogComponent, CommonModule,TablerIconsModule],
  templateUrl: './my-products.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MyProductsComponent implements OnInit{

  constructor(public supabaseService : SupabaseService, public sharedService : ServiceService){}

  categoryFilterList : CategoryFilter[] = [
    {value : 'ALL' , description : 'all'},
    {value : 'CLOTHING' , description : 'clothing'},
    {value : 'PRS' , description : 'Personal care products'}
  ];
  productCardDatas: ProductCardData[] = [];
  selectedCategory : string;
  readonly dialog = inject(MatDialog);

  async ngOnInit(){
      this.selectedCategory = this.categoryFilterList[0].value;
      await this.fetchMyProducts();
      this.sharedService.refreshMyProductsSection$.subscribe((data) => {
        this.fetchMyProducts();
      });
      console.log(this.productCardDatas);
  }

  addProduct() {
    let sellerId : number = 3;
  }

  onClickAddProducts(){
    console.log('open add products');
    this.dialog.open(AddProductsDialogComponent, {
      width: "85%",
      height: "90%"
    });
  }

  async fetchMyProducts() {
    let userId = sessionStorage.getItem('user_id');
    if(userId){
      let data = await this.supabaseService.fetchProducts(Number(userId));
      console.log(data);

      this.productCardDatas = await Promise.all(
        data.map(async (item) => {
          let attachmentLinks = await this.getAttachmentLinks(item.attachment_info);
          return {
            product_id: item.product_id,
            seller_id: item.seller_id,
            product_name: item.product_name,
            attachment_links: attachmentLinks,
            price: item.price
          };
        })
      );
    }
  }

  async getAttachmentLinks(attachmentInfo: AttachmentInfo[]): Promise<string[]> {
    const links = await Promise.all(
      attachmentInfo.map(async (data) => {
        const response = await this.supabaseService.fetchAttachmentLinks('products', data.attachment_key);
        return response?.signedUrl || ''; // Handle potential null case
      })
    );
    return links;
  }


  
}
