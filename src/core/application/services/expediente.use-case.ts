import { BadRequestException, Injectable  } from "@nestjs/common";
import { Paginated } from "../utils/Paginated";
import { SolicitudService } from "src/core/domain/services/solicitud.service";
import { CreateSolicitudDto } from "src/core/shared/dtos/create-solicitud.dto";
import { Solicitud } from "src/core/domain/entity/solicitud.entity";
import { UpdateSolicitudDto } from "src/core/shared/dtos/update-solicitud.dto";

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

    async createSolicitud(createSolicitudDto:CreateSolicitudDto, usuarioCreacion:string){
        try {

            const tipoSolicitudEncontrada = await this.findOneByTerm("tipoSolicitud", createSolicitudDto.tipoSolicitud, "", createSolicitudDto.expediente);

            if(tipoSolicitudEncontrada)
                return {
                    success:false,
                    message:"Este tipo de solicitud ya se encuentra registrada y esta pendiente de revision"
                }

            const solicitud = Solicitud.CreateSolicitud(createSolicitudDto,usuarioCreacion);
           
            const solicitudCreado= await this.solicitudService.createSolcitiud(solicitud);

            if(!solicitudCreado)
                return {
                    success:false,
                    message:"El solicitud no se pudo registrar correctamente"
                }

            return {
                success:true,
                message:"El solicitud se creo correctamente"
            }
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    async updateSolicitud(updateSolicitudDto:UpdateSolicitudDto, usuarioCreacion:string){
        try {

            const solicitudEncontrada = await this.getSolicitudById(updateSolicitudDto.idSolicitud);

            if(!solicitudEncontrada.success)
            return {
                success:solicitudEncontrada.success,
                message: solicitudEncontrada.message
            }

            if(solicitudEncontrada.value?.['esRevisado'])
            return {
                success:false,
                message:"La solicitud ya fue revisada no se puede realizar ningun cambio."
            }     

            const solicitud = Solicitud.UpdateSolicitud(updateSolicitudDto,usuarioCreacion);
           
            const solicitudCreado= await this.solicitudService.updateSolcitiud(updateSolicitudDto.idSolicitud,solicitud);

            if(!solicitudCreado)
                return {
                    success:false,
                    message:"El solicitud no se pudo registrar correctamente"
                }

            return {
                success:true,
                message:"El solicitud se creo correctamente"
            }
        } catch (error) {
            this.handleExceptions(error)
        }
    }

    async eliminarSolicitud(idSolicitud:string, usuarioModificacion:string){
        const solicitudEncontrada = await this.getSolicitudById(idSolicitud);

        if(!solicitudEncontrada.success)
        return {
            success:solicitudEncontrada.success,
            message: solicitudEncontrada.message
        }

        if(solicitudEncontrada.value?.['esRevisado'])
        return {
            success:false,
            message:"La solicitud ya fue revisada no se puede eliminar."
        }    

        const solicitud = Solicitud.EliminarSolicitud(usuarioModificacion);
           
        const solicitudEliminada= await this.solicitudService.updateSolcitiud(idSolicitud,solicitud);

        if(!solicitudEliminada)
            return {
                success:false,
                message:"La solicitud no se pudo eliminar"
            }

        return {
            success:true,
            message:"La solicitud se elimino correctamente"
        }
    }
   
    async findOneByTerm(term:string, valor:string | number, idSolicitud:string, expediente:string){
        let solicitudes= await this.solicitudService.findByterm(term, valor);

        const solicitudEncontradoPorExpediente= solicitudes.filter((solicitud)=>solicitud.expediente===expediente && solicitud._id!==idSolicitud).find((solicitud)=>{

            if((solicitud.esAceptado && solicitud.esRevisado) || !solicitud.esRevisado){
                return solicitud;
            }

            return null;
        });
      
        return solicitudEncontradoPorExpediente;
       
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