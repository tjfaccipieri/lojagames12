import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { Produto } from '../entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private repository: Repository<Produto>,
    private catService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.repository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const prod = await this.repository.findOne({
      where: { id },
      relations: { categoria: true },
    });

    if (!prod) {
      throw new NotFoundException('Esse produto ai, não existe...');
    }

    return prod;
  }

  async findByName(nome: string): Promise<Produto[]> {
    return await this.repository.find({
      where: {
        nome: ILike(`%¨${nome}%`),
      },
      relations: { categoria: true },
    });
  }

  async create(prod: Produto): Promise<Produto> {
    await this.catService.findById(prod.categoria.id);
    return await this.repository.save(prod);
  }

  async update(prod: Produto): Promise<Produto> {
    await this.findById(prod.id);
    await this.catService.findById(prod.categoria.id);
    return await this.repository.save(prod);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.repository.delete(id);
  }
}
