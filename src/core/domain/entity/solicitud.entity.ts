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
    nombreArchivo: string;

    static CreateSolicitud( createSolicitudDto:CreateSolicitudDto, usuarioCreacion:string){
        const solicitud= new Solicitud();
        solicitud.expediente=createSolicitudDto.expediente;
        solicitud.tipoSolicitud=createSolicitudDto.tipoSolicitud;
        solicitud.escuela=createSolicitudDto.escuela;
        solicitud.facultad=createSolicitudDto.facultad;
        solicitud.comentario=createSolicitudDto.comentario;
        solicitud.documento=createSolicitudDto.documento;
        solicitud.nombreArchivo=createSolicitudDto.nombreArchivo;
        solicitud.esRevisado=false;
        solicitud.fechaCreacion=new Date();
        solicitud.usuarioCreacion=usuarioCreacion;
        solicitud.esBloqueado=false;
        solicitud.esEliminado=false;
        return solicitud;
    }

    static UpdateSolicitud( updateSolicitudDto:UpdateSolicitudDto, usuarioModificacion:string){
        const solicitud= new Solicitud();
        solicitud.expediente=updateSolicitudDto.expediente;
        solicitud.tipoSolicitud=updateSolicitudDto.tipoSolicitud;
        solicitud.escuela=updateSolicitudDto.escuela;
        solicitud.facultad=updateSolicitudDto.facultad;
        solicitud.comentario=updateSolicitudDto.comentario;
        solicitud.documento=updateSolicitudDto.documento;
        solicitud.nombreArchivo=updateSolicitudDto.nombreArchivo;
        solicitud.fechaModificacion=new Date();
        solicitud.usuarioModificacion=usuarioModificacion;
        return solicitud;
    }

    static CambiarEstadoSolicitud( esAceptado:boolean, comentario:string, usuarioModificacion:string){
        const solicitud= new Solicitud();
        solicitud.esRevisado=true;
        solicitud.esAceptado=esAceptado;
        solicitud.comentario=comentario;
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