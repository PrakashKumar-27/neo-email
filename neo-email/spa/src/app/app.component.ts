import { Component } from '@angular/core';
import { EmailFormComponent } from './email-form/email-form.component'; // ✅ Import the email form component

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<app-email-form></app-email-form>`, // ✅ Include the email form here
  imports: [EmailFormComponent] // ✅ Register the component here
})
export class AppComponent {}
