// src/data/sidebarData.js
import { Home, ShoppingCart } from 'lucide-react';
import { ProductIcon } from '../assets/icons/ProductIcon';


export const sidebarData = [
  { name: 'Dashboard', link: '/', icon: Home },
  { name: 'Products', link: '/products', icon: ProductIcon },
  { name: 'Carts', link: '/cart', icon: ShoppingCart },
];
