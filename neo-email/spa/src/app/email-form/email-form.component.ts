import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmailService } from '../services/email.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
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
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class EmailFormComponent {
  emailForm: FormGroup;
  successMessage: string | null = null;
  templates = [
    { value: 'welcome', label: 'Welcome Email' },
    { value: 'user_creation', label: 'User Creation Email' },
    { value: 'user_deletion', label: 'User Deletion Email' }
  ];

  constructor(private fb: FormBuilder, private emailService: EmailService, private snackBar: MatSnackBar) {
    this.emailForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      template: ['', Validators.required]
    });
  }

  onTemplateChange(template: string) {
    switch (template) {
      case 'welcome':
        this.emailForm.patchValue({
          subject: 'Welcome to Our Platform!',
          body: 'Dear User,\n\nWelcome to our platform! We are excited to have you on board.\n\nBest Regards,\nTeam'
        });
        break;
      case 'user_creation':
        this.emailForm.patchValue({
          subject: 'Your Account Has Been Created',
          body: 'Dear User,\n\nYour account has been successfully created. Please log in to continue.\n\nBest Regards,\nTeam'
        });
        break;
      case 'user_deletion':
        this.emailForm.patchValue({
          subject: 'Account Deletion Confirmation',
          body: 'Dear User,\n\nYour account has been deleted as per your request. If you have any questions, contact support.\n\nBest Regards,\nTeam'
        });
        break;
      default:
        this.emailForm.patchValue({ subject: '', body: '' });
    }
  }

  sendEmail() {
    if (this.emailForm.valid) {
      this.emailService.sendEmail(this.emailForm.value).subscribe(response => {
        this.successMessage = 'Email sent successfully!';
        this.emailForm.reset();
        Object.keys(this.emailForm.controls).forEach(key => {
          this.emailForm.controls[key].setErrors(null);
        });
        setTimeout(() => this.successMessage = null, 3000);
      }, error => {
        this.snackBar.open('Failed to send email.', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
      });
    }
  }
}
