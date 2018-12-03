const crearMensaje = (nombre,msg)=>{
    return {usuario:nombre,msg,fecha:new Date().getTime()}
}

module.exports={crearMensaje}