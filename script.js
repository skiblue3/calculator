// basic functions to perform arithmetic operations
function add(a,b) {
    return a + b;
}
function subtract(a,b) {
    return a - b;
}
function multiply(a,b) {
    return a * b;
}
function divide(a,b) {
    return a / b;
}

// function to perform operation based on given sign and two other values
function operate (sign, total, a) {
    switch(sign) {
        case '+':
            total = add(total, a);
            break;
        case '-':
            total = subtract(total, a);
            break;
        case '*':
            total = multiply(total, a);
            break;
        case '/':
            if (a == 0) {   // when you try to divide using zero
                error.textContent = 'oh oh are you trying to divide by zero?';
                return total;
            }
            total = divide(total, a);
            a = null;
            break;
    }

    return Math.round(total * 1000) / 1000; // rounds off the given value to 2 decimals
}

const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const keys = document.querySelectorAll('.keys');
const display = document.querySelector('#display-screen');
const error = document.querySelector('#error');

let a = null, total = null, sign = '', prevSign = '', flag = true;

// calls function when any of the number button is clicked
numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (flag == false) {        // asks user to clear the screen because they clicked "equal to"
            error.textContent = "Clear the screen!";
            return;
        }
        if (display.textContent.length > 15 && a != null) {     // limits the digits on screen below 15
            error.textContent = "Sorry! I can't display more than 15 digits on screen, clear the screen";
            return;
        }
        if (a == null)      // if a is empty, create empty display screen to start getting input for a, else just append to a
            display.textContent = '';
        display.textContent += number.getAttribute('id');
        a = (display.textContent.includes('.')) ? parseFloat(display.textContent) : parseInt(display.textContent);
    });
});


// calls function when any of the operator is clicked
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        sign = operator.getAttribute('id');     // gets the sign of operator
        if (flag == false && sign != '=') {    // checks whether equal to was pressed before
            flag = true;
        }
        if (sign == '=' && prevSign == '=') {   // when user clicks equal to more than once
            error.textContent = "It's better if you don't click on '=' more than once.";
            return;
        }
        if (sign == '=' && prevSign == '') {    // clicks equal to before entering arithmetic operator
            error.textContent = "Why don't you add some arithmetic operator before clicking '='?";
            return;
        }
        if (a == null && prevSign != '=') {     // clicks on operator more than once
            error.textContent = "Don't forget to add numbers before clicking on operators!";
            return;
        }    
        if (prevSign)       // removes the hold button effect
            document.getElementById(prevSign).classList.remove('activated');
        
        // does the calculation
        if (total == null) {
            total = a;
            a = null;
            display.textContent = total;
            error.textContent = '';
        } else {
            error.textContent = '';
            total = operate(prevSign, total, a);
            a = null;
            if(total.toString().length > 15) {
                flag = 0;
                error.textContent = "Sorry! I can't display more than 15 digits on screen, clear the screen";
                return;
            }
            display.textContent = total;
        }

        prevSign = sign;
        if (sign == '=')    // to avoid users entering number after entering equal to
            flag = 0;
        else                // adds hold effect on operators
            operator.classList.add('activated');    
    });
});


// calls function when special keys are clicked
keys.forEach(key => {
    key.addEventListener('click', () => {
        let value = key.getAttribute('id');
        if (value == 'sign') {              // if sign button is clicked, changes the sign of number and display
            a *= -1;
            display.textContent = a;
        } else if (value == 'clear') {      // clears everything as it mentions
            flag = true;
            a = null; total = null;
            prevSign = '';
            sign = '';
            display.textContent = '';
            error.textContent = '';
            buttons.forEach(button => button.classList.remove('activated'));
        } else if (value == 'delete') {     // works like backspace 
            display.textContent = display.textContent.slice(0, -1);
            a = (display.textContent.includes('.')) ? parseFloat(display.textContent) : parseInt(display.textContent);
        } else if (value == 'decimal') {    // for decimal value
            if (display.textContent.includes('.')) 
                error.textContent = "Do you think you can have two decimal points?!?!";
            else
                display.textContent = display.textContent + '.';
        }
    });
});
