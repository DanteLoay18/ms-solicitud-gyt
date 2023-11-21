import { Base } from "src/core/shared/domain/base";
import { CreateSolicitudDto } from "src/core/shared/dtos/create-solicitud.dto";
import { UpdateSolicitudDto } from "src/core/shared/dtos/update-solicitud.dto";

export class Solicitud extends Base{

    expediente:string;
    tipoSolicitud:number;
    escuela:string;
    facultad:string;
    comentario:string;
    esRevisado:boolean;
    esAceptado:boolean;
    documento:string;


    static CreateSolicitud( createSolicitudDto:CreateSolicitudDto, usuarioCreacion:string){
        const solicitud= new Solicitud();
        solicitud.expediente=createSolicitudDto.expediente;
        solicitud.tipoSolicitud=createSolicitudDto.tipoSolicitud;
        solicitud.escuela=createSolicitudDto.escuela;
        solicitud.facultad=createSolicitudDto.facultad;
        solicitud.comentario=createSolicitudDto.comentario;
        solicitud.documento=createSolicitudDto.documento;
        solicitud.esRevisado=false;
        solicitud.fechaCreacion=new Date();
        solicitud.usuarioCreacion=usuarioCreacion;
        solicitud.esBloqueado=false;
        solicitud.esEliminado=false;
        return solicitud;
    }

    static UpdateSolicitud( updateolicitudDto:UpdateSolicitudDto, usuarioModificacion:string){
        const solicitud= new Solicitud();
        solicitud.expediente=updateolicitudDto.expediente;
        solicitud.tipoSolicitud=updateolicitudDto.tipoSolicitud;
        solicitud.escuela=updateolicitudDto.escuela;
        solicitud.facultad=updateolicitudDto.facultad;
        solicitud.comentario=updateolicitudDto.comentario;
        solicitud.documento=updateolicitudDto.documento;
        solicitud.fechaModificacion=new Date();
        solicitud.usuarioModificacion=usuarioModificacion;
        return solicitud;
    }

    static EliminarSolicitud(usuarioModificacion:string){
        const solicitud= new Solicitud();
        solicitud.esEliminado=true;
        solicitud.fechaModificacion=new Date();
        solicitud.usuarioModificacion=usuarioModificacion;
        return solicitud;
    }
}