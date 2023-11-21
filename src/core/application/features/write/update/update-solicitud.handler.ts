import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SolicitudUseCase } from "src/core/application/services/expediente.use-case";
import { UpdateSolicitudCommand } from "./update-solicitud.command";

@CommandHandler(UpdateSolicitudCommand)
export class UpdateSolicitudHandler implements ICommandHandler<UpdateSolicitudCommand>{

    constructor(private solicitudUseCases: SolicitudUseCase) { }

    execute(query: UpdateSolicitudCommand) {
        
        return this.solicitudUseCases.updateSolicitud(query.updateSolicitudDto, query.usuarioModificacion);
    }

}
