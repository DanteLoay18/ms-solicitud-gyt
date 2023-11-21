
import { UpdateSolicitudDto } from "src/core/shared/dtos/update-solicitud.dto";

export class UpdateSolicitudCommand {
    
    constructor(
                public readonly updateSolicitudDto:UpdateSolicitudDto,
                public readonly usuarioModificacion:string
                ) { }
    
}