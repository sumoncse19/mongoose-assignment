import { Request, Response } from 'express'
import { ERROR, SUCCESS, formatZodErrors } from '../shared/api.response.types'
import { IProduct } from './product.interface'
import { productValidationSchema } from './product.validation'
import { ProductServices } from './product.service'

const createProduct = async (req: Request, res: Response) => {
  try {
    const validationResult = productValidationSchema.safeParse(req.body)
    if (!validationResult.success) {
      const formattedErrors = formatZodErrors(validationResult.error)

      return ERROR(res, 'Zod Validation Error', formattedErrors, 400)
    }
    const productData = validationResult.data
    const product = await ProductServices.createProductIntoDB(productData)
    SUCCESS(res, 'Product Created Successfully!', product)
  } catch (error: unknown) {
    ERROR(
      res,
      error instanceof Error ? error.message : 'Something went wrong!',
      error,
    )
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm
    if (searchTerm) {
      const products = await ProductServices.searchProductsFromDB(
        searchTerm as string,
      )
      SUCCESS(
        res,
        `Products matching search term '${searchTerm}' fetched successfully!`,
        products,
      )
    } else {
      const products = await ProductServices.getAllProductsFromDB()
      SUCCESS(res, 'Products fetched successfully!', products)
    }
  } catch (error: unknown) {
    ERROR(
      res,
      error instanceof Error ? error.message : 'Failed to fetched Products!',
      error,
    )
  }
}

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.getProductByIdFromDB(
      req.params.productId,
    )

    if (product) {
      SUCCESS(res, 'Product fetched successfully!', product)
    } else {
      SUCCESS(res, 'Product not found')
    }
  } catch (error: unknown) {
    ERROR(
      res,
      error instanceof Error ? error.message : 'Failed to get Products!',
      error,
      500,
    )
  }
}

const updateProduct = async (req: Request, res: Response) => {
  try {
    const validationResult = productValidationSchema
      .partial()
      .safeParse(req.body)
    if (!validationResult.success) {
      const formattedErrors = formatZodErrors(validationResult.error)

      return ERROR(res, 'Zod Validation Error', formattedErrors, 400)
    }

    const productData = validationResult.data
    const product = await ProductServices.updateProductIntoDB(
      req.params.productId,
      productData as IProduct,
    )
    if (!product) {
      SUCCESS(res, 'Product not found')
    } else {
      SUCCESS(res, 'Product updated successfully!', product)
    }
  } catch (error: unknown) {
    ERROR(
      res,
      error instanceof Error ? error.message : 'Failed to update Product!',
      error,
      500,
    )
  }
}

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductServices.deleteProductFromDB(
      req.params.productId,
    )
    if (!product) {
      SUCCESS(res, 'Product not found')
    } else {
      SUCCESS(res, 'Product Deleted successfully!', null)
    }
  } catch (error: unknown) {
    ERROR(
      res,
      error instanceof Error ? error.message : 'Failed to delete Product!',
      error,
      500,
    )
  }
}

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
