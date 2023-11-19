import { Base } from "src/core/shared/domain/base";

export class Expediente extends Base{

    expediente:string;
    tipoSolicitud:number;
    escuela:string;
    facultad:string;
    comentario:string;
    esAceptado:boolean;
    documento:string;

}