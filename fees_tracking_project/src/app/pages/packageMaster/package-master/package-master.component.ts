import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-master',
  templateUrl: './package-master.component.html',
  styleUrls: ['./package-master.component.scss']
})
export class PackageMasterComponent implements OnInit {

  packages: any[] = [];
  errorMessage: string = '';
  router = inject(Router);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      console.warn('User not logged in. Redirecting to login...');
      this.router.navigate(['/']);
      return;
    }

    // Fetch packages
    this.getAllPackages();
  }

  getAllPackages(): void {
    const apiUrl = 'https://feestracking.freeprojectapi.com/api/PackageMaster/get-all-packages';

    this.http.get<any[]>(apiUrl)
      .pipe(
        catchError(error => {
          console.error('API Error:', error);
          this.errorMessage = 'Failed to load packages. Please try again later.';
          return of([]); // Return empty array on error
        })
      )
      .subscribe(data => {
        this.packages = data;

        // Save packages to localStorage
        localStorage.setItem('packages', JSON.stringify(this.packages));
      });
  }
}
