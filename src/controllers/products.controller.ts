import { Request, Response } from 'express';
import ProductService from '../service/product.service';

export default class ProductController {
  public static async createProduct(req: Request, res: Response) {
    try {
      const data = await ProductService.createProduct(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public static async getProducts(req: Request, res: Response) {
    try {
      const data = await ProductService.getProducts();
      res.json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public static async getProductById(req: Request, res: Response) {
    try {
      const data = await ProductService.getProductById(Number(req.params.id));
      res.json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public static async updateProduct(req: Request, res: Response) {
    try {
      const data = await ProductService.updateProduct(Number(req.params.id), req.body);
      res.json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public static async removeProduct(req: Request, res: Response) {
    try {
      const data = await ProductService.removeProduct(Number(req.params.id));
      res.json(data);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
