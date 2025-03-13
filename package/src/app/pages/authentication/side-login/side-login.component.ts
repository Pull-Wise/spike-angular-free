import { Component, ElementRef, HostListener, inject, ViewChild ,AfterViewInit, ChangeDetectorRef} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationComponent } from 'src/app/components/user-registration/user-registration.component';
import { SupabaseService } from 'src/app/services/supabase.service';
import { FaqComponent } from "../../ui-components/faq/faq.component";
import { AppUpcomingSchedulesComponent } from "../../../components/upcoming-schedules/upcoming-schedules.component";
import { ContactSupportComponent } from "../../ui-components/contact-support/contact-support.component";
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    FaqComponent,
    AppUpcomingSchedulesComponent,
    ContactSupportComponent,
    CommonModule
],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent implements AfterViewInit {

  readonly dialog = inject(MatDialog);
  showFaq = false;
  showSchedules = false;
  @ViewChild('faqSection', { static: false }) faqElement!: ElementRef;
  @ViewChild('schedulesSection', { static: false }) schedulesElement!: ElementRef;
  isDisabled = false;
  countdown = 60;


  constructor(private router: Router, public supabaseService : SupabaseService,private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.detectElements();
      this.onScroll(); // Initial check in case they are already in view
    }, 0);
    this.supabaseService.isUserAuthenticated().subscribe((data) => console.log(data))
  }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  startCountdown() {
    this.sendOtp(); // Call OTP verification function
    this.isDisabled = true;

    const interval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(interval);
        this.isDisabled = false;
        this.countdown = 60; // Reset countdown
      }
    }, 1000);
  }

  openDialog(): void {
    console.log('opening dialog')
    this.dialog.open(UserRegistrationComponent, {
      width: '550px'
    });
  }

  private detectElements() {
    this.cdr.detectChanges(); // Ensures Angular updates the view
  }


  get f() {
    return this.form.controls;
  }

  async sendOtp(){
    console.log('otp sent');
    await this.supabaseService.sendOtpToEmail(this.form.get('uname')?.value!)
  }

  async verifyOtp(){
    await this.supabaseService.verifyOTP(this.form.get('uname')?.value!, this.form.get('password')?.value!)
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/dashboard']);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.showFaq = true;
    this.showSchedules = true;
    // if (this.faqElement == undefined) {
      
    // }
    // if (this.schedulesElement && this.isInViewport(this.schedulesElement.nativeElement)) {
      
    // }
  }

  private isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight - 100; // Adjust for early trigger
  }

}
