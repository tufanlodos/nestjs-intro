import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }

  insertProduct(title: string, description: string, price: number) {
    const prodId = (this.products.length + 1).toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(id: string) {
    const [product] = this.findProduct(id);
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return { ...product };
  }

  updateProduct(id: string, title: string, description: string, price: number) {
    const [product, index] = this.findProduct(id);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(id: string) {
    const [, index] = this.findProduct(id);
    this.products.splice(index, 1);
  }
}
