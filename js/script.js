let firstNumber = null;
let operator = null;
let secondNumber = null;
let decimalEntered = false;
let inputDisabled = false;

function addToDisplay(value) {
  if ((value === "." && decimalEntered) || inputDisabled) {
    return;
  }

  let input = document.getElementById("input");
  let output = document.getElementById("output");

  if (operator === null) {
    if (firstNumber === null) {
      firstNumber = value;
      input.textContent = firstNumber;
    } else {
      firstNumber += value;
      input.textContent = firstNumber;
    }
  } else {
    if (secondNumber === null) {
      secondNumber = value;
      input.textContent = secondNumber;
    } else {
      secondNumber += value;
      input.textContent = secondNumber;
    }
  }

  decimalEntered = value === ".";

  if (input.scrollWidth > input.clientWidth) {
    input.classList.add("font-tiny");
  } else if (
    input.clientWidth - input.scrollWidth !== 0 &&
    input.clientWidth - input.scrollWidth < 30
  ) {
    input.classList.add("font-small");
  } else {
    input.classList.remove("font-tiny", "font-small");
  }

  if (output.scrollWidth > output.clientWidth) {
    output.classList.add("font-tiny");
  } else if (
    output.clientWidth - output.scrollWidth !== 0 &&
    output.clientWidth - output.scrollWidth < 30
  ) {
    output.classList.add("font-small");
  } else {
    output.classList.remove("font-tiny", "font-small");
  }
}

function setOperator(value) {
  if (firstNumber === null || inputDisabled) {
    return;
  }

  if (operator !== null && secondNumber !== null) {
    calculate();
  }

  operator = value;
  let output = document.getElementById("output");
  output.textContent = firstNumber + " " + operator;
  inputDisabled = false;
}

function calculate() {
  let output = document.getElementById("output");

  if (operator === null || secondNumber === null || inputDisabled) {
    return;
  }

  let result = null;

  switch (operator) {
    case "+":
      result = Number(firstNumber) + Number(secondNumber);
      break;
    case "-":
      result = Number(firstNumber) - Number(secondNumber);
      break;
    case "*":
      result = Number(firstNumber) * Number(secondNumber);
      break;
    case "/":
      if (secondNumber === "0") {
        displayError("Cannot divide by zero");
        return;
      }
      result = Number(firstNumber) / Number(secondNumber);
      break;
    default:
      return;
  }

  let input = document.getElementById("input");

  if (result % 1 !== 0) {
    input.textContent = result.toFixed(2);
  } else {
    input.textContent = result;
  }

  if (operator !== null) {
    output.textContent += " " + secondNumber + " = ";
    firstNumber = result;
    secondNumber = null;
    inputDisabled = true;
  } else {
    clearData();
  }

  decimalEntered = false;

  if (input.scrollWidth > input.clientWidth) {
    input.classList.add("font-tiny");
  } else if (
    input.clientWidth - input.scrollWidth !== 0 &&
    input.clientWidth - input.scrollWidth < 30
  ) {
    input.classList.add("font-small");
  } else {
    input.classList.remove("font-tiny", "font-small");
  }

  if (output.scrollWidth > output.clientWidth) {
    output.classList.add("font-tiny");
  } else if (
    output.clientWidth - output.scrollWidth !== 0 &&
    output.clientWidth - output.scrollWidth < 30
  ) {
    output.classList.add("font-small");
  } else {
    output.classList.remove("font-tiny", "font-small");
  }
}

function clearDisplay() {
  let input = document.getElementById("input");
  input.textContent = "0";
  input.classList.remove("font-tiny", "font-small");
  let output = document.getElementById("output");
  output.textContent = "";
  output.classList.remove("font-tiny", "font-small");
  clearData();
  inputDisabled = false;
}

function backspace() {
  if (inputDisabled) {
    return;
  }

  let input = document.getElementById("input");
  let output = document.getElementById("output");

  if (input.textContent === "0") {
    return;
  }

  let value = input.textContent.slice(0, -1);

  if (value === "") {
    value = "0";
  }

  input.textContent = value;

  if (secondNumber !== null) {
    secondNumber = secondNumber.slice(0, -1);
  } else if (operator !== null) {
    operator = null;
    output.textContent = "";
  } else {
    firstNumber = firstNumber.slice(0, -1);
  }

  decimalEntered = input.textContent.includes(".");
}

function displayError(message) {
  let input = document.getElementById("input");
  input.textContent = message;
  inputDisabled = true;
}

function clearData() {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  decimalEntered = false;
  inputDisabled = false;
}

function handleKeyDown(event) {
  switch (event.key) {
    case "0":
      addToDisplay("0");
      break;
    case "1":
      addToDisplay("1");
      break;
    case "2":
      addToDisplay("2");
      break;
    case "3":
      addToDisplay("3");
      break;
    case "4":
      addToDisplay("4");
      break;
    case "5":
      addToDisplay("5");
      break;
    case "6":
      addToDisplay("6");
      break;
    case "7":
      addToDisplay("7");
      break;
    case "8":
      addToDisplay("8");
      break;
    case "9":
      addToDisplay("9");
      break;
    case "+":
      setOperator("+");
      break;
    case "-":
      setOperator("-");
      break;
    case "":
      setOperator("");
      break;
    case "/":
      setOperator("/");
      break;
    case ".":
      addToDisplay(".");
      break;
    case "Enter":
      calculate();
      break;
    case "Backspace":
      backspace();
      break;
    default:
      return;
  }
  event.preventDefault();
}

document.addEventListener("keydown", handleKeyDown);
