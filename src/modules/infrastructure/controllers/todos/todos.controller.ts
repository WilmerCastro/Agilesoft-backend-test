import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
  Delete, Inject,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {TodoUseCase} from "../../../usecases/todos/todo.usecase";
import {LoggedUser} from "../../../../shared/decorators/user.decorator";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiTags('Todo')
@Controller('todos')
export class TodosController {
  constructor(
      @Inject(TodoUseCase)
        private readonly todoUseCase: TodoUseCase,
  ) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() CreateTodoDto: CreateTodoDto,  @LoggedUser() user ) {
    return this.todoUseCase.create(user.id, CreateTodoDto);
  }

  @ApiBearerAuth()
  @Get()
  findByUserId(@LoggedUser() user) {
      return this.todoUseCase.findByUserId(user.id);
  }

  @ApiBearerAuth()
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @LoggedUser() user
  ) {
    return this.todoUseCase.updateStatus(id, updateTodoDto.status, user);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(
      @Param('id') id: string,
      @LoggedUser() user
  ): Promise<void> {
    return this.todoUseCase.delete(id, user);
  }
}
