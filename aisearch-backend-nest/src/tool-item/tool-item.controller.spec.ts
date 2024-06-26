import { Test, TestingModule } from '@nestjs/testing';
import { ToolItemController } from './tool-item.controller';

describe('ToolItemController', () => {
  let controller: ToolItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToolItemController],
    }).compile();

    controller = module.get<ToolItemController>(ToolItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
