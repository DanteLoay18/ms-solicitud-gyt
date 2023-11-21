import { PartialType } from '@nestjs/swagger';
import { CreateSolicitudRequest } from './create-solicitud.request';
export class UpdateSolicitudRequest extends PartialType(CreateSolicitudRequest){
    idSolicitud:string;
}