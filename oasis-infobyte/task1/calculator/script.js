// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const equals = document.getElementById('equals');
    const clear = document.getElementById('clear');

    let currentInput = '';
    let operator = '';
    let firstValue = '';

    //button event listener
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.dataset.value;
            
            if (value) {
                if (value === '.') {
                    if (!currentInput.includes('.')) {
                        currentInput += value;
                    }
                } else if (['+', '-', '*', '/'].includes(value)) {
                    if (currentInput === '') return;
                    firstValue = currentInput;
                    operator = value;
                    currentInput = '';
                } else {
                    currentInput += value;
                }
                display.value = currentInput;
            }
        });
    });

    equals.addEventListener('click', () => {
        if (operator && firstValue !== '' && currentInput !== '') {
            display.value = eval(`${firstValue} ${operator} ${currentInput}`);
            currentInput = display.value;
            operator = '';
            firstValue = '';
        }
    });

    clear.addEventListener('click', () => {
        currentInput = '';
        operator = '';
        firstValue = '';
        display.value = '';
    });
});

//All of the code is done by - Vedansh Mishra