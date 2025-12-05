package com.example.demo.dto;

public class EmiResponse {

    private double emiAmount;

    public EmiResponse(double emiAmount) {
        this.emiAmount = emiAmount;
    }

    public double getEmiAmount() {
        return emiAmount;
    }

    public void setEmiAmount(double emiAmount) {
        this.emiAmount = emiAmount;
    }
}