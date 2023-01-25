export interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsDetail {
  products: Products[];
  total: number;
  skip: number;
  limit: number;
}

export interface CartsDetail {
  id: number;
  products: Products[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface Cart {
  carts: CartsDetail;
  total: number;
  skip: number;
  limit: number;
}

export interface UserDetail {
  name: string;
  phone: string;
  total_item: number;
  total_amount: number;
}
