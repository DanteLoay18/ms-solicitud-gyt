
import { Prop,Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '../helpers/base';

@Schema()
export class Solicitud extends Base{
    @Prop({type: String})
    expediente:string;

    @Prop({type: Number})
    tipoSolicitud:number;

    @Prop({type: String})
    escuela:string;

    @Prop({type: String})
    facultad:string;

    @Prop({type: String})
    comentario:string;

    @Prop({type: Boolean})
    esAceptado:boolean;

    @Prop({type: String})
    documento:string;

}

export const SolicitudSchema= SchemaFactory.createForClass(Solicitud);


