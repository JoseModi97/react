$(document).ready(function() {
    let expression = '0';
    let resultDisplayed = false;

    function updateDisplay() {
        $('#display').text(expression);
    }

    function roundResult(result) {
        return Math.round(result * 10000) / 10000;
    }

    $('.btn-numeric').on('click', function() {
        const value = $(this).text();
        if (resultDisplayed) {
            expression = '0';
            resultDisplayed = false;
        }

        if (expression === '0' && value !== '.') {
            expression = value;
        } else {
            if (value === '.' && (expression.slice(-1) === '.' || expression.split(/[\+\-\*\/]/).pop().includes('.'))) {
                return;
            }
            expression += value;
        }
        updateDisplay();
    });

    $('.btn-operator').on('click', function() {
        const clickedOperator = $(this).text();
        resultDisplayed = false;

        const lastChar = expression.slice(-1);
        const secondLastChar = expression.slice(-2, -1);

        if (/[+\-*/]$/.test(expression) && clickedOperator !== '-') {
            if (/[+\-*/]$/.test(secondLastChar)) {
                expression = expression.slice(0, -2) + clickedOperator;
            } else {
                expression = expression.slice(0, -1) + clickedOperator;
            }
        } else if (clickedOperator === '-' && lastChar === '-') {
            // do nothing
        }
        else {
            expression += clickedOperator;
        }
        updateDisplay();
    });

    $('#clear').on('click', function() {
        expression = '0';
        resultDisplayed = false;
        updateDisplay();
    });

    $('#equals').on('click', function() {
        try {
            const result = eval(expression.replace(/--/g, '+'));
            expression = roundResult(result).toString();
            resultDisplayed = true;
            updateDisplay();
        } catch (e) {
            expression = 'Error';
            resultDisplayed = true;
            updateDisplay();
        }
    });
});
