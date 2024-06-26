import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<typeof configuration>)

  await app.listen(config.get('port'));
}
bootstrap();
