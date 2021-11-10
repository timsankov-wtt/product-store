import { DeleteResult, getRepository } from 'typeorm';
import { Category } from '../models/Category';

export default class ProductService {
  public static getCategories(): Promise<Category[]> {
    return getRepository(Category).find();
  }

  public static getCategoryById(id: number): Promise<Category | undefined> {
    return getRepository(Category).findOne(id);
  }

  public static createCategory(category: Category): Promise<Category> {
    const categoryItem = getRepository(Category).create(category);
    return getRepository(Category).save(categoryItem);
  }

  public static async updateCategory(id: number, category: Category): Promise<Category> {
    const categoryFound = await getRepository(Category).findOne(id);
    return getRepository(Category).save({ ...categoryFound, ...category });
  }

  public static removeCategory(id: number): Promise<DeleteResult> {
    return getRepository(Category).delete(id);
  }
}
