package com.example.demo.controller;

import com.example.demo.dto.EmiRequest;
import com.example.demo.dto.EmiResponse;
import com.example.demo.service.EmiService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/emi")
@CrossOrigin(origins = "http://localhost:4200")
public class EmiController {

    private final EmiService emiService;

    public EmiController(EmiService emiService) {
        this.emiService = emiService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<EmiResponse> calculateEmi(@Valid @RequestBody EmiRequest request) {
        EmiResponse response = emiService.calculateEmi(request);
        return ResponseEntity.ok(response);
    }
}