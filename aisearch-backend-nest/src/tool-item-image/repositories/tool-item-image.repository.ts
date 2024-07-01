import { Repository } from 'typeorm';
import { ToolItemImage } from '../entities/tool-item-image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolItemImageRepository {
  constructor(
    @InjectRepository(ToolItemImage)
    private readonly rootRepository: Repository<ToolItemImage>
  ) {
  }

  async findById(id: ToolItemImage['id']){
    return this.rootRepository.findOne(
      {
        where: {
          id: id
        }
      })
  }
}