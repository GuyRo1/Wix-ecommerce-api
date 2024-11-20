import axios from 'axios';
import { FormCreateProductMold, FormUpdateProductMold } from '../types';

const catalogRoute = 'http://localhost:3000/catalog'




export const api = {
    getProducts: () => axios.post<unknown[]>(`${catalogRoute}/search`),
    createProduct: (product: FormCreateProductMold) => axios.post(`${catalogRoute}/product`, product),
    updateVisibility: (productId: string, isVisible: boolean) => axios.patch(`${catalogRoute}/product/${productId}/visibility`,{visible:isVisible}),
    updateProduct: (productId: string, update: FormUpdateProductMold) => axios.patch(`${catalogRoute}/product/${productId}`, update),
    getProductById: (productId: string) => axios.get(`${catalogRoute}/product/${productId}`),
    deleteProduct: (productId: string) => axios.delete(`${catalogRoute}/product/${productId}`)
  } as const;