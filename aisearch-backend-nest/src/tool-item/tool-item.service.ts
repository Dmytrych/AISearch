import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolItemService {
  getHello(): string {
    return 'Hello World!';
  }
}
