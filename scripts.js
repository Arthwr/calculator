let operator, result;
let isFirstNumberEntered = false;
let isOperatorUsed = false;
let isErrorOccurred = false;
let valueList = [];

const display = document.querySelector(".display");
const controls = document.querySelector(".controls");
const buttons = document.querySelectorAll("button");
const clearbtn = document.querySelector("#clear-btn");
const equalbtn = document.querySelector("#equal-btn");
const decimalbtn = document.querySelector("#decimal-btn");

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
    storeValue(isOperatorUsed ? 1 : 0, Number(display.textContent));
  } else if (button.classList.contains("operators")) {
    isFirstNumberEntered = true;
    isOperatorUsed = true;
    if (valueList.length === 2) {
      calculate();
    }
    operator = button.textContent;
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
    display.textContent = error.message;
    resetCalculatorState();
  }
}

//  Utility buttons
clearbtn.addEventListener("click", () => {
  clearDisplay();
  resetCalculatorState();
});

equalbtn.addEventListener("click", () => {
  if (valueList.length === 2 && operator !== "undefined") {
    calculate();
  }
});

// Helper functions
function displayNumber(value) {
  display.textContent += value;
  decimalbtn.disabled = display.textContent.includes(".");
}

function storeValue(index, value) {
  valueList[index] = value;
}

function clearDisplay() {
  display.textContent = "";
}

function resetCalculatorState() {
  valueList = [];
  isOperatorUsed = false;
  isFirstNumberEntered = false;
  decimalbtn.disabled = false;
  operator = undefined;
}
