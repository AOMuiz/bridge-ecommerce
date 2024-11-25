export type Product = {
  id: number;
  title: string;
  price: string; // If price is a number, change this to `number`
  category: string;
  description: string;
  image: string;
  quantity?: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export type Products = Product[];

export type Category = string; // Each category is a simple string
