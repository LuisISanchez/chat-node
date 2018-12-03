let {io} = require('../server');
let {Usuarios} = require('../classes/usuarios')
const {crearMensaje} = require('../utils/util')
let usuarios = new Usuarios();
io.on('connection', (client) => {
   
    client.on('entrarChat',(usuario,callback)=>{
        if(!usuario.nombre||!usuario.sala){
            return callback({err:true,msg:'Nombre y sala necesario'})
        }
        client.join(usuario.sala);
        console.log(usuario);
        let personas = usuarios.agregarPersona(client.id,usuario.nombre,usuario.sala);
        console.log(personas);
        callback(personas);
        client.broadcast.in(usuario.sala).emit('crearMensaje',crearMensaje('Admin',`${usuario.nombre} se ha unido a el chat`));
        client.broadcast.in(usuario.sala).emit('listaPersonas',usuarios.getPersonasPorSala(usuario.sala));
    })

    client.on('crearMensaje',(data)=>{
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre,data.msg);
        client.broadcast.in(persona.sala).emit('crearMensaje',mensaje);
    })

    client.on('disconnect',()=>{
        let persona = usuarios.borrarPersona(client.id);
        if(!persona){
            return;
        }
        client.broadcast.in(persona.sala).emit('crearMensaje',crearMensaje('Admin',`${persona.nombre} abandono el chat`));
        client.broadcast.in(persona.sala).emit('listaPersonas',usuarios.getPersonasPorSala(persona.sala));
    });

    client.on('mensajePrivado',(data)=>{
        if(!data.para){
            return callback({err:true,msg:'Para necesario'})
        }

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre,data.mensaje))
    })
});
