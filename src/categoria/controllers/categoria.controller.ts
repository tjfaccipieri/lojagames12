import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Categoria } from '../entities/categoria.entity';
import { CategoriaService } from '../services/categoria.service';

@Controller('/categorias')
export class CategoriaController {
  constructor(private readonly service: CategoriaService) {}

  @Get()
  @HttpCode(200)
  findAll(): Promise<Categoria[]> {
    return this.service.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return this.service.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(200)
  findByNome(@Param('nome') nome: string): Promise<Categoria[]> {
    return this.service.findByNome(nome);
  }

  @Post()
  @HttpCode(201)
  create(@Body() cat: Categoria): Promise<Categoria> {
    return this.service.create(cat);
  }

  @Put()
  @HttpCode(200)
  update(@Body() cat: Categoria): Promise<Categoria> {
    return this.service.update(cat);
  }

  @Delete()
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
