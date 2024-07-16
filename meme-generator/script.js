const templates = {
    'drake-hotline-bling': './templates/30b1gx.jpg', 
    'Left Exit 12 Off Ramp': './templates/image.png', 
    'Buff Doge vs Cheems': './templates/image1.png' 
  };
  

let option = document.querySelector("#template")
let topText = document.querySelector("#topText")
let botText = document.querySelector("#botText")
let btn = document.querySelector("#gen")
let canvas = document.querySelector("#memeCanvas")


  
btn.addEventListener("click",()=>{
  if(option.value == "drake-hotline-bling"){
  let templateSelected = option.value
    const img = new Image()
    img.src = templates[templateSelected]
    img.onload = () => {
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.font = '30px Impact';
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.fillText(topText.value, 170, 50);
      ctx.strokeText(topText.value, 170, 50);
      ctx.fillText(botText.value, 170, canvas.height - 50);
      ctx.strokeText(botText.value, 170, canvas.height - 50);
    };
  }
  else if(option.value == "Left Exit 12 Off Ramp"){
      let templateSelected = option.value
        const img = new Image()
        img.src = templates[templateSelected]
        img.onload = () => {
          let ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          ctx.font = '30px Impact';
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'black';
          ctx.fillText(topText.value, 90, 80);
          ctx.strokeText(topText.value, 90, 80);
          ctx.fillText(botText.value, 150, 80);
          ctx.strokeText(botText.value, 150, 80);
        };
  }
  else if(option.value == "Buff Doge vs Cheems"){
    let templateSelected = option.value
        const img = new Image()
        img.src = templates[templateSelected]
        img.onload = () => {
          let ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          ctx.font = '30px Impact';
          ctx.fillStyle = 'white';
          ctx.strokeStyle = 'black';
          ctx.fillText(topText.value, 90, 80);
          ctx.strokeText(topText.value, 90, 80);
          ctx.fillText(botText.value, 150, 80);
          ctx.strokeText(botText.value, 150, 80);
        };
}
})

