import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDisplayCardComponent } from './products-display-card.component';

describe('ProductsDisplayCardComponent', () => {
  let component: ProductsDisplayCardComponent;
  let fixture: ComponentFixture<ProductsDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDisplayCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
