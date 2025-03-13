import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanActivateFn, CanDeactivate, CanLoad, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationComponent } from '../components/user-registration/user-registration.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad  {
  constructor(private supabaseService : SupabaseService, private router: Router) {}

  readonly dialog = inject(MatDialog);

  canActivate(): Observable<boolean> {
    return this.supabaseService.isUserAuthenticated().pipe(
      tap(isAuthenticated => {
        let userId = sessionStorage.getItem('user_id');
        let userToken = sessionStorage.getItem('access_token');

        if(isAuthenticated && userToken == null){
          this.router.navigate(['/authentication/login']);
          return;
        }

        if(isAuthenticated && userId == null){
          this.openRegistrationDialog();
        }
        if (!isAuthenticated) {
          this.router.navigate(['/authentication/login']); // Redirect if not authenticated
        }
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
  

  canActivateChild(): boolean {
    return this.checkAuth();
  }

  canLoad(): boolean {
    return this.checkAuth();
  }

  checkAuth(): boolean {
    if (this.supabaseService.isUserAuthenticated()) {
      return true;
    } else {
      // Redirect to the login page if the user is not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }

  async getUserAuth(){
    return await this.supabaseService.isUserAuthenticated();
  }

}