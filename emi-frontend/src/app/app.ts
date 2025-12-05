import { Component } from '@angular/core';
import { EmiCalculator } from './emi-calculator/emi-calculator';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmiCalculator],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {}