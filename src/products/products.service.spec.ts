import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken('Product'),
          useValue: {
            findById: jest.fn(() => ({
              id: '1',
              title: 'Prod 1',
              description: 'Prod 1 Description',
              price: 10,
            })),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find the product with correct id', async () => {
    expect(await service.getProduct('1')).toHaveProperty('id', '1');
  });
});
