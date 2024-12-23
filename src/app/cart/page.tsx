'use client';

import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { useState } from 'react'

export default function CartPage() {
  const { cart, removeFromCart, total } = useCart()
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null)

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Add some photos to get started!</p>
        <a
          href="/discover"
          className="inline-block bg-oceanBlue text-white px-6 py-3 rounded-lg hover:bg-oceanBlue/90 transition-colors"
        >
          Back to Recent Sessions
        </a>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {previewPhoto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setPreviewPhoto(null)}>
          <div className="relative w-[95vw] h-[80vh]">
            <Image
              src={previewPhoto}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow">
              <div className="relative w-24 h-24">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">Photographer: {item.photographerId}</p>
                <p className="text-oceanBlue font-medium">${item.price}</p>
                <button
                  onClick={() => setPreviewPhoto(item.image)}
                  className="mt-2 text-sm text-white bg-sunsetGold px-4 py-1 rounded hover:bg-sunsetGold/90 transition-colors"
                >
                  Preview Photo
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal ({cart.length} items)</span>
              <span>${total}</span>
            </div>
          </div>
          <button 
            className="w-full bg-oceanBlue text-white py-3 rounded-lg hover:bg-oceanBlue/90 transition-colors"
            onClick={() => {
              // TODO: Implement checkout logic
              console.log('Proceed to checkout')
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
} 