let operator;
let result;
let firstNumber;
let secondNumber;

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
      return num1 / num2;
    case "*":
      return num1 * num2;
    default:
      return "Invalid operator";
  }
}

// Controls
let isFirstNumberEntered = false;
let isOperatorUsed = false;
let valueList = [];

controls.addEventListener("click", (event) => {
  const button = event.target;

  if (button.classList.contains("numbers")) {
    if (isFirstNumberEntered) {
      clearDisplay();
      isFirstNumberEntered = false;
    }
    displayNumber(button.textContent);
    if (!isOperatorUsed) {
      storeValue(0);
    } else {
      storeValue(1);
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
  result = operate(operator, valueList[0], valueList[1]);
  clearDisplay();
  displayNumber(result);
  valueList.splice(0, 2);
  storeValue(0);
}

//  Utility buttons
clearbtn.addEventListener("click", () => {
  clearDisplay();
  isFirstNumberEntered = false;
  isOperatorUsed = false;
  operator = undefined;
});

equalbtn.addEventListener("click", () => {
  if (
    typeof valueList[0] !== "undefined" &&
    typeof valueList[1] !== "undefined" &&
    typeof operator !== "undefined"
  ) {
    calculate();
    isFirstNumberEntered = true;
  }
});

// Helper functions
function displayNumber(value) {
  display.textContent += value;

  if (display.textContent.toString().includes(".")) {
    console.log("btn disabled");
    decimalbtn.disabled = true;
  } else {
    decimalbtn.disabled = false;
  }
}

function storeValue(index) {
  valueList[index] = Number(display.textContent);
}

function clearDisplay() {
  display.textContent = "";
}
