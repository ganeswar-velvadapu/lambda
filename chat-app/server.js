const express = require("express")
const { Socket } = require("socket.io")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http)

app.use(express.static(__dirname + '/public'))

http.listen(3000,()=>{
    console.log(`Server is listening on port 3000`)
})

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

io.on("connection",socket=>{
    console.log("connected")
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg)
    })
})