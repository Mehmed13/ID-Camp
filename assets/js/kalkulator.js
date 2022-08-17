// let elemenHitung = document.createElement("p");
// elemenHitung.innerHTML = 'Anda menekan artikel sejarah sebanyak <span id="count"> 0 </span> kali!';
// document.body.appendChild(elemenHitung);

// let elemenSejarah = document.querySelector("#sejarah");
// elemenSejarah.addEventListener("click", function(event) {
//     document.querySelector("#count").innerText++;
// });



// deklarasi object
const calculator = {
    displayNumber: "0",
    operator: null,
    firstNumber: null,
    isWaitForSecondNumber: false
}

// fungsi
function updateDisplay() {
    document.querySelector(".displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = "0";
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.secondNumber = null;
    calculator.isWaitForSecondNumber = false;
}

function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

function handleOperator(operator) {
    if (!calculator.isWaitForSecondNumber) {
        calculator.operator = operator;
        calculator.firstNumber = calculator.displayNumber;
        calculator.displayNumber = "0";
        calculator.isWaitForSecondNumber = true;
    } else {
        alert("Operator sudah ditambahkan!");
    }
}

function calculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Tambahkan Operator!");
        return
    }

    let result = 0;

    if (calculator.operator == '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }


    //object pada history
    let history = {
        firstNumber: calculator.firstNumber,
        operator: calculator.operator,
        secondNumber: calculator.displayNumber,
        result: result
    }
    putHistory(history);

    calculator.displayNumber = result;
    calculator.isWaitForSecondNumber = false;
    renderHistory();
}

function inverseNumber() {
    if (calculator.displayNumber === "0") {
        return
    }
    calculator.displayNumber *= (-1);
}


// pembacaan aksi
const buttons = document.querySelectorAll(".button");
const clear = document.querySelector("#clear-history");

clear.addEventListener("click", function(event) {
    localStorage.removeItem(CACHE_KEY);
    renderHistory();
})

for (const button of buttons) {
    button.addEventListener("click", function(event) {
        const target = event.target;
        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;

        }
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }
        if (target.classList.contains('equals')) {
            calculation();
            updateDisplay();
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    })
}