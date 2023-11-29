import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SolicitudUseCase } from "src/core/application/services/solicitud.use-case";
import { DeleteSolicitudCommand } from "./delete-solicitud.command";

@CommandHandler(DeleteSolicitudCommand)
export class DeleteSolicitudHandler implements ICommandHandler<DeleteSolicitudCommand>{

    constructor(private solicitudUseCases: SolicitudUseCase) { }

    execute(query: DeleteSolicitudCommand) {
        
        return this.solicitudUseCases.eliminarSolicitud(query.idSolicitud, query.usuarioModificacion);
    }

}
