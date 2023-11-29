import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AdaptersModule, SOLICITUD_REPOSITORY } from 'src/infraestructure/adapters/adapters.module';
import { PersistenceModule } from 'src/infraestructure/persistence/persistence.module';
import { FindAllSolicitudesByExpedienteHandler, FindAllSolicitudesByExpedienteQuery, FindByIdHandler, FindByIdQuery } from './application/features/read';
import { SolicitudService } from './domain/services/solicitud.service';
import { SolicitudRepository } from './domain/ports/outbound/solicitud.repository';
import { SolicitudUseCase } from './application/services/solicitud.use-case';
import { CreateSolicitudCommand, CreateSolicitudHandler, DeleteSolicitudCommand, DeleteSolicitudHandler, UpdateSolicitudCommand, UpdateSolicitudHandler } from './application/features/write';

const SOLICITUD_PROVIDERS=[
    FindAllSolicitudesByExpedienteQuery,
    FindAllSolicitudesByExpedienteHandler,
    FindByIdQuery,
    FindByIdHandler,
    CreateSolicitudCommand,
    CreateSolicitudHandler,
    UpdateSolicitudCommand,
    UpdateSolicitudHandler,
    DeleteSolicitudCommand,
    DeleteSolicitudHandler
]

const providers = [
    ...SOLICITUD_PROVIDERS,
]



@Module({
    imports:[
        PersistenceModule,
        AdaptersModule,
        CqrsModule
    ],
    providers:[
        ...providers,
        {
            provide:SolicitudService,
            useFactory:(
                solicitudRepository:SolicitudRepository
            )=> new SolicitudService(solicitudRepository),
            inject:[
                SOLICITUD_REPOSITORY
            ]
        },
        {
            provide: SolicitudUseCase,
            useFactory: (solicitudService: SolicitudService,) => new SolicitudUseCase(solicitudService),
            inject: [
                SolicitudService
            ] 
        },
        
    ],
    exports:[
        ...providers,
        CqrsModule,
        AdaptersModule
    ]
})
export class CoreModule {}
