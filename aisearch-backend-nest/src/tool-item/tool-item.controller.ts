import { Controller, Get } from '@nestjs/common';
import { ToolItemService } from './tool-item.service';

@Controller('tool-item')
export class ToolItemController {
  constructor(private readonly toolItemService: ToolItemService) {
  }

  @Get()
  async getHello(): Promise<string> {
    console.log("tool-item")
    await this.toolItemService.getHello();
    return "OK";
  }
}
