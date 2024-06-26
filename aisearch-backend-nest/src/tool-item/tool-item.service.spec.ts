import { Test, TestingModule } from '@nestjs/testing';
import { ToolItemService } from './tool-item.service';

describe('ToolItemService', () => {
  let service: ToolItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToolItemService],
    }).compile();

    service = module.get<ToolItemService>(ToolItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
