var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('nombre')||!searchParams.has('sala')) {
    window.location = 'index.html';
    throw new Error('Nombre y sala es necesario')
}

var usuario = {
    nombre: searchParams.get('nombre'),
    sala: searchParams.get('sala')
};

socket.on('connect', function () {
    console.log("Conectado al server");
    socket.emit('entrarChat', usuario, function (res) {
        console.log(res);
    })
});


socket.on('disconnect', function () {
    console.log("Se ha perdido la conexion al servidor");
});

socket.emit('enviarMensaje', {
    usuario: 'Luis',
    mensaje: 'Hola mundo'
}, function (res) {
    console.log(res);
});

socket.on('crearMensaje', function (data) {
    console.log(data);
});


socket.on('listaPersonas', function (personas) {
    console.log(personas);
})

socket.on('mensajePrivado',function(msg){
    console.log('Mensaje privado: '+msg);
})