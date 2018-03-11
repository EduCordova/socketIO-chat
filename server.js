var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

var port = process.env.PORT || 3001

app.use(express.static('client'));

app.get('/',(req,res)=>{
    res.status(200).send("hola mundo desde una ruta")
})


var messages =[
    {
        id:1,
        text:"Bienvenido a este chat privado",
        nickname:'bot-Educordova.es'
    }
]

io.on('connection',function(socket){
    console.log(`El nodo con ip: ${socket.handshake.address} se a conectado`)
    socket.emit('messages',messages)

    socket.on('add-message',function(data){
        messages.push(data)
        io.sockets.emit('messages',messages)
    })
})

server.listen(port,()=>{
    console.log('El servidor esta corriendo... en ' + port)
})
