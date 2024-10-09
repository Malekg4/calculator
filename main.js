document.addEventListener('DOMContentLoaded', () => {
    let displayContent = document.getElementById('content');
    let currentInput = '';
    let firstOperand = null;
    let secondOperand = null;
    let operation = '';

    // Update the display
    const updateDisplay = () => {
        displayContent.textContent = currentInput || '0';
    };

    // Basic arithmetic functions
    const add = (a, b) => a + b;
    const subtract = (a, b) => a - b;
    const multiply = (a, b) => a * b;
    const divide = (a, b) => {
        if (b === 0) {
            alert("You can't divide by 0!");
            return null;
        }
        return a / b;
    };

    // Function to perform the operation
    const operate = (operator, a, b) => {
        switch (operator) {
            case '+':
                return add(a, b);
            case '-':
                return subtract(a, b);
            case '*':
                return multiply(a, b);
            case '/':
                return divide(a, b);
            default:
                return null;
        }
    };

    // Handle number button clicks
    const handleNumberClick = (value) => {
        if (currentInput.length < 10) { // Limit display length
            currentInput += value;
            updateDisplay();
        }
    };

    // Handle operator button clicks
    const handleOperatorClick = (operator) => {
        if (currentInput) {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else if (operation) {
                secondOperand = parseFloat(currentInput);
                const result = operate(operation, firstOperand, secondOperand);
                if (result !== null) {
                    firstOperand = result; // Use result as first operand for the next operation
                    updateDisplay();
                }
            }
            operation = operator;
            currentInput = ''; // Reset for next input
        }
    };

    // Handle equals button
    const handleEquals = () => {
        if (firstOperand !== null && currentInput) {
            secondOperand = parseFloat(currentInput);
            const result = operate(operation, firstOperand, secondOperand);
            if (result !== null) {
                displayContent.textContent = Math.round(result * 100) / 100; // Round to 2 decimal places
            }
            // Reset for next calculation
            firstOperand = null;
            secondOperand = null;
            operation = '';
            currentInput = '';
        }
    };

    // Handle clear button
    const handleClear = () => {
        currentInput = '';
        firstOperand = null;
        secondOperand = null;
        operation = '';
        updateDisplay();
    };

    // Attach event listeners to buttons
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (!isNaN(value) || value === '.') {
                handleNumberClick(value);
            } else if (value === '=') {
                handleEquals();
            } else if (value === 'AC') {
                handleClear();
            } else {
                handleOperatorClick(value);
            }
        });
    });
});
