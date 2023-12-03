import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SolicitudUseCase } from "src/core/application/services/solicitud.use-case";
import { CambiarEstadoCommand } from "./cambiar-estado.command";

@CommandHandler(CambiarEstadoCommand)
export class CambiarEstadoHandler implements ICommandHandler<CambiarEstadoCommand>{

    constructor(private solicitudUseCases: SolicitudUseCase) { }

    execute(query: CambiarEstadoCommand) {
        
        return this.solicitudUseCases.cambiarEstadoSolicitud(query.cambiarEstadoSolicitudDto, query.usuarioCreacion);
    }

}
