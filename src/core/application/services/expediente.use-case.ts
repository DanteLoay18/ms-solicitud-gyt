import { BadRequestException, Injectable  } from "@nestjs/common";
import { Paginated } from "../utils/Paginated";
import { SolicitudService } from "src/core/domain/services/solicitud.service";

@Injectable()
export class SolicitudUseCase{
    constructor(private readonly solicitudService:SolicitudService){}

    async getSolicitudById(id:string){
        try{
            const solicitud= await this.solicitudService.findOneById(id);
     
            if(!solicitud || solicitud.esEliminado)
                return {
                    success:false,
                    message:"El id del solicitud no existe",
                    value:{}
                }
            

            return {
                success: true,
                message: "",
                value:solicitud
            };
        }catch(error){
            this.handleExceptions(error)
        }
        
    }

   
    async getAllSolicitudesByExpediente(page:number, pageSize:number, idExpediente:string){
        try{
            let solicitud= await this.solicitudService.findAll();

            solicitud= solicitud.filter(({expediente})=>expediente===idExpediente)
            const startIndex = (page - 1 )*pageSize;
            const endIndex = startIndex + pageSize;

            if(solicitud.length === 0 && page !==1){
                const startIndex = (page - 2 )*pageSize;
                const endIndex = startIndex + pageSize;
                return {
                    page:page-1,
                    pageSize:pageSize,
                    items: solicitud.slice(startIndex,endIndex),
                    total: solicitud.length
                }
            }
            return Paginated.create({
                page,
                pageSize,
                items: solicitud.slice(startIndex,endIndex),
                total: solicitud.length
            });       

        }catch(error){
            this.handleExceptions(error)
        }
    }

    

   


   
    async bloquearDocente(id:string, esBloqueado:boolean){
        try {

            return await this.solicitudService.bloquearsolcitiud(id, esBloqueado);
        } catch (error) {
            this.handleExceptions(error)
        }
    }
    
    

    private handleExceptions(error:any){
        
        if(error.code==="23505")
        throw new BadRequestException(error.detail)
        
        

        throw new BadRequestException(error.message)
      }

      
}