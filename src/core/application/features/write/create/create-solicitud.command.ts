import { CreateSolicitudDto } from "src/core/shared/dtos/create-solicitud.dto";

export class CreateSolicitudCommand {
    
    constructor(
                public readonly createSolicitudDto:CreateSolicitudDto,
                public readonly usuarioCreacion:string
                ) { }
    
}