import { Controller, Get } from '@nestjs/common';
import { ToolItemService } from './tool-item.service';

@Controller('tool-item')
export class ToolItemController {
  constructor(private readonly toolItemService: ToolItemService) {
  }

  @Get()
  getHello(): string {
    return this.toolItemService.getHello();
  }
}
