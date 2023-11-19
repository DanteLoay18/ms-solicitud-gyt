import { Solicitud } from "src/infraestructure/persistence/db/entities/solicitud.entity";
import { SolicitudRepository } from "../ports/outbound/solicitud.repository";

export class SolicitudService{
    constructor(private readonly solcitiudRepository:SolicitudRepository){}

    findAll(){
        return this.solcitiudRepository.findAll();
    }

    findByterm(termino:string, valor:string | number){
        return this.solcitiudRepository.findByTerm(termino, valor);
    }

    findOneById(id:string){
        return this.solcitiudRepository.findOneById(id);
    }
    
    createSolcitiud(solcitiud:Solicitud){
        return this.solcitiudRepository.createSolicitud(solcitiud);
    }

    updateSolcitiud(id:string,solcitiud:Solicitud){
        return this.solcitiudRepository.updateSolicitud(id,solcitiud);
    }

    bloquearsolcitiud(id:string, esBloqueado:boolean){
        return this.solcitiudRepository.actualizarBloqueo(id, esBloqueado);
    }

    

}