import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { customEmailValidator } from './custom-email.validator';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required, // Make it required
        customEmailValidator(), // Validate it as an email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6), // Minimum password length
      ]),
      rememberMe: new FormControl(false),
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return; // If form is invalid, stop submission.
    }

    const { username, password, rememberMe } = this.loginForm.value;
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
    const apiUrl = 'https://feestracking.freeprojectapi.com/api/User/login';
    const body = {
      userName: username,
      password: password,
    };
    const headers = { 'Content-Type': 'application/json' };
    this.errorMessage = '';
    this.http
      .post(apiUrl, body, { headers })
      .pipe(
        catchError((error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Login failed! Please check your credentials.';
          return of(null); // Return observable to avoid further handling
        })
      )
 .subscribe((response: any) => {
  if (response && response.message) {
    // Save user data before navigation
    localStorage.setItem('user', JSON.stringify(response));

    this.errorMessage = '';
    console.log('Login Success');

    this.router.navigate(['/master']).then(navigated => {
      if (navigated) {
        console.log('master Success');
      } else {
        console.log('Navigation failed');
      }
    });
  } else {
    this.errorMessage = 'Login failed! Please check your credentials.';
  }
});



    // Assuming you want to navigate to <app-master> on successful login
    // You will need to have a route for this.
  }
}
