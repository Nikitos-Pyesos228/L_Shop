export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
}
