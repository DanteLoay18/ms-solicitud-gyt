import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { MessagePattern } from '@nestjs/microservices';
import { FindAllSolicitudesByExpedienteRequest } from '../model/find-all-solicitudes.request';
import { FindAllSolicitudesByExpedienteQuery, FindByIdQuery } from 'src/core/application/features/read';
import { CreateSolicitudRequest } from '../model/create-solicitud.request';
import { CambiarEstadoCommand, CreateSolicitudCommand, DeleteSolicitudCommand, UpdateSolicitudCommand } from 'src/core/application/features/write';
import { UpdateSolicitudRequest } from '../model/update-solicitud.request';
import { DeleteSolicitudRequest } from '../model/delete-solicitud.request';
import { CambiarEstadoRequest } from '../model/cambiar-estado-solicitud.request';


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

    @MessagePattern({cmd: 'create_solicitud'})
    async createSolicitud({idUsuario,...createSolicitudRequest}:CreateSolicitudRequest) {

        return await this.command.execute(new CreateSolicitudCommand(createSolicitudRequest, idUsuario));
        
    }
   
    @MessagePattern({cmd: 'update_solicitud'})
    async updateSolicitud({idUsuario,...updateSolicitudRequest}:UpdateSolicitudRequest) {

        return await this.command.execute(new UpdateSolicitudCommand(updateSolicitudRequest, idUsuario));
        
    }

    @MessagePattern({cmd: 'cambiar_estado_solicitud'})
    async cambiarEstadoSolicitud({idUsuario,...cambiarEstadoRequest}:CambiarEstadoRequest) {

        return await this.command.execute(new CambiarEstadoCommand(cambiarEstadoRequest, idUsuario));
        
    }

    @MessagePattern({cmd: 'delete_solicitud'})
    async deleteSolicitud({idUsuario, idSolicitud}:DeleteSolicitudRequest) {

        return await this.command.execute(new DeleteSolicitudCommand(idSolicitud, idUsuario));
        
    }

    
}