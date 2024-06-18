const numPadButton =  document.querySelectorAll("button");
const output = document.querySelector(".answer-field");


let num1 = null;
let num2 = null;
let runningTotal = null;
let operation = null;
const operators = ["add","divide","multiply","subtract"];
const utility = ["percent","neg","clear","decimal"];

numPadButton.forEach((btn) => {
    btn.addEventListener("click", () => {
        handleInput(btn.id);
    });
});

document.addEventListener('keyup', function(event) {
    if(event.key === "+"){
        handleInput("add");
    } else if(event.key === "-"){
        handleInput("subtract");
    } else if(event.key === "*"){
        handleInput("multiply");
    } else if(event.key === "/"){
        handleInput("divide");
    } else if(event.key === "=" || event.key === "Enter"){
        handleInput("equals");
    } else if(event.key === "."){
        handleInput("decimal");
    } else if(event.key === "%"){
        handleInput("percent");
    } else if(event.key === "Delete" || event.key === "Backspace"){
        handleInput("delete");
    } else {
        handleInput(event.key);
    }
});


function handleInput (input) {

    //Check if number clicked
    if(/\d/.test(input)) {
        handleNumberInput(input);
    }

    if(input === "clear") clearAll();

    if(!num1) return;

    //Check if operator clicked
    if(operators.includes(input)) {
        if(num2){   
            switch(operation) {
                case "multiply":
                    num1 = multiply(num1, num2);
                    num2 = null;
                    break;
                case "divide":
                    num1 = divide(num1, num2);
                    num2 = null;
                    break;
                case "add":
                    num1 = add(num1, num2);
                    num2 = null;
                    break;
                case "subtract":
                    num1 = subtract(num1, num2);
                    num2 = null;
                    break;
                default:
                    break;
            }

            operation = input;
        }

        operation = input;
    }

    if(input === "equals") {
        if(operation) operate(operation);
        
    }

    if(input === "decimal") {
        if(num2) {
            if(num2.includes(".")) return;
            else num2 += ".";
        } else {
            if(num1.includes(".")) return;
            else num1 += ".";
        }
    }

    if(input === "neg") {
        if(num2) {
            num2 = Math.abs(num2) * -1;
        } else {
            num1 = Math.abs(num1) * -1;
        }
    }

    if(input === "percent") {
        if(!operation) {
            num1 = divide(num1, 100);
        }
    }

    if(input === "delete") {
        
        if(num2) {
            let num2arr = num2.toString().split('');
            num2arr.pop();
            num2 = parseFloat(num2arr.join(''));
        } else if (num1) {
            let num1arr = num1.toString().split('');
            num1arr.pop();
            num1 = parseFloat(num1arr.join(''));
        }
    }

    updateDisplay();
}

function handleNumberInput(input) {
        
    input = input.replace(/\D/g, '');
    !num1 ? num1 = input : 
        !operation ? num1 += input : 
            !num2 ? num2 = input : num2 += input;
    
    updateDisplay();
}

function add(a,b){
    Math.round(a * 10000) / 10000;
    Math.round(b * 10000) / 10000;
    let c;
    c = Math.round((parseFloat(a) + parseFloat(b)) * 100000) / 100000;
    return c.toPrecision(7);
}

function subtract(a,b){
    Math.round(a * 10000) / 10000;
    Math.round(b * 10000) / 10000;
    let c;
    c = Math.round((parseFloat(a) - parseFloat(b)) * 100000) / 100000;
    return c.toPrecision(7);
}

function multiply(a,b){
    Math.round(a * 10000) / 10000;
    Math.round(b * 10000) / 10000;
    let c;
    c = Math.round((parseFloat(a) * parseFloat(b)) * 100000) / 100000;
    return c.toPrecision(7);
}

function divide(a,b){
    Math.round(a * 10000) / 10000;
    Math.round(b * 10000) / 10000;
    let c;
    
    if(parseFloat(b) != 0) {
        c =  Math.round((parseFloat(a) / parseFloat(b)) * 100000) / 100000;
        return c.toPrecision(7);
    } else
        return 0;
}

function operate (operation){
    if(!num1 || !num2)
    {
        return;
    }

    switch (operation) {
        case "multiply":
            num1 = multiply(num1, num2);
            num2 = null;
            break;
        case "divide":
            num1 = num1 == 0 || num2 == 0 ? window.alert("No, bad! No dividing by 0!") : divide(num1, num2);
            num2 = null;
            break;
        case "add":
            num1 = add(num1, num2);
            num2 = null;
            break;
        case "subtract":
            num1 = subtract(num1, num2);
            num2 = null;
            break;
        default:
            break;
    }  

    updateDisplay();
}

function updateDisplay () {
    if(!runningTotal) { 
        if(!num2) {
            if (!num1) {
                output.textContent = "0";
            } else {
                output.textContent = num1;
            }
        } else {
            output.textContent = num2;
        }
    } else {
        output.textContent = runningTotal;
    }
    
}

function clearAll () {
    num1 = null;
    num2 = null;
    operation = null;
    runningTotal = null;
    updateDisplay();
}