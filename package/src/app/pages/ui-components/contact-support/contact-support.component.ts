import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-contact-support',
  standalone: true,
  imports: [ MatCardModule,MatIconModule,MatToolbarModule],
  templateUrl: './contact-support.component.html'
})
export class ContactSupportComponent {

}
