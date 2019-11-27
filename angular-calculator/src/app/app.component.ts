import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-calculator';

  numberButtons: any;
  operationButtons: any;
  equalsButton: any;
  deleteButton: any;
  allClearButton: any;
  previousOperandTextElement: any;
  currentOperandTextElement: any;
  currentOperand: any;
  operation: any;
  previousOperand: any;


  constructor(private elem: ElementRef) {
  }


  ngOnInit() {
    this.makeQuerySelection()
    this.clear()

    this.numberButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.appendNumber(button.innerText);
        this.updateDisplay();
        console.log(button.innerText)
      })
    });

    this.operationButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.chooseOperation(button.innerText);
        this.updateDisplay()
      });
    });

    this.equalsButton.addEventListener('click', button => {
      this.compute();
      this.updateDisplay();
    });

    this.allClearButton.addEventListener('click', button => {
      this.clear();
      this.updateDisplay();
    });

    this.deleteButton.addEventListener('click', button => {
      this.delete();
      this.updateDisplay();
    });

  }

  makeQuerySelection() {
    this.numberButtons = this.elem.nativeElement.querySelectorAll('[data-number]');
    this.operationButtons = document.querySelectorAll('[data-operation]');
    this.equalsButton = document.querySelector('[data-equals]');
    this.deleteButton = document.querySelector('[data-delete]');
    this.allClearButton = document.querySelector('[data-all-clear]');
    this.previousOperandTextElement = document.querySelector('[data-previous-operand]');
    this.currentOperandTextElement = document.querySelector('[data-current-operand]');
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;

  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

chooseOperation(operation){
  if (this.currentOperand === '') return;
  if (this.previousOperand !== '') {
    this.compute();
  }
  this.operation = operation;
  this.previousOperand = this.currentOperand;
  this.currentOperand = '';
}

compute(){
  let computation;
  const prev = parseFloat(this.previousOperand);
  const current = parseFloat(this.currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (this.operation) {
    case '+':
      computation = prev + current;
      break
    case '-':
      computation = prev - current;
      break
    case '*':
      computation = prev * current;
      break
    case '÷':
      computation = prev / current;
      break
    default:
      return
  }
  this.currentOperand = computation;
  this.operation = undefined;
  this.previousOperand = '';
}

  getDisplayNumber(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if(isNaN(integerDigits)){
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
    }
    if (decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

updateDisplay() {
  this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
  if (this.operation != null) {
    this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
  }else{
    this.previousOperandTextElement.innerText = ''
  }
  }

}
