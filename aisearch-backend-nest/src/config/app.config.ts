import { registerAs } from '@nestjs/config';
import { AppConfig } from './app-config.type';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import validateConfig from '../utils/validate-config';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariablesValidator {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;

  @IsUrl({ require_tld: false })
  @IsOptional()
  HOST_NAME: string;

  @IsString()
  @IsOptional()
  APP_NAME: string;

  @IsString()
  @IsOptional()
  WORKING_DIRECTORY_PATH
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'application',
    workingDirectory: process.env.WORKING_DIRECTORY_PATH || process.cwd(),
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : 5000,
    hostName: process.env.HOST_NAME ?? 'http://localhost',
  };
});