export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  brand: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShippingInfo {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}


