import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AppUpcomingSchedulesComponent } from "../upcoming-schedules/upcoming-schedules.component";
import { AppTopEmployeesComponent } from "../top-employees/top-employees.component";
import { SupabaseService } from 'src/app/services/supabase.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatDialogModule, RouterModule, MaterialModule, FormsModule, AppUpcomingSchedulesComponent, AppTopEmployeesComponent],
  templateUrl: './user-registration.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UserRegistrationComponent {

    email_id = sessionStorage.getItem('user_email');

    form = new FormGroup({
      store_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      seller_name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      address: new FormControl('', [Validators.required]),
      email_id: new FormControl(this.email_id, [Validators.required]),
      primary_phone: new FormControl('', [Validators.required]),
      secondary_phone: new FormControl(''),
      facebook_link: new FormControl(''),
      instagram_link: new FormControl(''),
      youtube_link: new FormControl(''),
      about_store: new FormControl('')
    });
  
    get f() {
      return this.form.controls;
    }
  
  constructor(private dialog: MatDialog, private fb: FormBuilder, private supaBaseService : SupabaseService,private dialogRef: MatDialogRef<UserRegistrationComponent>,private snackBarService : SnackBarService) {

  }

  async submit() {
    if (this.form.valid) {
      try{
        let data = await this.supaBaseService.submitContactForm(this.form.value);
        this.dialogRef.close();
      }catch(e){
        this.snackBarService.showError("Something went wrong , Please try again..")
      }

    }
  }

}
