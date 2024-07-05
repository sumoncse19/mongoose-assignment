import { IProduct } from './product.interface'
import ProductModel from './product.model'

const createProductIntoDB = async (productData: IProduct) => {
  const product = new ProductModel(productData)
  return await product.save()
}

const getAllProductsFromDB = async () => {
  return await ProductModel.find()
}

const searchProductsFromDB = async (searchTerm: string) => {
  return await ProductModel.find({
    name: { $regex: searchTerm, $options: 'i' },
  })
}

const getProductByIdFromDB = async (productId: string) => {
  return await ProductModel.findById({ _id: productId })
}

const updateProductIntoDB = async (
  productId: string,
  productData: IProduct,
) => {
  return await ProductModel.findByIdAndUpdate(productId, productData, {
    new: true,
  })
}

const deleteProductFromDB = async (productId: string) => {
  return await ProductModel.findByIdAndDelete({ _id: productId })
}

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  searchProductsFromDB,
}
