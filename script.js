const numPadButton =  document.querySelectorAll("button");
const output = document.querySelector(".answer-field");

let num1 = null;
let num2 = null;
let operation = null;
let display = "";

switch (numPadButton) {
    case id="#1":
        console.log("Pressed 1");
        break;
}

numPadButton.forEach((btn, index) => {
    btn.addEventListener("click", (event) => {
        console.log("You clicked button with ID: " + btn.id);
        handleInput(btn.id);
    });
});

function handleInput (input) {

    switch (input) {
        case "multiply":
            if(operation) operation = null;
            operation = "*";
            break;
        case "divide":
            if(operation) operation = null;
            operation = "/";
            break;
        case "add":
            if(operation) operation = null;
            operation = "+";
            break;
        case "minus":
            if(operation) operation = null;
            operation = "-";
            break;
        case "clear":
            clearText ();
            num1 = null;
            num2 = null;
            operation = null;
            break;
        case "equals":
            break;
        default:
            if(!num1) {
                num1 = input;
            } else if (num1 && !operation) {
                num1 += input;
            } else if (!num2) {
                num2 = input;
            } else {
                num2 += input;
            }
            break;
    }

    output.textContent = (num1 ? num1 : "")
                        +(operation ? operation : "")
                        +(num2 ? num2 : "");

    if(input === "equals") {
        output.textContent =total(operation);
    }           
        
}

function add (num1, num2) {
    return parseInt(num1) + parseInt(num2);
}

function subtract (num1, num2) {
    return parseInt(num1) - parseInt(num2);
}

function multiply (num1, num2) {
    return parseInt(num1) * parseInt(num2);
}

function divide (num1, num2) {
    return parseInt(num1) / parseInt(num2);
}

function total (operation){
    if(!num1 || !num2)
    {
        return;
    }

    switch (operation) {
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        default:
            break;
    }

    
}

function clearText () {
    display = "";
}

