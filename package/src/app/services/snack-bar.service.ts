import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {}

  showMessage(message: string, action: string = 'Close', duration: number = 3000, panelClass: string = 'default-snackbar') {
    this.snackBar.open(message, action, {
      duration,
      panelClass,
      verticalPosition: 'top',  // or 'bottom'
      horizontalPosition: 'right'  // or 'left', 'center'
    });
  }

  showError(message: string) {
    this.showMessage(message, 'Close', 5000, 'error-snackbar');
  }

  showSuccess(message: string) {
    this.showMessage(message, 'Close', 3000, 'success-snackbar');
  }
}
