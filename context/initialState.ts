export type Brand = {
  ID: string;
  name: string;
};
export type Category = Brand & {
  subCategories: Category[];
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  quantity?: number;
  rating: {
    rate: string;
    count: string;
  };
};

export const initialState = {
  categories: [],
  brands: [],
  cart: [],
} as {
  categories: Category[];
  brands: Brand[];
  cart: Product[];
};
