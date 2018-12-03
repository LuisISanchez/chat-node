class Usuarios{

    constructor(){
        this.personas=[];
    }

    agregarPersona(id,nombre,sala){
        let persona = {id,nombre,sala};
        this.personas.push(persona);
        return this.getPersonasPorSala(sala);
    }

    getPersona(id){
       return this.personas.filter(it=>it.id===id)[0]
    }

    getPersonas(){
        return this.personas;
    }

    getPersonasPorSala(sala){
        return this.personas.filter(it=>it.sala===sala);
    }

    borrarPersona(id){
        let persona= this.getPersona(id);
        this.personas = this.personas.filter(it=>it.id!=id);

        return persona;
    }


}

module.exports={Usuarios};