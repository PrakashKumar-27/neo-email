import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../services/email.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-email-form',
  standalone: true,
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class EmailFormComponent {
  emailForm: FormGroup;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private emailService: EmailService, private snackBar: MatSnackBar) {
    this.emailForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  sendEmail() {
    if (this.emailForm.valid) {
      this.emailService.sendEmail(this.emailForm.value).subscribe(response => {
        this.successMessage = 'Email sent successfully!';
        this.emailForm.reset(); // Clear form on success
        Object.keys(this.emailForm.controls).forEach(key => {
          this.emailForm.controls[key].setErrors(null); // Remove validation errors
        });
        setTimeout(() => this.successMessage = null, 3000);
      }, error => {
        this.snackBar.open('Failed to send email.', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
      });
    }
  }
}
