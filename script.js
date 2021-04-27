let displayValue1 = "";
let displayValue2 = "";
let displayOperator= null;
let screenReset = false;

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const equalsButton = document.querySelector("[data-equals]");
const pointButton = document.querySelector("[data-point]");
const screen = document.querySelector("[data-screen]");

equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);
pointButton.addEventListener("click", appendPoint);

numberButtons.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);



function appendNumber(number) {
  if (screen.textContent === "0" || screenReset) resetScreen();
  screen.textContent += number;
}

function clear() {
    screen.textContent = "0";
    displayValue1 = "";
    displayValue2 = "";
    displayOperator = null;
}

function resetScreen() {
  screen.textContent = "";
  screenReset = false;
}

function deleteNumber() {
  screen.textContent = screen.textContent.toString().slice(0, -1);
}

function appendPoint() {
  if (screenReset) resetScreen();
  if (screen.textContent === "") screen.textContent = "0";
  if (screen.textContent.includes(".")) return;
  screen.textContent += ".";
}

function setOperation (operator) {
  if (displayOperator !== null) evaluate();
  displayValue1 = screen.textContent
  displayOperator = operator;
  screenReset = true;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

//checks to make sure operator is selected and user is not
//trying to divide by zero. evaluates operation and resets
//the operator value to null
function evaluate() {
  if (displayOperator === null || screenReset) return;
  if (displayOperator === "÷" && screen.textContent === "0") {
      alert("You can't divide by zero!");
      clear();
      return;
  }
  displayValue2 = screen.textContent;
  screen.textContent = roundResult(
      operate(displayOperator, displayValue1, displayValue2)
  );
  displayOperator = null;
}

function subtract(a, b) {
  return a - b;
}

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate (operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
      case "-":
          return subtract(a, b);
      case "+":
          return add(a, b);
      case "×":
          return multiply(a, b);
      case "÷":
          if (b === 0) return null;
          else return divide(a, b);
      default:
          return null;
  }
}

