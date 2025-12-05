// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-emi-calculator',
//   imports: [],
//   templateUrl: './emi-calculator.html',
//   styleUrl: './emi-calculator.css',
// })
// export class EmiCalculator {

// }

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
 
// @Component({
//   selector: 'app-emi-calculator',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './emi-calculator.html',
//   styleUrls: ['./emi-calculator.css']
// })
// export class EmiCalculator {
//   principal: number | null = null;
//   annualRate: number | null = null;
//   tenureYears: number | null = null;
 
//   emi: number | null = null;
//   totalInterest: number | null = null;
//   totalAmount: number | null = null;
 
//   errorMessage = '';
 
//   calculateEmi(): void {
//     this.errorMessage = '';
//     this.emi = this.totalInterest = this.totalAmount = null;
 
//     if (!this.principal || !this.annualRate || !this.tenureYears) {
//       this.errorMessage = 'Please enter all the values.';
//       return;
//     }
 
//     if (this.principal <= 0 || this.annualRate <= 0 || this.tenureYears <= 0) {
//       this.errorMessage = 'Values must be greater than zero.';
//       return;
//     }
 
//     const P = this.principal;
//     const r = (this.annualRate / 12) / 100;
//     const n = this.tenureYears * 12;
 
//     const factor = Math.pow(1 + r, n);
//     const emi = P * r * factor / (factor - 1);
 
//     this.emi = parseFloat(emi.toFixed(2));
//     const totalAmount = emi * n;
//     this.totalAmount = parseFloat(totalAmount.toFixed(2));
//     this.totalInterest = parseFloat((totalAmount - P).toFixed(2));
//   }
 
//   resetForm(form: any): void {
//     form.resetForm();
//     this.errorMessage = '';
//     this.emi = this.totalInterest = this.totalAmount = null;
//   }
// }
//  import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
 
// @Component({
//   selector: 'app-emi-calculator',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './emi-calculator.html',
//   styleUrl: './emi-calculator.css'
// })
// export class EmiCalculator {
 
//   principal: number | null = null;
//   annualRate: number | null = null;
//   tenureYears: number | null = null;
 
//   emi: number | null = null;
//   totalInterest: number | null = null;
//   totalAmount: number | null = null;
 
//   errorMessage = '';
 
//   private apiUrl = 'http://localhost:8080/api/emi/calculate';
 
//   constructor(private http: HttpClient) {}
 
//   calculateEmi(): void {
//     this.errorMessage = '';
//     this.emi = this.totalInterest = this.totalAmount = null;
 
//     if (!this.principal || !this.annualRate || !this.tenureYears) {
//       this.errorMessage = 'Please enter all the values.';
//       return;
//     }
 
//     if (this.principal <= 0 || this.annualRate <= 0 || this.tenureYears <= 0) {
//       this.errorMessage = 'Values must be greater than zero.';
//       return;
//     }
 
//     const payload = {
//       loanValue: this.principal,
//       yearlyInterestRate: this.annualRate,
//       loanTermYears: this.tenureYears
//     };
 
//     this.http.post<{ emiAmount: number }>(this.apiUrl, payload).subscribe({
//       next: (response) => {
//         this.emi = response.emiAmount;
 
//         const n = this.tenureYears! * 12;
//         const totalAmount = this.emi * n;
//         this.totalAmount = parseFloat(totalAmount.toFixed(2));
//         this.totalInterest = parseFloat((totalAmount - this.principal!).toFixed(2));
//       },
//       error: (err) => {
//         console.error(err);
//         this.errorMessage = 'Backend error. Please try again.';
//       }
//     });
//   }
 
//   resetForm(form: any): void {
//     form.resetForm();
//     this.errorMessage = '';
//     this.emi = this.totalInterest = this.totalAmount = null;
//   }
// }
 

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
 
// @Component({
//   selector: 'app-emi-calculator',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './emi-calculator.html',
//   styleUrls: ['./emi-calculator.css']
// })
// export class EmiCalculator {
 
//   principal: number = 0;
//   annualRate: number = 0;
//   tenureYears: number = 0;
 
//   emi: number | null = null;
//   totalInterest: number | null = null;
//   totalAmount: number | null = null;
 
//   errorMessage: string = '';
 
//   constructor(private http: HttpClient) {}
 
//   calculateEmi(): void {
 
//     this.errorMessage = '';
//     this.emi = this.totalInterest = this.totalAmount = null;
 
//     if (this.principal <= 0 || this.annualRate <= 0 || this.tenureYears <= 0) {
//       this.errorMessage = 'Please enter valid values.';
//       return;
//     }
 
//     const payload = {
//       loanValue: this.principal,
//       yearlyInterestRate: this.annualRate,
//       loanTermYears: this.tenureYears
//     };
 
//     this.http.post<any>("http://localhost:8080/api/emi/calculate", payload)
//       .subscribe({
//         next: (response) => {
//           const emiValue = response.emiAmount;
 
//           this.emi = Number(emiValue.toFixed(2));
//           this.totalAmount = Number((this.emi * (this.tenureYears * 12)).toFixed(2));
//           this.totalInterest = Number((this.totalAmount - this.principal).toFixed(2));
//         },
//         error: () => {
//           this.errorMessage = "Backend error! Start Spring Boot!";
//         }
//       });
//   }
 
//   resetForm(): void {
//     this.principal = 0;
//     this.annualRate = 0;
//     this.tenureYears = 0;
//     this.errorMessage = '';
//     this.emi = this.totalInterest = this.totalAmount = null;
//   }
// }


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
 
// interface EmiResponse {
//   emiAmount: number;
// }
 
// @Component({
//   selector: 'app-emi-calculator',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './emi-calculator.html',
//   styleUrls: ['./emi-calculator.css']
// })
// export class EmiCalculator {
 
//   principal: number | null = null;
//   annualRate: number | null = null;
//   tenureYears: number | null = null;
 
//   emi: number | null = null;
//   totalInterest: number | null = null;
//   totalAmount: number | null = null;
 
//   errorMessage = '';
 
//   private apiUrl = 'http://localhost:8080/api/emi/calculate';
 
//   constructor(private http: HttpClient) {}
 
//   calculateEmi(): void {
//     this.errorMessage = '';
//     this.emi = this.totalInterest = this.totalAmount = null;
 
//     // 1) empty check
//     if (this.principal == null || this.annualRate == null || this.tenureYears == null) {
//       this.errorMessage = 'Please enter all the values.';
//       return;
//     }
 
//     // 2) positive values check
//     if (this.principal <= 0 || this.annualRate <= 0 || this.tenureYears <= 0) {
//       this.errorMessage = 'Values must be greater than zero.';
//       return;
//     }
 
//     const payload = {
//       loanValue: this.principal,
//       yearlyInterestRate: this.annualRate,
//       loanTermYears: this.tenureYears
//     };
 
//     this.http.post<EmiResponse>(this.apiUrl, payload).subscribe({
//       next: (res) => {
//         // 1) set EMI from backend
//         this.emi = Number(res.emiAmount.toFixed(2));
 
//         // 2) calculate months
//         const months = this.tenureYears! * 12;
 
//         // 3) total amount & interest
//         const ta = this.emi * months;
//         this.totalAmount = Number(ta.toFixed(2));
//         this.totalInterest = Number((this.totalAmount - this.principal!).toFixed(2));
 
//         console.log('EMI from backend:', this.emi);
//       },
//       error: (err) => {
//         console.error('Backend error:', err);
//         this.errorMessage = 'Failed to calculate EMI from server.';
//       }
//     });
//   }
 
//   resetForm(): void {
//     this.principal = null;
//     this.annualRate = null;
//     this.tenureYears = null;
//     this.errorMessage = '';
//     this.emi = this.totalInterest = this.totalAmount = null;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
interface EmiResponse {
  emiAmount: number;
}

interface EmiResult {
  emi: number;
  totalInterest: number;
  totalAmount: number;
}
 
@Component({
  selector: 'app-emi-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './emi-calculator.html',
  styleUrls: ['./emi-calculator.css'],
})
export class EmiCalculator implements OnInit {
  emiForm!: FormGroup;
  
  result$: Observable<EmiResult | null> | null = null;
  errorMessage = '';
  isLoading = false;
 
  private apiUrl = 'http://localhost:8080/api/emi/calculate';
 
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize the form with validation rules
  initializeForm(): void {
    this.emiForm = this.fb.group({
      principal: [
        null, 
        [
          Validators.required,
          Validators.min(1),
          this.positiveNumberValidator.bind(this)
        ]
      ],
      annualRate: [
        null,
        [
          Validators.required,
          Validators.min(0.01),
          Validators.max(100),
          this.rateRangeValidator.bind(this)
        ]
      ],
      tenureYears: [
        null,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(30),
          this.tenureRangeValidator.bind(this)
        ]
      ]
    });
  }

  // Custom validator: positive number
  positiveNumberValidator(control: any) {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return value > 0 ? null : { notPositive: true };
  }

  // Custom validator: interest rate range (0-100)
  rateRangeValidator(control: any) {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }
    if (value <= 0 || value > 100) {
      return { rateOutOfRange: true };
    }
    return null;
  }

  // Custom validator: tenure range (1-30)
  tenureRangeValidator(control: any) {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return null;
    }
    if (value <= 0 || value > 30) {
      return { tenureOutOfRange: true };
    }
    return null;
  }

  // Get error message for a field
  getErrorMessage(fieldName: string): string {
    const control = this.emiForm.get(fieldName);
    
    if (!control || !control.errors || !control.dirty) {
      return '';
    }

    const errors = control.errors;

    if (fieldName === 'principal') {
      if (errors['required']) return 'Loan amount is required.';
      if (errors['min'] || errors['notPositive']) return 'Loan amount must be a positive number.';
    }

    if (fieldName === 'annualRate') {
      if (errors['required']) return 'Interest rate is required.';
      if (errors['min']) return 'Interest rate must be greater than 0.';
      if (errors['max']) return 'Interest rate must not exceed 100%.';
      if (errors['rateOutOfRange']) return 'Interest rate must be between 0 and 100%.';
    }

    if (fieldName === 'tenureYears') {
      if (errors['required']) return 'Loan term is required.';
      if (errors['min']) return 'Loan term must be at least 1 year.';
      if (errors['max']) return 'Loan term must not exceed 30 years.';
      if (errors['tenureOutOfRange']) return 'Loan term must be between 1 and 30 years.';
    }

    return '';
  }

  // Check if field has error - Show validation as soon as user types (dirty flag)
  hasError(fieldName: string): boolean {
    const control = this.emiForm.get(fieldName);
    return !!(control && control.invalid && control.dirty);
  }
 
  calculateEmi(): void {
    this.errorMessage = '';
    this.result$ = null;

    // Mark all fields as touched to show validation errors
    Object.keys(this.emiForm.controls).forEach(key => {
      this.emiForm.get(key)?.markAsTouched();
    });

    // Check if form is invalid
    if (this.emiForm.invalid) {
      console.log('Form validation errors:', this.emiForm.errors);
      return;
    }
 
    console.log('All validations passed, sending to backend...');
    this.isLoading = true;
    
    // Get values from form
    const { principal, annualRate, tenureYears } = this.emiForm.value;

    const payload = {
      loanValue: principal,
      yearlyInterestRate: annualRate,
      loanTermYears: tenureYears,
    };
 
    // Call backend - Reactive approach with Observable
    this.http.post<EmiResponse>(this.apiUrl, payload).subscribe({
      next: (res) => {
        console.log('Backend response:', res);
        
        const emi = Number(res.emiAmount.toFixed(2));
        const months = tenureYears * 12;
        const totalAmt = emi * months;
        
        const totalAmount = Number(totalAmt.toFixed(2));
        const totalInterest = Number((totalAmount - principal).toFixed(2));
        
        console.log('EMI from backend:', emi);
        console.log('Total Amount:', totalAmount);
        console.log('Total Interest:', totalInterest);
        
        // Set result observable (Angular will automatically detect changes)
        this.result$ = new Observable(observer => {
          observer.next({ emi, totalInterest, totalAmount });
          observer.complete();
        });
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Backend error:', err);
        this.errorMessage = 'Failed to calculate EMI from server. Make sure backend is running on http://localhost:8080';
        this.isLoading = false;
      }
    });
  }
 
  resetForm(): void {
    this.emiForm.reset();
    this.result$ = null;
    this.errorMessage = '';
    this.isLoading = false;
  }
}
 