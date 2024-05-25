import {
    Body,
    Controller, Delete, Get,
    Inject, Param, Post
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import {UserUseCase} from "../../../usecases/user/user.usecase";
import {Public} from "../../../../shared/decorators/access.decorator";
import {CreateUserDto} from "./dto/create-user.dto";
import {User} from "../../../domain/models/user.model";
import {LoggedUser} from "../../../../shared/decorators/user.decorator";

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(
        @Inject(UserUseCase)
        private readonly userUseCase: UserUseCase,
    ) {}

    @Public()
    @Post('create')
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.userUseCase.create(createUserDto);
    }

    @ApiBearerAuth()
    @Get('info')
    async findOne(@LoggedUser() user: User): Promise<User>{
        return await this.userUseCase.findOne(user.id);
    }

    @ApiBearerAuth()
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void>{
        return await this.userUseCase.remove(id);
    }

}
