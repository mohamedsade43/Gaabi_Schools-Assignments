
/* =========================
   1. SELECT HTML ELEMENTS
========================= */

const currentOperandElement = document.getElementById("currentOperand");
const previousOperandElement = document.getElementById("previousOperand");

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const actionButtons = document.querySelectorAll("[data-action]");

/* =========================
   2. CALCULATOR STATE
========================= */

let currentOperand = "0";
let previousOperand = "";
let operation = null;
let shouldResetScreen = false;

/* =========================
   3. UPDATE DISPLAY
========================= */

function updateDisplay() {
    currentOperandElement.textContent = currentOperand;

    if (operation !== null && previousOperand !== "") {
        previousOperandElement.textContent =
            `${previousOperand} ${operation}`;
    } else {
        previousOperandElement.textContent = "";
    }
}

/* =========================
   4. INPUT NUMBERS
========================= */

function appendNumber(number) {
    if (shouldResetScreen || currentOperand === "Error") {
        currentOperand = number;
        shouldResetScreen = false;
        updateDisplay();
        return;
    }

    if (currentOperand.length >= 15) return;

    if (currentOperand === "0") {
        currentOperand = number;
    } else {
        currentOperand += number;
    }

    updateDisplay();
}

/* =========================
   5. DECIMAL POINT
========================= */

function appendDecimal() {
    if (shouldResetScreen || currentOperand === "Error") {
        currentOperand = "0.";
        shouldResetScreen = false;
        updateDisplay();
        return;
    }

    if (!currentOperand.includes(".")) {
        currentOperand += ".";
        updateDisplay();
    }
}

/* =========================
   6. CHOOSE OPERATION
========================= */

function chooseOperation(nextOperation) {
    if (currentOperand === "Error") return;

    if (operation !== null && !shouldResetScreen) {
        calculate();
    }

    previousOperand = currentOperand;
    operation = nextOperation;
    shouldResetScreen = true;

    updateDisplay();
}

/* =========================
   7. PERFORM CALCULATION
========================= */

function calculate() {
    if (
        operation === null ||
        previousOperand === "" ||
        currentOperand === "Error"
    ) {
        return;
    }

    const firstNumber = Number(previousOperand);
    const secondNumber = Number(currentOperand);

    let result;

    switch (operation) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "×":
            result = firstNumber * secondNumber;
            break;

        case "÷":
            if (secondNumber === 0) {
                currentOperand = "Error";
                previousOperand = "Cannot divide by zero";
                operation = null;
                shouldResetScreen = true;
                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;

        case "%":
            if (secondNumber === 0) {
                currentOperand = "Error";
                previousOperand = "Cannot calculate";
                operation = null;
                shouldResetScreen = true;
                updateDisplay();
                return;
            }

            result = firstNumber % secondNumber;
            break;

        default:
            return;
    }

    if (!Number.isFinite(result)) {
        currentOperand = "Error";
    } else {
        // Reduce common floating-point calculation errors.
        currentOperand = String(
            Number(result.toPrecision(12))
        );
    }

    previousOperand = "";
    operation = null;
    shouldResetScreen = true;

    updateDisplay();
}

/* =========================
   8. CLEAR ALL
========================= */

function clearCalculator() {
    currentOperand = "0";
    previousOperand = "";
    operation = null;
    shouldResetScreen = false;

    updateDisplay();
}

/* =========================
   9. DELETE LAST DIGIT
========================= */

function deleteDigit() {
    if (currentOperand === "Error" || shouldResetScreen) {
        currentOperand = "0";
        shouldResetScreen = false;
    } else {
        currentOperand = currentOperand.slice(0, -1);

        if (currentOperand === "" || currentOperand === "-") {
            currentOperand = "0";
        }
    }

    updateDisplay();
}

/* =========================
   10. POSITIVE / NEGATIVE
========================= */

function toggleSign() {
    if (currentOperand === "Error") return;

    if (currentOperand === "0") return;

    currentOperand = currentOperand.startsWith("-")
        ? currentOperand.slice(1)
        : "-" + currentOperand;

    shouldResetScreen = false;
    updateDisplay();
}

/* =========================
   11. BUTTON EVENTS
========================= */

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        appendNumber(button.dataset.number);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        chooseOperation(button.dataset.operator);
    });
});

actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;

        switch (action) {
            case "clear":
                clearCalculator();
                break;

            case "delete":
                deleteDigit();
                break;

            case "decimal":
                appendDecimal();
                break;

            case "sign":
                toggleSign();
                break;

            case "equals":
                calculate();
                break;
        }
    });
});

/* =========================
   12. KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        appendNumber(key);
    } else if (key === ".") {
        appendDecimal();
    } else if (key === "+") {
        chooseOperation("+");
    } else if (key === "-") {
        chooseOperation("-");
    } else if (key === "*") {
        chooseOperation("×");
    } else if (key === "/") {
        event.preventDefault();
        chooseOperation("÷");
    } else if (key === "%") {
        chooseOperation("%");
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        deleteDigit();
    } else if (key === "Escape") {
        clearCalculator();
    }
});

/* =========================
   13. INITIAL DISPLAY
========================= */

updateDisplay();
