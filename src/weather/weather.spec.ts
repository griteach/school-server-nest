import { Test, TestingModule } from '@nestjs/testing';
import { Weather } from './weather.service';

describe('Weather', () => {
  let provider: Weather;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Weather],
    }).compile();

    provider = module.get<Weather>(Weather);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
