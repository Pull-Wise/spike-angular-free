import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [MatExpansionModule, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './faq.component.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class FaqComponent {

  faqs = [
    { question: 'What is this platform, and how does it work?', answer: 'This platform connects small-scale sellers and buyers by allowing sellers to list their products and buyers to discover them via WhatsApp. Our chatbot finds the best-matched products based on buyer queries and sends the details instantly.' },
    { question: 'How can I list my products on this platform?', answer: 'Sellers can sign up, add their products with descriptions and images, and track their stock through the dashboard. Once listed, the products become searchable via our WhatsApp chatbot.' },
    { question: 'How can i signup?', answer: 'Enter the email in register/sign in box and click send OTP, Link will be sent to your mail, Through which you can register to Sales Basha platform' },
    { question: 'How does this platform help sellers grow?', answer: 'It helps sellers reach potential customers without the need for extensive marketing. The chatbot enables easy discovery of products by buyers, increasing sales opportunities.' },
    { question: 'Is this platform free to use?', answer: 'Currently, listing products and using the chatbot is free. In the future, we may introduce premium features for enhanced visibility, analytics, and automation.' },
    { question: 'Can I integrate this with my existing e-commerce platform?', answer: 'Currently, we support direct product listings. In the future, we may introduce integrations with other platforms.' },
    { question: 'Will I get insights into customer trends?', answer: 'Yes! In the future, we will offer analytics on buyer preferences and trends to help sellers make informed business decisions.' }
  ];

}
