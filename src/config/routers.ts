import { Router } from 'express';
import product from '../controllers/products.controller';
import category from '../controllers/category.controller';
import { validate, Joi } from 'express-validation';
import { ProductStatus } from '../types/entity.types';

const router = Router();

const updateProductValidation = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    name: Joi.string().max(10).empty(),
    price: Joi.number().min(0).empty(),
    type: Joi.string()
      .valid(...Object.values(ProductStatus))
      .empty(),
    description: Joi.string().max(255).empty(),
    categories: Joi.array().items(Joi.number()).empty(),
  }),
};
const productValidation = {
  body: Joi.object({
    name: Joi.string().max(10).required(),
    price: Joi.number().min(0).required(),
    type: Joi.string()
      .valid(...Object.values(ProductStatus))
      .required(),
    description: Joi.string().max(255).empty(),
    categories: Joi.array().items(Joi.number()).required(),
  }),
};
const idValidation = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

router.get('/product', product.getProducts);
router.get('/product/:id', validate(idValidation), product.getProductById);
router.post('/product', validate(productValidation), product.createProduct);
router.put('/product/:id', validate(updateProductValidation), product.updateProduct);
router.delete('/product/:id', validate(idValidation), product.removeProduct);

const categoryValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};
const updateCategoryValidation = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
  body: Joi.object({
    name: Joi.string().empty(),
    description: Joi.string().empty(),
  }),
};
router.get('/category', category.getCategories);
router.get('/category/:id', validate(idValidation), category.getCategoryById);
router.post('/category', validate(categoryValidation), category.createCategory);
router.put('/category/:id', validate(updateCategoryValidation), category.updateCategory);
router.delete('/category/:id', validate(idValidation), category.removeCategory);

export default router;
