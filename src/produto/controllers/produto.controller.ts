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
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from '../services/produto.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly service: ProdutoService) {}

  @Get()
  @HttpCode(200)
  findAll(): Promise<Produto[]> {
    return this.service.findAll();
  }

  @Get('/:id')
  @HttpCode(200)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.service.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(200)
  findByNome(@Param('nome') nome: string): Promise<Produto[]> {
    return this.service.findByName(nome);
  }

  @Post()
  @HttpCode(201)
  create(@Body() prod: Produto): Promise<Produto> {
    return this.service.create(prod);
  }

  @Put()
  @HttpCode(200)
  update(@Body() prod: Produto): Promise<Produto> {
    return this.service.update(prod);
  }

  @Delete()
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
