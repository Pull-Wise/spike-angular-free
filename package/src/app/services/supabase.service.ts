import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js'
import { environment } from 'src/environments/environment'
import { UserRegistrationComponent } from '../components/user-registration/user-registration.component';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SnackBarService } from './snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient
  readonly dialog = inject(MatDialog);
  

  constructor(private router: Router, private snackBarService : SnackBarService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  public getSupabase() {
    return this.supabase;
  }

  async submitContactForm(formData: any) {
    try {
      const { data, error } = await this.supabase
        .from('seller')
        .insert([formData])
        .select();
      console.log(data);
      sessionStorage.setItem('user_id',data![0].id);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateUserProfile(formData: any, userId: number) {
    try {
      const { data, error } = await this.supabase
        .from('seller')
        .update({ address: formData['address'],secondary_phone: formData['secondary_phone'],facebook_link: formData['facebook_link'],instagram_link: formData['instagram_link']
          , youtube_link: formData['youtube_link'], about_store: formData['about_store']
         })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }


  async fetchUserProfile(emailId : string) {
    try {
      const { data, error } = await this.supabase
        .from('seller')
        .select("*")
        .eq('email_id', emailId)

      if (error) {
        throw error;
      }

      return data;

    } catch (error) {
      throw (error);
    }
  }

  async fetchProducts(seller_id: number) {
    try {
      const { data, error } = await this.supabase.
        from('products')
        .select('*,attachment_info(product_id,attachment_key)')
        .eq('attachment_info.active_f', true)
        .eq('seller_id',seller_id);

      if (error) {
        throw error;
      }

      return data;

    } catch (error) {
      throw (error);
    }
  }

  async updateProductStock(product_id : number, stock : string){
    try{
      const {data, error} = await this.supabase
          .from('products')
          .update({'current_stock': stock})
          .eq('product_id',product_id );

        if(error){throw error};

        return data;
    }catch(e){
      throw e;
    }
  }

  async fetchProductData(product_id: number) {
    try {
      const { data, error } = await this.supabase.
        from('products')
        .select('*,attachment_info(product_id,attachment_key)')
        .eq('product_id',product_id)
        .eq('attachment_info.active_f',true);

      if (error) {
        throw error;
      }

      return data;

    } catch (error) {
      throw (error);
    }
  }

  async removeProductImage(key : string){
    try{
      let active_f : boolean = false;
      const {data , error} = await this.supabase
        .from('attachment_info')
        .update({'active_f' : active_f})
        .eq('attachment_key',key);

        return data;
    }catch(error){
      throw (error);
    }
  }

  async fetchAttachmentLinks(bucketName: string, filePath: string) {
    const { data, error } = await this.supabase
      .storage
      .from(bucketName)
      .createSignedUrl(filePath, 6000); // Expires in 60 seconds

    if (error) {
      console.error('Error fetching signed URL:', error);
    }
    return data;
  }

  async sendOtpToEmail(email : string) {
    const { data, error } = await this.supabase.auth.signInWithOtp({
      email: email,
      options: {
        // set this to false if you do not want the user to be automatically signed up
        shouldCreateUser: true,
      },
    });
  }

  isUserAuthenticated(): Observable<boolean> {
    return from(
      this.supabase.auth.getSession().then(({ data, error }) => {
        if (error) return false;
        if (data.session) return true;
        return false; // Ensure proper boolean response
      })
    );
  }
  openRegistrationDialog(): void {
    console.log('opening dialog')
    this.dialog.open(UserRegistrationComponent, {
      width: "85%",
      height: "90%"
    });
  }

  async verifyOTP(email : string, otp : string){
    const { data: { session } , error } = await this.supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });
    
    if(session){
      console.log(session);
      sessionStorage.setItem('access_token',session?.access_token!);
      sessionStorage.setItem('user_email',session?.user.email!);
      let userData = await this.fetchUserProfile(session?.user.email!);
      if(userData.length > 0){
        let userId = userData[0].id
        sessionStorage.setItem('user_id',userId.toString());
      }else{
        this.openRegistrationDialog();
      }
      this.router.navigate(['/dashboard'])
    }

    if(error){
      this.snackBarService.showError('Invalid OTP')
      this.router.navigate(['/authentication/login'])
    }

  }


  async getSearchDataForPastSevenDays(sellerId: string) {
    const { data, error } = await this.supabase
        .rpc('get_past_seven_days_search_data', { seller_id_param: sellerId });

    if (error) {
        console.error('Error fetching data:', error);
        return null;
    }

    return data;
  }

  async getTodaysSearchData(sellerId: string) {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await this.supabase
        .from('search_history')
        .select('*')
        .eq('seller_id', sellerId)
        .gte('created_at', `${today}T00:00:00.000Z`)
        .lte('created_at', `${today}T23:59:59.999Z`);

    if (error) {
        console.error('Error fetching today\'s data:', error);
        return null;
    }

    return data;
  }

  async getSearchPercentageChange(sellerId: string): Promise<string> {
    // Get today's and yesterday's dates
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
    const yesterdayStr = yesterday.toISOString().split('T')[0]; // YYYY-MM-DD

    // Fetch today's search count
    const { data: todayData, error: todayError } = await this.supabase
        .from('search_history')
        .select('search_id', { count: 'exact' })
        .eq('seller_id', sellerId)
        .gte('created_at', `${todayStr}T00:00:00.000Z`)
        .lte('created_at', `${todayStr}T23:59:59.999Z`);

    // Fetch yesterday's search count
    const { data: yesterdayData, error: yesterdayError } = await this.supabase
        .from('search_history')
        .select('search_id', { count: 'exact' })
        .eq('seller_id', sellerId)
        .gte('created_at', `${yesterdayStr}T00:00:00.000Z`)
        .lte('created_at', `${yesterdayStr}T23:59:59.999Z`);

    if (todayError || yesterdayError) {
        console.error('Error fetching data:', todayError || yesterdayError);
        return 'Error fetching data';
    }

    const todayCount = todayData?.length || 0;
    const yesterdayCount = yesterdayData?.length || 0;

    // Calculate percentage difference
    let percentageChange = 0;
    if (yesterdayCount > 0) {
        percentageChange = ((todayCount - yesterdayCount) / yesterdayCount) * 100;
    } else if (todayCount > 0) {
        percentageChange = 100; // If yesterday was 0, and today has searches
    }

    // Format the output string
    const formattedPercentage = percentageChange.toFixed(2);
    return `${formattedPercentage}% to yesterday.`;
}

async getTotalSearchesToday(): Promise<number> {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Fetch today's total search count
  const { data, error } = await this.supabase
      .from('search_history')
      .select('search_id', { count: 'exact' })
      .gte('created_at', `${today}T00:00:00.000Z`)
      .lte('created_at', `${today}T23:59:59.999Z`);

  if (error) {
      console.error('Error fetching today\'s total searches:', error);
      return 0;
  }

  return data?.length || 0;
}

  
}
