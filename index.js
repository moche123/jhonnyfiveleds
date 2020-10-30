const express = require('express');
const path = require('path');
const app = express();

var five = require("johnny-five");
var board = new five.Board();




//Settings
app.set('port',process.env.PORT||3000);

//Static files
app.use(express.static(path.join(__dirname,'public')));

const server = app.listen(app.get('port'),()=>{
    console.log('Server on port ',app.get('port'));
});


const SocketIO = require('socket.io');
const io = SocketIO(server);
//Web Sockets

io.on('connection',(socket)=>{
    console.log('New connection ',socket.id);
    board.on("ready", function() {
        var led1 = new five.Led(8);
        var led2 = new five.Led(2);
        socket.on('arduino:message',(data)=>{
            switch(data.message){
                case 'enciende':led1.on();break;
                case 'apaga':led1.off();break;
                case 'parpadea':led2.blink();
                break;

            }
            io.sockets.emit('arduino:message',data);
        })
       
      });
    
    
});