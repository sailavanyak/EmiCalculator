 EMI Calculator – Frontend (Angular 21)
 
This is the frontend of a Loan EMI (Equated Monthly Instalment) Calculator created using Angular 21 with standalone components.
 
It helps users calculate:
- Monthly EMI
- Total Interest payable
- Total Amount payable
 

 
  What User Can Do
 
- Enter Loan Amount (₹)  
- Enter Annual Interest Rate (%) 
- Enter Loan Tenure (Years) 
- Click Calculate EMI to see results  
- See error message if values are missing
 

 
  Tech Stack
 
- Angular 21.0.1
- TypeScript
- HTML & CSS
 

 
  Project Structure
 
text
emi-frontend/
├── src/
│   ├── main.ts
│   └── app/
│       ├── app.ts
│       ├── app.html
│       ├── app.css
│       └── emi-calculator/
│           ├── emi-calculator.ts
│           ├── emi-calculator.html
│           └── emi-calculator.css
├── angular.json
├── package.json
└── README.md

UI Behavior
 
- Input Fields
 
Loan Amount (₹)
 
Interest Rate (% annually)
 
Tenure (years)
 
- Validations
 
If any field empty → Error: “Please enter all the values.”
 
Values must be greater than 0
 
EMI result shown only when valid


EMI Calculation Logic
 
Formula used:
 
EMI = P x R x (1+R)^N / [(1+R)^N-1]
 
Where:
 
Symbol Meaning
P Principal Loan Amount
R Monthly interest rate = (Annual Rate / 12) / 100
N Total months = Tenure (years) × 12
 
Results shown:
 
Monthly EMI
 
Total Interest
 
Total Amount to pay

How to Run the Frontend
 
1️. Open terminal in project folder:
 
cd emi-frontend
 
 
2️. Install dependencies:
 
npm install
 
 
3️. Start Angular app:
 
ng serve -o
 
 
4️. App opens in browser:
 
http://localhost:4200
 
 
You will see the Loan EMI Calculator UI 