declare module '*.png';
declare module '*.jpg';

declare type SearchStackParamList = {
  SearchScreen: undefined;
  CategoryDetails: {category: string};
  ProductDetails: {productId: string | number};
};
