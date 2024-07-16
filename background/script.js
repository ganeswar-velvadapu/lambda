let color1 = document.getElementById("color1");
let color2 = document.getElementById("color2");
let genBtn = document.querySelector(".gen-btn");
let shape = document.querySelector("#grad-select")
let gradientDiv = document.querySelector(".gradient");


genBtn.addEventListener("click", () => {
    let gradient = ''
    if(shape.value == "linear"){
        gradient = `linear-gradient(to right, ${color1.value}, ${color2.value})`
        gradientDiv.classList.remove('circle')
    }
    else if(shape.value == "radial"){
        gradient = `radial-gradient(circle, ${color1.value}, ${color2.value})`
        gradientDiv.classList.add('circle')
    }
    gradientDiv.style.background = gradient
});

