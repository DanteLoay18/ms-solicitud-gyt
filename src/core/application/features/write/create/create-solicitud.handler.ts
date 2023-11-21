import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { SolicitudUseCase } from "src/core/application/services/expediente.use-case";
import { CreateSolicitudCommand } from "./create-solicitud.command";

@CommandHandler(CreateSolicitudCommand)
export class CreateSolicitudHandler implements ICommandHandler<CreateSolicitudCommand>{

    constructor(private solicitudUseCases: SolicitudUseCase) { }

    execute(query: CreateSolicitudCommand) {
        
        return this.solicitudUseCases.createSolicitud(query.createSolicitudDto, query.usuarioCreacion);
    }

}
