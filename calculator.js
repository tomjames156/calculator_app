'use strict';
let themeBtns = document.getElementById("select-theme").children;
let body = document.querySelector("body.theme");
const evalOutput = document.getElementById("evaluation");
const operatorsSet = new Set(["/", "&times", "+", "-", "×","*", "."]);
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

deleteInput = () => input.value = input.value.substring(0, input.value.length - 1);

resetCalc = () => {
    input.value = "";
    evalOutput.innerHTML = "0+0=";
}

inputValue = (rcpnt) => {
    setFocus();
    removeEvaluationOutput();
    input.value += rcpnt.innerHTML;
};

for(let i = 0; i < operators.length; i++){
    operators[i].addEventListener("click", () => {
        removeEvaluationOutput();
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
        input.value = removeLetters(input.value);
        let result = eval(removeLetters(input.value));
        evalOutput.innerHTML = input.value + "=";
        if(result.toString().includes(".")){
            result = removeZeros(result.toFixed("7"));
        }
        resolve(result);
    });

    input.value = await solvePromise;
}

equalsBtn.addEventListener("click", evaluate);

function removeEvaluationOutput(){
    evalOutput.innerHTML = "";
}

input.addEventListener("keydown", removeEvaluationOutput);

function removeLetters(x){
    let input = [];
    for(let i = 0; i <= x.split("").length - 1; i++){
        if(!isNaN(x[i]) || operatorsSet.has(x[i])){
            input.push(x[i]);
        }
    }
    return input.join("");
}

// do not allow letters