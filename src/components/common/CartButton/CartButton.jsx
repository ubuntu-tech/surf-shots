'use client'

import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function CartButton() {
  const { cart } = useCart();
  const router = useRouter();

  return (
    <button 
      className="relative p-2 hover:bg-gray-100 rounded-full"
      onClick={() => router.push('/cart')}
    >
      <ShoppingCart className="w-6 h-6" />
      {cart.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cart.length}
        </span>
      )}
    </button>
  );
} 

export default CartButton;
