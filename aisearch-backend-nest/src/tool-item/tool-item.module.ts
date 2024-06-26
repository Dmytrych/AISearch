import { Module } from '@nestjs/common';
import { ToolItemController } from './tool-item.controller';
import { ToolItemService } from './tool-item.service';

@Module({
  controllers: [ToolItemController],
  providers: [ToolItemService]
})
export class ToolItemModule {}
