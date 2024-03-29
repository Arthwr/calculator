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
const backspaceBtn = document.querySelector("#backspace-btn");
const signBtn = document.querySelector("#sign-btn");

// Numbers and operators
controls.addEventListener("click", (event) => {
  const button = event.target;

  if (button.classList.contains("numbers")) {
    handleNumberButton(button.textContent);
  } else if (button.classList.contains("operators")) {
    handleOperatorButton(button.textContent);
  }
});

//  Utility buttons
clearBtn.addEventListener("click", handleClearButton);
equalBtn.addEventListener("click", handleEqualButton);
backspaceBtn.addEventListener("click", handleBackspaceButton);
signBtn.addEventListener("click", handleSignButton);

// Keyboard support
document.addEventListener("keydown", handleKeyDown);

// Helper functions
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

function handleNumberButton(value) {
  if (isFirstNumberEntered || isErrorOccurred) {
    clearDisplay();
    isFirstNumberEntered = false;
    isErrorOccurred = false;
  }
  // Prevent input overflow condition
  if (display.value.length <= 18) {
    displayNumber(value);
    storeValue(isOperatorUsed ? 1 : 0, Number(display.value));
  }
}

function handleOperatorButton(value) {
  isFirstNumberEntered = true;
  isOperatorUsed = true;
  if (valueList.length === 2) {
    calculate();
  }
  operator = value;
}

function handleEqualButton() {
  if (valueList.length === 2 && operator !== "undefined") {
    calculate();
  }
}

function handleClearButton() {
  clearDisplay();
  resetCalculatorState();
}

function handleSignButton() {
  const currentValue = Number(display.value);
  if (display.value !== "" && currentValue !== 0) {
    const newValue = -currentValue;
    display.value = newValue;
    const indexToStore = isOperatorUsed && valueList.length === 2 ? 1 : 0;
    storeValue(indexToStore, newValue);
  }
}

function handleBackspaceButton() {
  const inputValue = display.value;
  if (isErrorOccurred) {
    handleClearButton();
  } else if (inputValue.length > 0) {
    const resultString = inputValue.slice(0, -1);
    display.value = resultString;
    storeValue(isOperatorUsed ? 1 : 0, Number(display.value));
  }
}

function handleKeyDown(event) {
  const key = event.key;
  event.preventDefault();

  if (/^[0-9.]$/.test(key)) {
    handleNumberButton(key);
  } else {
    switch (key) {
      case "*":
      case "/":
      case "+":
      case "-":
        handleOperatorButton(key);
        break;
      case "=":
      case "Enter":
        handleEqualButton();
        break;
      case "Backspace":
      case "Delete":
        handleBackspaceButton();
        break;
    }
  }
}

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

// Todo (sometime in future)
// 1. Add backspace support to remove all highlighted digits
// 2. Input validation:
//    a) Prevent numbers like 0123 to be typed in by User (starting any non single digit from 0)
//    b) Prevent double decimals like 0.1.2
// 3. Add a synched visual pressed effect with keyboard (aka pressing button on keyboard corresponds with visual button being pressed in browser)
