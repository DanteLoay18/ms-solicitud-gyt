import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindByIdQuery } from "./find-by-id.query";
import { SolicitudUseCase } from "src/core/application/services/expediente.use-case";

@QueryHandler(FindByIdQuery)
export class FindByIdHandler implements IQueryHandler<FindByIdQuery>{

    constructor(private solicitudUseCases: SolicitudUseCase) { }

    execute(query: FindByIdQuery) {
        
        return this.solicitudUseCases.getSolicitudById(query.idSolicitud);
    }

}
