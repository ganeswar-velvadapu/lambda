const socket = io('http://localhost:3000/')

let username


let textarea = document.getElementById("textarea")
let messageArea = document.querySelector(".message-area")

do{
    username = prompt("Please enter your username : ")
}while(!username)

textarea.addEventListener("keyup",(e)=>{
    if(e.key == "Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user : username,
        mssg :message.trim()
    }
    
    appendMessage(msg,"outgoing")
    textarea.value = ''
    //Send information to server
    socket.emit("message",msg)
}
function appendMessage(msg, type){
    let mainDiv = document.createElement("div")
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup =
     `
    <h4>${msg.user}</h4>
    <p>${msg.mssg}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
    scrollBottom()
}

//Receive message
socket.on("message",(msg)=>{
    appendMessage(msg,"incoming")
    scrollBottom()
})

//ScrollBottom
function scrollBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}