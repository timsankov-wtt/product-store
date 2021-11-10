import { Category } from './../models/Category';
import { DeleteResult, getRepository, In } from 'typeorm';
import { Product } from '../models/Product';

export default class ProductService {
  public static getProducts(): Promise<Product[]> {
    return getRepository(Product).find({ relations: ['categories'] });
  }

  public static getProductById(id: number): Promise<Product | undefined> {
    return getRepository(Product).findOne(id, { relations: ['categories'] });
  }

  public static async createProduct(product: Product): Promise<Product> {
    const productItem = getRepository(Product).create(product);
    productItem.categories = await getRepository(Category).find({ where: { id: In(product.categories) } });
    return getRepository(Product).save(productItem);
  }

  public static async updateProduct(id: number, product: Product): Promise<Product> {
    const productItem = await getRepository(Product).findOne(id);
    product.categories = await getRepository(Category).find({ where: { id: In(product.categories) } });
    return getRepository(Product).save({ ...productItem, ...product });
  }

  public static removeProduct(id: number): Promise<DeleteResult> {
    return getRepository(Product).delete(id);
  }
}
