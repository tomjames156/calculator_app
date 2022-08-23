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

function getGreaterlength(a, b){
    let greatest_length = 0;
    if(a.length >= b.length){
        greatest_length = a.length;
    }else if(b.length > a.length){
        greatest_length = b.length;
    }
    return greatest_length;
}

add = (a, b) => (parseFloat(a) + parseFloat(b)).toPrecision(getGreaterlength(a, b));
subtract = (a, b) => (parseFloat(a) - parseFloat(b)).toPrecision(getGreaterlength(a, b));
divide = (a, b) => (parseFloat(a) / parseFloat(b)).toPrecision(getGreaterlength(a, b));
multiply = (a, b) => (a * b).toPrecision(getGreaterlength(a, b));

deleteInput = () => input.value = input.value.substring(0, input.value.length - 1);

resetCalc = () => input.value = 0;

inputValue = (rcpnt) => input.value += rcpnt.innerHTML;

for(let i = 0; i < operators.length; i++){
    operators[i].addEventListener("click", () => {
        if(operatorsSet.has(input.value[input.value.length - 1])){
            input.value = input.value.substring(0, input.value.length - 1);
        }
        input.value += operators[i].innerHTML;
    })    
}


let test = '4+3';
let myArray = ["/", "&times", "+", "-"];

async function evaluate() {
    let solvePromise = new Promise(function(resolve){
        for(let val of operatorsSet){
            if(input.value.includes(val)){
                let operatorInUse = val;
                let input1 = input.value.split(operatorInUse)[0];
                let input2 = input.value.split(operatorInUse)[1];
                if(operatorInUse == "/"){
                    resolve(divide(input1, input2));
                }else if(operatorInUse == "&times" || operatorInUse == "×"){
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

equalsBtn.addEventListener("click", evaluate);
// if one operator has been inputed solve before allowing a second one to be added 
// for typed multiplication

console.log(4.5 * 2);