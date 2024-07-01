import { Module } from '@nestjs/common';
import { ToolItemController } from './tool-item.controller';
import { ToolItemService } from './tool-item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolItem } from './entities/tool-item.entity';
import { ToolItemImageModule } from '../tool-item-image/tool-item-image.module';

@Module({
  imports: [TypeOrmModule.forFeature([ToolItem]), ToolItemImageModule],
  controllers: [ToolItemController],
  providers: [ToolItemService]
})
export class ToolItemModule {}
