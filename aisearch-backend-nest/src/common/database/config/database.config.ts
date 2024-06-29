import { IsInt, IsString, Max, Min } from 'class-validator';
import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './database-config.type';
import validateConfig from '../../../utils/validate-config';
import * as process from 'process';

class EnvironmentVariablesValidator {
  @IsString()
  DATABASE_HOST: string;

  @IsString()
  DATABASE_TYPE: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  DATABASE_PORT: number;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsString()
  DATABASE_USERNAME: string;
}

export default registerAs<DatabaseConfig>('database', () => {
  validateConfig(process.env, EnvironmentVariablesValidator)

  return {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USERNAME,
    dbName: process.env.DATABASE_NAME,
  }
})