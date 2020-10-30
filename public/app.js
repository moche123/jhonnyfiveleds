const socket = io();
const buttonOn = document.getElementById('buttonOn');
const buttonOff = document.getElementById('buttonOff');
const buttonBlink = document.getElementById('buttonBlink');

buttonOn.addEventListener('click',()=>{
   
    socket.emit('arduino:message',{
        message:'enciende'
    });
})
buttonOff.addEventListener('click',()=>{
   
    socket.emit('arduino:message',{
        message:'apaga'
    });
})
buttonBlink.addEventListener('click',()=>{
   
    socket.emit('arduino:message',{
        message:'parpadea'
    });
})
socket.on('arduino:message', (data)=>{
    console.log(data.message)
;})

