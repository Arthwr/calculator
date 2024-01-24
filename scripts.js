let operator, result;
let isFirstNumberEntered = false;
let isOperatorUsed = false;
let isErrorOccurred = false;
let valueList = [];

const display = document.querySelector(".display");
const controls = document.querySelector(".controls");
const buttons = document.querySelectorAll("button");
const clearBtn = document.querySelector("#clear-btn");
const equalBtn = document.querySelector("#equal-btn");
const decimalBtn = document.querySelector("#decimal-btn");

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "/":
      if (num2 === 0) throw new Error("Can't divide by zero");
      return num1 / num2;
    case "*":
      return num1 * num2;
    default:
      throw new Error("Invalid operator");
  }
}

// Controls
controls.addEventListener("click", (event) => {
  const button = event.target;

  if (button.classList.contains("numbers")) {
    if (isFirstNumberEntered || isErrorOccurred) {
      clearDisplay();
      isFirstNumberEntered = false;
      isErrorOccurred = false;
    }
    displayNumber(button.textContent);
    storeValue(isOperatorUsed ? 1 : 0, Number(display.value));
  } else if (button.classList.contains("operators")) {
    isFirstNumberEntered = true;
    isOperatorUsed = true;
    if (valueList.length === 2) {
      calculate();
    }
    operator = button.textContent;
  }
});

display.addEventListener("input", (event) => {
  const inputValue = event.data;
  const selectionStart = display.selectionStart;
  const selectionEnd = display.selectionEnd;

  // Check if the value is digit or a valid symbol
  if (!/^-?(0(\.\d+)?|[1-9]\d*(\.\d*)?|0(\.\d*)?)$/.test(display.value)) {
    display.value = display.value.replace(inputValue, "");
    display.setSelectionRange(selectionStart, selectionEnd);
  }
});

function calculate() {
  clearDisplay();
  try {
    result = operate(operator, valueList[0], valueList[1]);
    const formattedNumber = +result.toFixed(14);
    displayNumber(formattedNumber);
    valueList = [];
    storeValue(0, formattedNumber);
    isFirstNumberEntered = true;
  } catch (error) {
    isErrorOccurred = true;
    display.value = error.message;
    resetCalculatorState();
  }
}

//  Utility buttons
clearBtn.addEventListener("click", () => {
  clearDisplay();
  resetCalculatorState();
});

equalBtn.addEventListener("click", () => {
  if (valueList.length === 2 && operator !== "undefined") {
    calculate();
  }
});

// Helper functions
function displayNumber(value) {
  display.value += value;
  decimalBtn.disabled = display.value.includes(".");
}

function storeValue(index, value) {
  valueList[index] = value;
}

function clearDisplay() {
  display.value = "";
}

function resetCalculatorState() {
  valueList = [];
  isOperatorUsed = false;
  isFirstNumberEntered = false;
  decimalBtn.disabled = false;
  operator = undefined;
}

// separate concerns of button & operator functions
// restrict typing of letters & (optionally allow only numbers under certain conditions e.g. no 0015 , but 0.15)
// add keyboard support
// add backspace button
// restrict maximum length of typing into display & result (to not overflow)
