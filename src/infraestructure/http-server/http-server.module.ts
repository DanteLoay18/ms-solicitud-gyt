import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { SolicitudController } from './controllers/solicitud.controller';

@Module({
    imports:[CoreModule],
    controllers:[
        SolicitudController
    ]
})
export class HttpServerModule {}
