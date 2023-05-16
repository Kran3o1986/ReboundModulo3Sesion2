

const display = document.querySelector("#display");
const operationsBtns = document.querySelectorAll(".operator");
const numpadBtns = document.querySelectorAll(".number");

let activeOperator = "";
let accumulator = "";
let activeNumber = "";

function calculate(num1, num2) {
  switch (activeOperator) {
    case "suma":
      return num1 + num2;
      break;
    case "resta":
      return num1 - num2;
      break;
    case "multiplicacion":
      return num1 * num2;
      break;
    case "division":
      if (num2 !== 0) {
        return num1 / num2;
      } else return "To infinity... and beyond!";
      break;
  }
}

function getLastInput(text) {
  switch (text.textContent.charAt(display.textContent.length - 1)) {
    case "+":
    case "-":
    case "x":
    case "÷":
      return true;
      break;

    default:
      return false;
      break;
  }
}

operationsBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    if (!accumulator) {
      accumulator = activeNumber;
    } else if (!activeNumber) {
    } else {
      accumulator = calculate(Number(accumulator), Number(activeNumber));
    }

    activeOperator = e.target.value;

    if (!getLastInput(display)) {
      console.log("es número!!");
      display.textContent += e.target.textContent;
    } else {
      display.textContent =
        display.textContent.slice(0, -1) + e.target.textContent;
    }

    activeNumber = "";
  });
});

numpadBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    activeNumber += e.target.value;
    display.textContent += e.target.value;
  });
});

//special buttons
const resultBtn = document.querySelector("#resultBtn");

resultBtn.addEventListener("click", function () {
  accumulator = calculate(Number(accumulator), Number(activeNumber));
  display.textContent = accumulator;

  activeNumber = "";
  activeOperator = "";
});

const decimalBtn = document.querySelector("#decimalBtn");

decimalBtn.addEventListener("click", function () {
  if (activeNumber.includes(".")) {
    return;
  } else {
    activeNumber += ".";
    display.textContent += ".";
  }
});

const acBtn = document.querySelector("#acBtn");

acBtn.addEventListener("click", function () {
  accumulator = "";
  activeNumber = "";
  activeOperator = "";
  display.textContent = "";
});