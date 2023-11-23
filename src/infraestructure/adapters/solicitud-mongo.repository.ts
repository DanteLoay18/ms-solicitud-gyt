import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SolicitudRepository } from "src/core/domain/ports/outbound/solicitud.repository";
import { Solicitud } from "../persistence/db/entities/solicitud.entity";


@Injectable()
export class MongoSolicitudRepository implements SolicitudRepository {
    
    constructor(@InjectModel(Solicitud.name) private solicitudRepository: Model<Solicitud>) { }
    
    findAll(): Promise<Solicitud[]> {
        return this.solicitudRepository.find({esEliminado:false});
    }

    findByTerm(termino:string, valor:string | number):Promise<Solicitud[]>{
        return this.solicitudRepository.find({[termino]:valor, esEliminado:false})
    }

    createSolicitud(Solicitud: Solicitud){
        return this.solicitudRepository.create(Solicitud);
    }

    updateSolicitud(idSolicitud:string,solicitud: Solicitud){
        return this.solicitudRepository.findByIdAndUpdate(idSolicitud,solicitud, {new:true})
    }
    
    findOneById(id:string){
        return this.solicitudRepository.findById(id);
    }
   
    
    actualizarBloqueo(id:string,esBloqueado:boolean){
        return this.solicitudRepository.findByIdAndUpdate(id, {
            esBloqueado  
            }, {new:true})
    }

    
   
    
   
}