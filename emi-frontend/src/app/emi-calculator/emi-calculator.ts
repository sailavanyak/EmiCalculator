import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
 
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
  
  result$ = new BehaviorSubject<EmiResult | null>(null);
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
    this.result$.next(null);

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
        
        // Set result using BehaviorSubject (efficient, fast update)
        this.result$.next({ emi, totalInterest, totalAmount });
        
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
    this.result$.next(null);
    this.errorMessage = '';
    this.isLoading = false;
  }
}
 