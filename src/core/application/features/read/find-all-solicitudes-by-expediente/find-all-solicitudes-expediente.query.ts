
export class FindAllSolicitudesByExpedienteQuery {
    
    constructor(
                public readonly page: number,
                public readonly pageSize: number,
                public readonly idExpediente: string,
                ) { }
    
}