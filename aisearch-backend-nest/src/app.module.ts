import { Module } from '@nestjs/common';
import { ToolItemModule } from './tool-item/tool-item.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import configuration from './config/config.type';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './common/database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    ToolItemModule,
    ConfigModule.forRoot({
    isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
      dataSourceFactory: async (options?: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
      imports: [ConfigModule],
    }),
    CommonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
