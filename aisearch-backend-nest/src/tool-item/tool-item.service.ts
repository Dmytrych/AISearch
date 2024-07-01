import { Injectable } from '@nestjs/common';
import { ToolItemImageRepository } from '../tool-item-image/repositories/tool-item-image.repository';

@Injectable()
export class ToolItemService {

  constructor(
    private readonly toolItemRepository: ToolItemImageRepository) {
  }

  async getHello(): Promise<void> {
    const a = await this.toolItemRepository.findById(12);
    console.log(JSON.stringify(a));
  }
}
