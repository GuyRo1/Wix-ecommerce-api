import { Product, validateProduct } from "../validation";
import { create } from "zustand";
import { api } from "../api";
import { FormCreateProductMold, FormUpdateProductMold } from "../types";
import { toast } from "sonner";

type Store = {
    products: Product[];
    product?: Product;
    refresh: () => Promise<void>;
    createProduct: (product: FormCreateProductMold) => Promise<void>;
    updateVisibility: (productId: string, isVisible: boolean) => Promise<void>;
    updateProduct: (productId: string, update: FormUpdateProductMold) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
    getProduct: (productId: string) => Promise<void>;
};

const safeValidate = (product: unknown): Product | null => {
    try {
        return validateProduct(product);
    } catch (e) {
        return null;
    }
};


export const useStore = create<Store>((set) => ({
    products: [],
    product: undefined,
    refresh: async () => {
        const response = await api.getProducts();
        const validProducts: Product[] = response.data
            .map((product) => safeValidate(product))
            .filter(Boolean) as Product[];
        set({ products: validProducts });
    },
    createProduct: async (product: FormCreateProductMold) => {
        try {
            await api.createProduct(product);
            const response = await api.getProducts();
            const validProducts: Product[] = response.data
                .map((product) => safeValidate(product))
                .filter(Boolean) as Product[];
            set({ products: validProducts });
        } catch (err) {
            toast.error("Can't Create");
            throw err;
        }
    },
    updateVisibility: async (productId: string, isVisible: boolean) => {
        try {
            await api.updateVisibility(productId, isVisible);
            const response = await api.getProducts();
            const validProducts: Product[] = response.data
                .map((product) => safeValidate(product))
                .filter(Boolean) as Product[];
            set({ products: validProducts });
        } catch (err) {
            toast.error(`Cant toggle visibility for Product: ${productId}`);
            throw err;
        }
    },
    updateProduct: async (productId: string, update: FormUpdateProductMold) => {
        try {
            await api.updateProduct(productId, update);
            const response = await api.getProducts();
            const validProducts: Product[] = response.data
                .map((product) => safeValidate(product))
                .filter(Boolean) as Product[];
            set({ products: validProducts });
        } catch (err) {
            toast.error(`Product: ${productId} could not be update`);
            throw err;
        }
    },
    getProduct: async (productId: string) => {
        try {
            const response = await api.getProductById(productId);
            const validProduct = safeValidate(response.data);
            if (validProduct) {
                set({ product: validProduct });
            } else {
                throw new Error('item not found');
            }
        } catch (err) {
            toast.error(`Product: ${productId} Not found `);
            throw err;
        }
    },
    deleteProduct: async (productId: string) => {
        try {
            await api.deleteProduct(productId);
        } catch (err) {
            toast.error(`Could not delete product, Turn into invisible or contact support`);
            throw err;
        }
    },
}));
