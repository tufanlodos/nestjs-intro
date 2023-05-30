import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly product: Model<Product>,
  ) {}

  private async findProduct(id: string) {
    try {
      const product = await this.product.findById(id);
      if (!product) {
        throw new NotFoundException('Could not find product.');
      }
      return product;
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
  }

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = await this.product.create({
      title,
      description,
      price,
    });
    await newProduct.save();
    return newProduct.id;
  }

  async getProducts() {
    const products = await this.product.find();
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));
  }

  async getProduct(id: string) {
    const product = await this.findProduct(id);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const product = await this.findProduct(id);
    if (title) {
      product.title = title;
    }
    if (description) {
      product.description = description;
    }
    if (price) {
      product.price = price;
    }
    product.save();
  }

  async deleteProduct(id: string) {
    return (await this.product.findByIdAndDelete(id)) !== null;
  }
}
