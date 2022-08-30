'use strict';
let themeBtns = document.getElementById("select-theme").children;
let body = document.querySelector("body.theme");
const evalOutput = document.getElementById("evaluation");
const operatorsSet = new Set(["/", "&times", "+", "-", "*", ".", "(", ")", "[", "]"]);
const operators = document.querySelectorAll("p.operator");
const numbers = document.querySelectorAll("p.number");
const input = document.getElementById("input");
const deleteBtn = document.getElementById("delete");
const plusBtn = document.getElementById("plus");
const resetBtn = document.getElementById("reset");
const equalsBtn = document.getElementById("equals");

themeBtns = [...themeBtns];
let add, subtract, divide, multiply, deleteInput, resetCalc, inputValue;

// Change themes when theme button is clicked
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

themeBtns[0].click(); // select blue theme by default

// Remove unnecessary zeros for floating point numbers
function removeZeros(value){
    value = value.split("");
    if(value.includes(".")){
        for(let i = value.length; i >= 0; i--){
            if(value[i] == "." || value[value.length - 1] !== "0"){
                break;
            }else if(value[i] == "0"){
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

// Add number input when clicked
inputValue = (rcpnt) => {
    setFocus();
    removeEvaluationOutput();
    input.value += rcpnt.innerHTML;
};

// Add operators when clicked 
for(let i = 0; i < operators.length; i++){
    operators[i].addEventListener("click", () => {
        removeEvaluationOutput();
        if(operatorsSet.has(input.value[input.value.length - 1])){
            input.value = input.value.substring(0, input.value.length - 1);
        }
        if(operators[i].innerHTML != "×"){
            input.value += operators[i].innerHTML;
        }else if(operators[i].innerHTML == "&times;" || operators[i].innerHTML == "×"){
            input.value += "*";
        }
    })    
}

// Focus on the input field
function setFocus(){
    input.focus();
}

// Compute the calculation
async function evaluate() {
    let solvePromise = new Promise(function(resolve){
    try{
        let result = eval(input.value);
        evalOutput.innerHTML = input.value + "=";
        if(result.toString().includes(".")){
            result = removeZeros(result.toFixed("7"));
        }
        resolve(result);
    }
    catch(error){
        evalOutput.innerHTML = "Invalid Input";
        resolve("Syntax Error");
    }
        
    });

    input.value = await solvePromise;
}

equalsBtn.addEventListener("click", evaluate);

// Remove evaluation displayer
function removeEvaluationOutput(){
    evalOutput.innerHTML = "";
}

input.addEventListener("keydown", removeEvaluationOutput);