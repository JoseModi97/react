$(document).ready(function() {
    let currentInput = '0';
    let operator = null;
    let previousInput = null;
    let resultDisplayed = false;

    function updateDisplay() {
        $('#display').text(currentInput);
    }

    function roundResult(result) {
        return Math.round(result * 10000) / 10000;
    }

    $('.btn-numeric').on('click', function() {
        if (resultDisplayed) {
            currentInput = '0';
            resultDisplayed = false;
        }
        const value = $(this).text();
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            if (value === '.' && currentInput.includes('.')) {
                return;
            }
            currentInput += value;
        }
        updateDisplay();
    });

    $('.btn-operator').on('click', function() {
        const clickedOperator = $(this).text();

        if (clickedOperator === '-' && (operator && currentInput === '0')) {
            currentInput = '-';
            updateDisplay();
            return;
        }

        if (resultDisplayed) {
            previousInput = currentInput;
            resultDisplayed = false;
        } else if (operator) {
            $('#equals').click();
        }
        operator = clickedOperator;
        if(!previousInput) {
            previousInput = currentInput;
        }
        currentInput = '0';
    });

    $('#clear').on('click', function() {
        currentInput = '0';
        operator = null;
        previousInput = null;
        resultDisplayed = false;
        updateDisplay();
    });

    $('#equals').on('click', function() {
        if (!operator || previousInput === null) {
            return;
        }
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
        }

        currentInput = roundResult(result).toString();
        operator = null;
        previousInput = null;
        resultDisplayed = true;
        updateDisplay();
    });
});
