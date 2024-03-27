import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  email!: string;

  constructor(private http: HttpClient) {}

  sendEmail(): void {
    const emailData = { Email: this.email };

    this.http.post('http://localhost:3000/news/sendEmail', emailData).subscribe(
      (response) => {
        console.log('Email sent successfully:', response);
        this.success();
      },
      (error) => {
        console.error('Error sending email:', error);
        this.failure();
      }
    );
  }

  success(): void {
    // Corrected function name
    Swal.fire({
      title: 'Thank you',
      text: 'Email submitted successfully!',
      icon: 'success',
    });
  }

  failure(): void {
    // Corrected function name
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }
}
