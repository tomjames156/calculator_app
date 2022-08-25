'use strict';
let themeBtns = document.getElementById("select-theme").children;
let body = document.querySelector("body.theme");
const operatorsSet = new Set(["/", "&times", "+", "-", "×", "*"]);
const operators = document.querySelectorAll("p.operator");
const numbers = document.querySelectorAll("p.number");
const input = document.getElementById("input");
const deleteBtn = document.getElementById("delete");
const plusBtn = document.getElementById("plus");
const resetBtn = document.getElementById("reset");
const equalsBtn = document.getElementById("equals");

themeBtns = [...themeBtns];
let add, subtract, divide, multiply, deleteInput, resetCalc, inputValue;

for(let i = 0; i < themeBtns.length; i++){
    themeBtns[i].addEventListener("click", function(){
        if(i == 0){
            body.classList = "theme blue-theme";
        }else if(i == 1){
            body.classList = "theme beige-theme";
        }else if(i == 2){
            body.classList = "theme purple-theme";
        }
    })
}

themeBtns[0].click();

function removeZeros(value){
    value = value.split("");
    if(value.includes(".")){
        for(let i = value.length; i >= 0; i--){
            if(value[i] == "."){
                break;
            }else if(value[i] != "." && value[i] == 0){
                value.pop();
            }
        }
    }

    if(value[value.length -1] == "."){
        value.pop();
    }
    
    return value.join("");
}

add = (a, b) => {
    if(a.includes(".") || (b.includes("."))){
        return (parseFloat(a) + parseFloat(b));
    }else{
        return parseInt(a) + parseInt(b);
    }
}

subtract = (a, b) => {
    if(a.includes(".") || (b.includes("."))){
        return (parseFloat(a) - parseFloat(b));
    }else{
        return parseInt(a) - parseInt(b);
    }
}

divide = (a, b) => {
    if(a.includes(".") || (b.includes("."))){
        return removeZeros((parseFloat(a) / parseFloat(b)).toFixed(7));
    }else{
        return removeZeros((parseInt(a) / parseInt(b)).toFixed(7));
    }
}

multiply = (a, b) => {
    if(a.includes(".") || (b.includes("."))){
        return removeZeros((parseFloat(a) * parseFloat(b)).toFixed(7));
    }else{
        return parseInt(a) * parseInt(b);
    }
};

deleteInput = () => input.value = input.value.substring(0, input.value.length - 1);

resetCalc = () => input.value = "";

inputValue = (rcpnt) => {
    setFocus();
    input.value += rcpnt.innerHTML;
};

for(let i = 0; i < operators.length; i++){
    operators[i].addEventListener("click", () => {
        if(operatorsSet.has(input.value[input.value.length - 1])){
            input.value = input.value.substring(0, input.value.length - 1);
        }
        input.value += operators[i].innerHTML;
    })    
}

function setFocus(){
    input.focus();
}

function hasOperator(string){
    let current_status = false;
    for(let operator of operatorsSet){
        if(string.includes(operator)){
            current_status = true;
        }
    }

    return current_status;
}


async function evaluate() {
    let solvePromise = new Promise(function(resolve){
        for(let val of operatorsSet){
            if(input.value.includes(val)){
                let operatorInUse = val;
                let input1 = input.value.split(operatorInUse)[0];
                let input2 = input.value.split(operatorInUse)[1];
                if(operatorInUse == "/"){
                    resolve(divide(input1, input2));
                }else if(operatorInUse == "&times" || operatorInUse == "×" || operatorInUse == "*"){
                    resolve(multiply(input1, input2));
                }else if(operatorInUse == "-"){
                    resolve(subtract(input1, input2));
                }else if(operatorInUse == "+"){
                    resolve(add(input1, input2));
                }
            }
        }
    });

    input.value = await solvePromise;
}

async function checkOperators(){
    let moreThanOne = new Promise(function(resolve){        
    let myTester = input.value;
    let lastOperatorRemoved = myTester.substring(0, myTester.length - 1);
        if(hasOperator(myTester[myTester.length - 1]) && hasOperator(lastOperatorRemoved)){          
            input.value = lastOperatorRemoved;
            evaluate();
        }
    })
    input.value += await moreThanOne;
}

equalsBtn.addEventListener("click", evaluate);