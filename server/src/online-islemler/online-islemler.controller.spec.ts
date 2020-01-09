import { Test, TestingModule } from '@nestjs/testing';
import { OnlineIslemlerController } from './online-islemler.controller';

describe('OnlineIslemler Controller', () => {
  let controller: OnlineIslemlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnlineIslemlerController],
    }).compile();

    controller = module.get<OnlineIslemlerController>(OnlineIslemlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
