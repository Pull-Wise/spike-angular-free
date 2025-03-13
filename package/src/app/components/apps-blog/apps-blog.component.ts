import { CommonModule } from '@angular/common';
import { Component, Input,  OnInit, OnDestroy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ProductCardData } from '../my-products/my-products.component';
import { ProductsDisplayCardComponent } from "../products-display-card/products-display-card.component";
import { MatDialog } from '@angular/material/dialog';
import { EditProductsDialogComponent } from 'src/app/pages/ui-components/edit-products-dialog/edit-products-dialog.component';


interface productcards {
  id: number;
  imgSrc: string;
  title: string;
  price: string;
  rprice: string;
}


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, TablerIconsModule, MatButtonModule, MatIconModule, MatTabsModule, CommonModule, ProductsDisplayCardComponent],
  templateUrl: './apps-blog.component.html',
})
export class AppBlogComponent implements OnInit, OnDestroy {

  @Input() productCardDatas : ProductCardData[] = [];
  currentIndex: number = 0;
  autoSlideInterval: any;
  readonly dialog = inject(MatDialog);
  

  constructor() { }

  ngOnInit() {
    console.log('card oninit -> '+ this.productCardDatas)
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.autoSlideInterval);
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Auto-slide every 3 seconds
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.productCardDatas.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.productCardDatas.length) % this.productCardDatas.length;
  }

  isImage(url: string): boolean {
    // console.log(url + '  ->  '+ /\.(jpg|jpeg|png|gif|webp)$/i.test(url));
    // return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    return true;
  }

  isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(url);
  }

  onClickEditProducts(productcard : ProductCardData){
    console.log('open add products');
    this.dialog.open(EditProductsDialogComponent, {
      width: "85%",
      height: "90%",
      data: productcard
    });
  }

  productcards: productcards[] = [
    {
      id: 1,
      imgSrc: '/assets/images/products/p1.jpg',
      title: 'Boat Headphone',
      price: '285',
      rprice: '375',
    },
    {
      id: 2,
      imgSrc: '/assets/images/products/p2.jpg',
      title: 'MacBook Air Pro',
      price: '285',
      rprice: '375',
    },
    {
      id: 3,
      imgSrc: '/assets/images/products/p3.jpg',
      title: 'Red Valvet Dress',
      price: '285',
      rprice: '375',
    },
    {
      id: 4,
      imgSrc: '/assets/images/products/p4.jpg',
      title: 'Cute Soft Teddybear',
      price: '285',
      rprice: '375',
    },
    {
      id: 5,
      imgSrc: '/assets/images/products/p4.jpg',
      title: 'Cute Soft Teddybear',
      price: '285',
      rprice: '375',
    },
    {
      id: 6,
      imgSrc: '/assets/images/products/p4.jpg',
      title: 'Cute Soft Teddybear',
      price: '285',
      rprice: '375',
    },
    {
      id: 7,
      imgSrc: '/assets/images/products/p4.jpg',
      title: 'Cute Soft Teddybear',
      price: '285',
      rprice: '375',
    },
  ];
}
