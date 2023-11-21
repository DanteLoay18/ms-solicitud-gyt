import { Solicitud } from "../../entity/solicitud.entity";


export interface SolicitudRepository{
    createSolicitud(solicitud: Solicitud): Promise<Solicitud>;
    updateSolicitud(idSolicitud:string,Solicitud: Solicitud): Promise<Solicitud>;
    findAll():Promise<Solicitud[]>;
    findOneById(id:string):Promise<Solicitud>;
    actualizarBloqueo(id:string,esBloqueado:boolean):Promise<Solicitud>;
    findByTerm(termino:string, valor:string | number):Promise<Solicitud[]>;
}