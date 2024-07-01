import { Module } from '@nestjs/common';
import { ToolItemModule } from './tool-item/tool-item.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './common/database/typeorm-config.service';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ToolItemImageModule } from './tool-item-image/tool-item-image.module';
import appConfig from './config/app.config';
import databaseConfig from './common/database/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
      dataSourceFactory: async (options?: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
      imports: [ConfigModule],
    }),
    ToolItemModule,
    CommonModule,
    ToolItemImageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
