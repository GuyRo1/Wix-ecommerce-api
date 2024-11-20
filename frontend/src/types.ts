export type FormCreateProductMold = {
    imageUrl: string;
    name: string;
    ribbon: string;
    description: string;
    price: string;
    choices?: {
      name: string;
      one: {value: string, description: string}
      two: {value: string, description: string}
      three: {value: string, description: string}
    }
  } 

export type FormUpdateProductMold = {
  imageUrl?: string;
  name?: string;
  ribbon?: string;
  description?: string;
  price?: string;
  choices?: {
    name: string;
      one: {value: string, description: string}
      two: {value: string, description: string}
      three: {value: string, description: string}
  }
}