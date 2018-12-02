var socket = io();

socket.on('connect',function(){
    console.log("Conectado al server");
});

socket.on('disconnect',function(){
    console.log("Se ha perdido la conexion al servidor");
});

socket.emit('enviarMensaje',{
    usuario:'Luis',
    mensaje:'Hola mundo'
},function(res){
    console.log(res);
});

socket.on('enviarMensaje',function(data){
    console.log(data);
});