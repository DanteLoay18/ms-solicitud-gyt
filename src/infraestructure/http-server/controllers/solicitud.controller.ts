import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MessagePattern } from '@nestjs/microservices';
import { FindAllSolicitudesByExpedienteRequest } from '../model/find-all-solicitudes.request';
import { FindAllSolicitudesByExpedienteQuery, FindByIdQuery } from 'src/core/application/features/read';


@Controller()
export class SolicitudController{

    constructor(
        private command: CommandBus,
        private query: QueryBus
    ) {}
    
    @MessagePattern({cmd: 'findAll_solicitudes'})
    async findAllDocentes({page, pageSize, idExpediente}:FindAllSolicitudesByExpedienteRequest) {

        return await this.query.execute(new FindAllSolicitudesByExpedienteQuery(page,pageSize,idExpediente));
        
    }

    @MessagePattern({cmd: 'findOne_solicitud'})
    async findById(idSolicitud:string) {

        return await this.query.execute(new FindByIdQuery(idSolicitud));
        
    }
   

    
}