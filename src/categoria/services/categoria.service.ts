import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private repository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.repository.find({
      relations: {
        produto: true,
      },
    });
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.repository.findOne({
      where: { id },
      relations: {
        produto: true,
      },
    });

    if (!categoria) {
      throw new NotFoundException('A categoria ta aqui não...');
    }

    return categoria;
  }

  async findByNome(nome: string): Promise<Categoria[]> {
    return await this.repository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        produto: true,
      },
    });
  }

  async create(cat: Categoria): Promise<Categoria> {
    return await this.repository.save(cat);
  }

  async update(cat: Categoria): Promise<Categoria> {
    await this.findById(cat.id);
    return await this.repository.save(cat);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.repository.delete(id);
  }
}
