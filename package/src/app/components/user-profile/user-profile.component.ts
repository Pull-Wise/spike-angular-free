import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatDialogModule, RouterModule, MaterialModule, FormsModule],
  templateUrl: './user-profile.component.html',
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit{

    constructor(private supabaseService : SupabaseService){}

    diableEditButton : boolean = true;
    userData : any ;
    userId : number;
    form = new FormGroup({
      store_name: new FormControl({value : '', disabled: true}, [Validators.required, Validators.minLength(2)]),
      seller_name: new FormControl({value : '', disabled: true}, [Validators.required, Validators.minLength(4)]),
      address: new FormControl({value : '', disabled: true}, [Validators.required]),
      email_id: new FormControl({value : '', disabled: true}, [Validators.required]),
      primary_phone: new FormControl({value : '', disabled: true}, [Validators.required]),
      secondary_phone: new FormControl({value : '', disabled: true}),
      facebook_link: new FormControl({value : '', disabled: true}),
      instagram_link: new FormControl({value : '', disabled: true}),
      youtube_link: new FormControl({value : '', disabled: true}),
      about_store: new FormControl({value : '', disabled: true}),
    });

    async ngOnInit() {
        let emailId = sessionStorage.getItem('user_email');
        if(emailId == undefined || emailId == null){
          emailId = '';
        }
        let userData = await this.supabaseService.fetchUserProfile(emailId);
        if(userData.length > 0 ){
          this.form.get('store_name')?.setValue(userData[0].store_name);
          this.form.get('seller_name')?.setValue(userData[0].seller_name);
          this.form.get('address')?.setValue(userData[0].address);
          this.form.get('email_id')?.setValue(userData[0].email_id);
          this.form.get('primary_phone')?.setValue(userData[0].primary_phone);
          this.form.get('secondary_phone')?.setValue(userData[0].secondary_phone);
          this.form.get('facebook_link')?.setValue(userData[0].facebook_link);
          this.form.get('instagram_link')?.setValue(userData[0].instagram_link);
          this.form.get('youtube_link')?.setValue(userData[0].youtube_link);
          this.form.get('about_store')?.setValue(userData[0].about_store);
          this.userId = userData[0].id
        }
        console.log(userData);
    }

    get f() {
      return this.form.controls;
    }

    onClickEdit() : void {
      this.form.get('address')?.enable();
      this.form.get('secondary_phone')?.enable();
      this.form.get('facebook_link')?.enable();
      this.form.get('instagram_link')?.enable();
      this.form.get('youtube_link')?.enable();
      this.form.get('about_store')?.enable();
      this.diableEditButton = false;
    }

    onClickUpdate() : void {
      if (this.form.valid) {
        console.log('userId '+ this.userId);
        this.supabaseService.updateUserProfile(this.form.value,this.userId as number);
        console.log('Store Details:', this.form.value);
        this.diableEditButton = true;
        this.form.disable();
      }
    }


}
