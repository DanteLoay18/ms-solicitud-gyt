import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SolicitudUseCase } from "src/core/application/services/solicitud.use-case";
import { FindAllSolicitudesNoRevisadoQuery } from "./find-all-solicitudes-no-revisado.query";

@QueryHandler(FindAllSolicitudesNoRevisadoQuery)
export class FindAllSolicitudesNoRevisadoHandler implements IQueryHandler<FindAllSolicitudesNoRevisadoQuery>{

    constructor(private solicitudUseCases: SolicitudUseCase) { }

    execute(query: FindAllSolicitudesNoRevisadoQuery) {
        
        return this.solicitudUseCases.getAllSolicitudesNoRevisado(query.page, query.pageSize,query.idFacultad);
    }

}
