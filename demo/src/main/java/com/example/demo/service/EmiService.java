package com.example.demo.service;

import com.example.demo.dto.EmiRequest;
import com.example.demo.dto.EmiResponse;

public interface EmiService {
    EmiResponse calculateEmi(EmiRequest request);
}