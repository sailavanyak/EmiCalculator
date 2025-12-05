EMI Calculator 
 
  
Technologies Used: Spring Boot (Backend) + HTML/CSS/JS (Frontend)
 
 
 Objective
To calculate Equated Monthly Installments (EMI) for loans based on:
- Loan Amount (₹)
- Annual Interest Rate (%)
- Loan Tenure (Years)
 

The project shows:
- Monthly EMI
- Total Payable Amount
- Total Interest
 

 
 Architecture Overview
 
Frontend (HTML + CSS + JS) → calls → Spring Boot Backend API
 
 
- Validation on both frontend & backend  
- EMI calculated on server using standard EMI formula  
- Result displayed beautifully in UI  
 
---
 
Project Structure
 
src/main/java/com/example/demo
│
├── controller
│   └── EmiController.java
│
├── service
│   └── EmiService.java
     └── EmiServiceImpl.java

│
├── exception
│   └── GlobalExceptionHandler.java  │
├── dto
│   ├── EmiRequest.java
│   └── EmiResponse.java
│
└── DemoApplication.java
 



 
 EMI Formula (Used in Backend)
 
EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
 

 
Where  
P = Loan Amount  
r = Monthly interest rate = annualRate/12/100  
n = Total months = years × 12  
 

---
 
 API Endpoint
 
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/emi/calculate` | Returns EMI Amount |
 
Sample Request

json
{
  "loanValue": 500000,
  "yearlyInterestRate": 8.5,
  "loanTermYears": 10
}

Sample Response
json

{
  "emiAmount": 6199.28
}


Scenario	HTTP Status Code	Response Body
Success	200 OK	The expanded EmiResponse DTO.

- How to Run
Backend:

bash
cd backend/demo
mvn spring-boot:run
Runs on http://localhost:8080
 
Frontend
Just open:
 
bash

frontend/emi-frontend/index.html
 Make sure backend is running
 
 Validation Rules
Field Rule
Loan Amount Must be > 0
Interest Rate 0 < rate ≤ 100
Tenure 1 to 30 years
 
Frontend + Backend show messages for invalid inputs.
