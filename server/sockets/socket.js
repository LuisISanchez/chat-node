let {io} = require('../server');
io.on('connection', (client) => {
    client.emit('enviarMensaje',{
        usuario:'admin',
        mensaje:'Bienvenido a esta app'
    });
    console.log("Usuario conectado");
    client.on('disconnect', () => {
        console.log("Usuario desconectado");
    });

    client.on('enviarMensaje',(data,callback)=>{
        console.log(data);
        client.broadcast.emit('enviarMensaje',data);
        /* if(data.usuario){
            callback({resp:'Success'});
        }else{
            callback({resp:'Error'})
        } */
    })

});
