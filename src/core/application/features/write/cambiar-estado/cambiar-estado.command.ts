import { CambiarEstadoSolicitudDto } from "src/core/shared/dtos/cambiar-estado-solicitud.dto";

export class CambiarEstadoCommand {
    
    constructor(
                public readonly cambiarEstadoSolicitudDto:CambiarEstadoSolicitudDto,
                public readonly usuarioCreacion:string
                ) { }
    
}