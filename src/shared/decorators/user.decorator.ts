import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const LoggedUser = createParamDecorator((data , ctx : ExecutionContext)=> ctx.switchToHttp().getRequest().user)

//data - I put just for the args order  
