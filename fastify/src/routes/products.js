import * as productsController from '../controllers/products';
import { AddProductSchema, PutProductSchema, GetProductSchema, GetProductsSchema, DeleteProdcutSchema } from './documentation/productsAPI';
import verifyToken from '../controllers/auth/verifyToken';
import FastifyAuth from 'fastify-auth';

const getProductsRoute = {
  method: 'GET',
  url: '/products',
  logLevel: 'warn',
  handler: productsController.getProducts,
  schema: GetProductsSchema,
};
const getProductRoute = {
  method: 'GET',
  url: '/products/:id',
  logLevel: 'warn',
  handler: productsController.getSingleProduct,
  schema: GetProductSchema,
};
const postProductRoute = {
  method: 'POST',
  logLevel: 'warn',
  handler: productsController.addProduct,
  schema: AddProductSchema,
};
const putProductRoute = {
  method: 'PUT',
  url: '/products/:id',
  handler: productsController.updateProduct
};
const deleteProductRoute = {
  method: 'DELETE',
  url: '/products/:id',
  logLevel: 'warn',
  handler: productsController.deleteProduct
};
const getSearchProducts = {
  method: 'PUT',
  url: '/products/search',
  logLevel: 'warn',
  handler: productsController.getSearchProducts,
  schema: GetProductsSchema
};
const getProductsPdfDownload = {
  method: 'PUT',
  url: '/products/pdf',
  logLevel: 'warn',
  handler: productsController.getProductsPdfDownload
}

const getProductsCvsDownload = {
  method: 'PUT',
  url: '/products/cvs',
  logLevel: 'warn',
  handler: productsController.getProductsCvsDownload
}

const productRoutes = async (fastify, opts) => {
  fastify.register(FastifyAuth).after(() => privateProductRoutes(fastify));
};

const privateProductRoutes = (fastify) => {
  fastify.post('/products', {
    preHandler: fastify.auth([verifyToken]),
    ...postProductRoute
  });

  fastify.get('/products', {
    preHandler: fastify.auth([verifyToken]),
    ...getProductsRoute
  });

  fastify.put('/products/:id', {
    preHandler: fastify.auth([verifyToken]),
    ...putProductRoute
  });

  fastify.delete('/products/:id', {
    preHandler: fastify.auth([verifyToken]),
    ...deleteProductRoute
  });

  fastify.get('/products/:id', {
    preHandler: fastify.auth([verifyToken]),
    ...getProductRoute
  });

  fastify.put('/products/search', {
    preHandler: fastify.auth([verifyToken]),
    ...getSearchProducts
  });

  fastify.put('/products/pdf', {
    preHandler: fastify.auth([verifyToken]),
    ...getProductsPdfDownload
  });

  fastify.put('/products/csv', {
    preHandler: fastify.auth([verifyToken]),
    ...getProductsCvsDownload
  });
}


export default productRoutes;