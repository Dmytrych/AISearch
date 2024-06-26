import { Module } from '@nestjs/common';
import { ToolItemModule } from './tool-item/tool-item.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ToolItemModule,
    ConfigModule.forRoot({
    isGlobal: true,
      load: [configuration]
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
