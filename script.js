const display = document.getElementById('display');
const equationView = document.getElementById('equation');

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

function appendNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        // Prevent multiple decimals
        if (num === '.' && currentInput.includes('.')) return;
        currentInput += num;
    }
    updateDisplay();
}

function setOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    equationView.innerText = `${previousInput} ${getOperatorSymbol(op)}`;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || shouldResetDisplay) return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    // FIX: Yahan se teen dots (...) hata diye hain
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': 
            if (current === 0) {
                showError('Cannot divide by 0');
                return;
            }
            result = prev / current; 
            break;
        case '%': result = (prev / 100) * current; break;
        default: return;
    }

    // Handle floating point precision error
    if (result % 1 !== 0) {
        result = parseFloat(result.toFixed(8));
    }

    equationView.innerText = `${previousInput} ${getOperatorSymbol(operator)} ${currentInput} =`;
    currentInput = String(result);
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
}

// AC Button Functionality
function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    equationView.innerText = '';
    shouldResetDisplay = false;
    updateDisplay();
}

// DEL Button Functionality
function deleteLast() {
    if (shouldResetDisplay) return; 
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput;
}

function getOperatorSymbol(op) {
    if (op === '*') return '×';
    if (op === '/') return '÷';
    return op;
}

function showError(msg) {
    display.value = msg;
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = true;
}

// Keyboard Integration
document.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') appendNumber(e.key);
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperator(e.key);
    if (e.key === 'Enter' || e.key === '=') { e.preventDefault(); calculate(); }
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearAll();
});