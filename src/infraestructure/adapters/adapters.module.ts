import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from '../persistence/persistence.module';
import { MongoSolicitudRepository } from './solicitud-mongo.repository';

export const SOLICITUD_REPOSITORY = 'SOLICITUD_REPOSITORY';


const providers = [
    MongoSolicitudRepository,
    {
        provide: SOLICITUD_REPOSITORY,
        useExisting: MongoSolicitudRepository,
    }
]


@Module({
    imports:[
        ConfigModule,
        PersistenceModule,
        
    ],
    providers:[
        ...providers
    ],
    exports:[
        ...providers,
       
    ]
})
export class AdaptersModule {}
