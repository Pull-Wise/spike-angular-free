import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TablerIconsModule } from 'angular-tabler-icons';
import { ProductCardData } from '../my-products/my-products.component';

@Component({
  selector: 'app-products-display-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, TablerIconsModule, MatButtonModule, MatIconModule, MatTabsModule, CommonModule],
  templateUrl: './products-display-card.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProductsDisplayCardComponent {

  @Input() productCard : ProductCardData;
  currentIndex: number = 0;
  autoSlideInterval: any;

  constructor() { }

  ngOnInit() {
    console.log('card oninit -> '+ this.productCard)
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
    this.currentIndex = (this.currentIndex + 1) % this.productCard.attachment_links.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.productCard.attachment_links.length) % this.productCard.attachment_links.length;
  }

  isImage(url: string): boolean {
    // console.log(url + '  ->  '+ /\.(jpg|jpeg|png|gif|webp)$/i.test(url));
    // return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
    return true;
  }

  isVideo(url: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(url);
  }

}
