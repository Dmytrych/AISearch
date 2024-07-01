import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolItemImage } from './entities/tool-item-image.entity';
import { ToolItemImageRepository } from './repositories/tool-item-image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ToolItemImage])],
  providers: [
    {
      provide: ToolItemImageRepository,
      useClass: ToolItemImageRepository
    }
  ],
  exports: [ToolItemImageRepository]
})
export class ToolItemImageModule {}
