import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAllSolicitudesByExpedienteQuery } from "./find-all-solicitudes-expediente.query";
import { SolicitudUseCase } from "src/core/application/services/expediente.use-case";

@QueryHandler(FindAllSolicitudesByExpedienteQuery)
export class FindAllSolicitudesByExpedienteHandler implements IQueryHandler<FindAllSolicitudesByExpedienteQuery>{

    constructor(private solicitudUseCases: SolicitudUseCase) { }

    execute(query: FindAllSolicitudesByExpedienteQuery) {
        
        return this.solicitudUseCases.getAllSolicitudesByExpediente(query.page, query.pageSize,query.idExpediente);
    }

}
