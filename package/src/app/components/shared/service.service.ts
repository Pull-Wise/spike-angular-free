import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  refreshMyProductsSection = new Subject<any>();
  refreshMyProductsSection$ = this.refreshMyProductsSection.asObservable();

  setRefreshMyProductsSection(data : any){
    this.refreshMyProductsSection.next(data);
  }

  constructor() { }
}
