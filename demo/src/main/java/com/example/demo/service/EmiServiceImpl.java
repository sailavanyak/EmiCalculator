package com.example.demo.service;

import com.example.demo.dto.EmiRequest;
import com.example.demo.dto.EmiResponse;
import org.springframework.stereotype.Service;

@Service
public class EmiServiceImpl implements EmiService {

    @Override
    public EmiResponse calculateEmi(EmiRequest request) {
        double principal = request.getLoanValue();
        double yearlyRate = request.getYearlyInterestRate();
        int termYears = request.getLoanTermYears();

        int n = termYears * 12;
        double r = yearlyRate / 12 / 100;

        double emi;

        if (r == 0) {
            emi = principal / n;
        } else {
            double onePlusRPowerN = Math.pow(1 + r, n);
            emi = principal * r * onePlusRPowerN / (onePlusRPowerN - 1);
        }

        emi = Math.round(emi * 100.0) / 100.0;

        return new EmiResponse(emi);
    }
}