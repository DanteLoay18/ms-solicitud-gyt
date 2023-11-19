import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Solicitud, SolicitudSchema } from './db/entities/solicitud.entity';
@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      {name: Solicitud.name, schema: SolicitudSchema},
    ])
  ],
  exports:[
    DatabaseModule,
    MongooseModule
  ]
})
export class PersistenceModule {}
