package com.example.demo.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;

public class EmiRequest {

    @Positive(message = "Loan value must be positive")
    private double loanValue;

    @DecimalMin(value = "0.0", inclusive = false, message = "Interest rate must be greater than 0")
    @DecimalMax(value = "100.0", message = "Interest rate must be less than or equal to 100")
    private double yearlyInterestRate;

    @Min(value = 1, message = "Loan term must be at least 1 year")
    @Max(value = 30, message = "Loan term cannot be more than 30 years")
    private int loanTermYears;

    public double getLoanValue() {
        return loanValue;
    }

    public void setLoanValue(double loanValue) {
        this.loanValue = loanValue;
    }

    public double getYearlyInterestRate() {
        return yearlyInterestRate;
    }

    public void setYearlyInterestRate(double yearlyInterestRate) {
        this.yearlyInterestRate = yearlyInterestRate;
    }

    public int getLoanTermYears() {
        return loanTermYears;
    }

    public void setLoanTermYears(int loanTermYears) {
        this.loanTermYears = loanTermYears;
    }
}
 