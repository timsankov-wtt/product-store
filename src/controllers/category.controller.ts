import { Request, Response } from 'express';
import CategoryService from '../service/category.service';

export default class CategoryController {
  public static async createCategory(req: Request, res: Response) {
    try {
      const data = await CategoryService.createCategory(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public static async getCategories(_req: Request, res: Response) {
    try {
      const data = await CategoryService.getCategories();
      res.json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public static async getCategoryById(req: Request, res: Response) {
    try {
      const data = await CategoryService.getCategoryById(Number(req.params.id));
      res.json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public static async updateCategory(req: Request, res: Response) {
    try {
      const data = await CategoryService.updateCategory(Number(req.params.id), req.body);
      res.json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public static async removeCategory(req: Request, res: Response) {
    try {
      const data = await CategoryService.removeCategory(Number(req.params.id));
      res.json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
