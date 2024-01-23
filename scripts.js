let operator;
let result;

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
      if (num2 === 0) {
        throw new Error("Can't divide by zero");
      }
      return num1 / num2;
    case "*":
      return num1 * num2;
    default:
      throw new Error("Invalid operator");
  }
}

// Controls
let isFirstNumberEntered = false;
let isOperatorUsed = false;
let isErrorOccured = false;
let valueList = [];

controls.addEventListener("click", (event) => {
  const button = event.target;

  if (button.classList.contains("numbers")) {
    if (isFirstNumberEntered || isErrorOccured) {
      clearDisplay();
      isFirstNumberEntered = false;
      isErrorOccured = false;
    }
    displayNumber(button.textContent);
    if (!isOperatorUsed) {
      storeValue(0, Number(display.textContent));
    } else {
      storeValue(1, Number(display.textContent));
    }
  } else if (button.classList.contains("operators")) {
    isFirstNumberEntered = true;
    isOperatorUsed = true;

    if (
      typeof valueList[0] !== "undefined" &&
      typeof valueList[1] !== "undefined"
    ) {
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
    valueList.splice(0, 2);
    storeValue(0, formattedNumber);
    isFirstNumberEntered = true;
  } catch (error) {
    display.textContent = error.message;
    valueList = [];
    isErrorOccured = true;
    isOperatorUsed = false;
  }
}

//  Utility buttons
clearbtn.addEventListener("click", () => {
  clearDisplay();
  isFirstNumberEntered = false;
  isOperatorUsed = false;
  decimalbtn.disabled = false;
  operator = undefined;
});

equalbtn.addEventListener("click", () => {
  if (
    typeof valueList[0] !== "undefined" &&
    typeof valueList[1] !== "undefined" &&
    typeof operator !== "undefined"
  ) {
    calculate();
  }
});

// Helper functions
function displayNumber(value) {
  display.textContent += value;

  if (display.textContent.toString().includes(".")) {
    decimalbtn.disabled = true;
  } else {
    decimalbtn.disabled = false;
  }
}

function storeValue(index, value) {
  valueList[index] = value;
}

function clearDisplay() {
  display.textContent = "";
}
