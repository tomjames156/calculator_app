let themeBtns = document.getElementById("select-theme").children;
let body = document.querySelector("body.theme");
themeBtns = [...themeBtns];

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