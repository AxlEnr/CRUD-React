'use client';
import { Button } from '../styles/components/button';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../styles/components/card';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';

// Datos estáticos de ejemplo
const staticCartItems = [
  {
    perfume: {
      id: 1,
      name: "Eau de Luxe Homme",
      price: 89.99,
      image: "/assets/imgs/Dior.jpg",
      description: "Una fragancia masculina sofisticada con notas de madera y especias",
      size: "100ml"
    },
    quantity: 2
  },
  {
    perfume: {
      id: 2,
      name: "Eau de Luxe Femme",
      price: 94.99,
      image: "/assets/imgs/Dior.jpg",
      description: "Una fragancia femenina elegante con notas florales y cítricas",
      size: "100ml"
    },
    quantity: 1
  },
  {
    perfume: {
      id: 3,
      name: "Eau de Luxe Femme",
      price: 94.99,
      image: "/assets/imgs/Dior.jpg",
      description: "Una fragancia femenina elegante con notas florales y cítricas",
      size: "100ml"
    },
    quantity: 1
  }
];

// Funciones estáticas de ejemplo
const getCartTotal = () => {
  return staticCartItems.reduce((total, item) => total + (item.perfume.price * item.quantity), 0);
};

const getItemCount = () => {
  return staticCartItems.reduce((count, item) => count + item.quantity, 0);
};

const clearCart = () => {
  console.log("Cart cleared");
  alert("Cart has been cleared (this is a static example)");
};

export default function CartPage() {
  const cartItems = staticCartItems;
  const total = getCartTotal();
  const itemCount = getItemCount();

  if (itemCount === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-12 px-4 bg-gray-900">
        <div className="bg-amber-900 p-6 rounded-full mb-6">
          <ShoppingBag className="mx-auto h-16 w-16 text-amber-200" />
        </div>
        <h1 className="font-serif text-4xl text-amber-100 font-medium mb-4">Your Cart is Empty</h1>
        <p className="text-lg text-amber-100 mb-8 max-w-md">
          Your luxury fragrance journey hasn't started yet. Discover our exquisite collection of perfumes.
        </p>
        <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-gray-900 font-medium">
          <Link href="/perfumes">Explore Collections</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl text-amber-100 font-medium text-center mb-12">Carrito de compras</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map(item => (
            <div key={item.perfume.id} className="border border-amber-800 rounded-xl p-6 flex flex-col sm:flex-row gap-6 bg-gray-800 shadow-lg">
              <div className="w-40 h-40 flex-shrink-0 relative">
                <img 
                  src={item.perfume.image} 
                  alt={item.perfume.name}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute -top-2 -right-2 bg-amber-600 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {item.quantity}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-2xl text-amber-100 font-medium">{item.perfume.name}</h3>
                    <p className="text-amber-200 text-sm mt-1">{item.perfume.size}</p>
                  </div>
                  <span className="font-serif text-xl font-medium text-amber-100">${item.perfume.price.toFixed(2)}</span>
                </div>
                <p className="text-amber-100 mt-2 mb-4">{item.perfume.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-amber-700 rounded-full bg-gray-700">
                    <button className="p-2 text-amber-200 hover:text-amber-100">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 text-amber-100 font-medium">{item.quantity}</span>
                    <button className="p-2 text-amber-200 hover:text-amber-100">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center">
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Card className="lg:col-span-1 sticky top-24 border border-amber-800 bg-gray-800 shadow-lg">
          <CardHeader className="border-b border-amber-800">
            <CardTitle className="font-serif text-2xl text-amber-100 font-medium">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 py-6">
            <div className="flex justify-between text-base">
              <span className="text-amber-200">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
              <span className="font-medium text-amber-100">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-amber-200">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm text-amber-200">
              <span>Taxes</span>
              <span>Calculated at checkout</span>
            </div>
            <hr className="my-4 border-amber-800" />
            <div className="flex justify-between text-lg font-medium">
              <span className="text-amber-100">Total</span>
              <span className="text-amber-400">${total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 pt-0">
            <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-500 text-gray-900 font-medium" asChild>
              <Link href="/checkout" className="flex items-center justify-center">
                Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              onClick={clearCart} 
              className="w-full border-amber-600 text-amber-100 hover:bg-gray-700 font-medium"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
            </Button>
            <p className="text-center text-sm text-amber-200 mt-2">
              Free shipping on all orders over $50
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}