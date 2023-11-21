
export class DeleteSolicitudCommand {
    
    constructor(
                public readonly idSolicitud:string,
                public readonly usuarioModificacion:string
                ) { }
    
}