import { useEffect, useState } from 'react';
import { Button } from '../styles/components/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../styles/components/card';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';

// Define the Detalle type based on expected API response structure
interface Detalle {
  cantidad: number;
  producto: {
    id: number;
    nombre: string;
    precio: string | number;
    imagen_url: string;
    descripcion: string;
    capacidad: string | number;
  };
}

// Define the CartItem type for items in the cart
interface CartItem {
  perfume: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    size: string;
  };
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      setLoading(false);
      return;
    } 

    fetch(`${apiUrl}/carrito/usuario/${userId}`)
      .then(res => res.json())
      .then(data => {
        const items = data.detalles.map((detalle: Detalle) => ({
          perfume: {
            id: detalle.producto.id,
            name: detalle.producto.nombre,
            price: parseFloat(detalle.producto.precio as string),
            iimage: `/assets/imgs/${detalle.producto.imagen_url}`, 
            description: detalle.producto.descripcion,
            size: `${detalle.producto.capacidad} GB`,
          },
          quantity: detalle.cantidad
        }));
        setCartItems(items);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cart:', err);
        setLoading(false);
      });
  }, []);


  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.perfume.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const updateCartItemQuantity = (
  cartId: number,
  productId: number,
  newQuantity: number
) => {
  const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('User ID not found');
    return;
  }

  fetch(`${apiUrl}/carrito/usuario/${userId}/${cartId}/producto/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cantidad: newQuantity }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error al actualizar cantidad');
      }
      // Actualizar localmente el estado
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.perfume.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    })
    .catch((err) => {
      console.error('Error al actualizar cantidad:', err);
      alert('No se pudo actualizar la cantidad');
    });
};


const clearCart = () => {
  const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
  const userId = localStorage.getItem('userId');
  if (!userId) {
    alert('User ID not found');
    return;
  }

  fetch(`${apiUrl}/carrito/usuario/${userId}/vaciar`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Error al vaciar el carrito');
      }
      // Vaciar estado local también
      setCartItems([]);
      alert('Carrito vaciado con éxito');
    })
    .catch(err => {
      console.error('Error al vaciar el carrito:', err);
      alert('Hubo un error al vaciar el carrito');
    });
};


  const total = getCartTotal();
  const itemCount = getItemCount();

  if (loading) {
    return <div className="text-center py-20 text-amber-100">Loading...</div>;
  }

  if (itemCount === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-12 px-4 bg-gray-900">
        <div className="bg-amber-900 p-6 rounded-full mb-6">
          <ShoppingBag className="mx-auto h-16 w-16 text-amber-200" />
        </div>
        <h1 className="font-serif text-4xl text-amber-100 font-medium mb-4">Tu Carrito esta vacio</h1>
        <p className="text-lg text-amber-100 mb-8 max-w-md">
          Descubre nuestra Gran Coleccion de Perfumes.
        </p>
        <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-gray-900 font-medium">
          <Link to="/home">Explore Collections</Link>
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
                    <button
                      className="p-2 text-amber-200 hover:text-amber-100"
                      onClick={() =>
                        item.quantity > 1 &&
                        updateCartItemQuantity(1, item.perfume.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 text-amber-100 font-medium">{item.quantity}</span>
                    <button
                      className="p-2 text-amber-200 hover:text-amber-100"
                      onClick={() =>
                        updateCartItemQuantity(1, item.perfume.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="text-amber-400 hover:text-amber-300 text-sm font-medium flex items-center">
                    <Trash2 className="mr-1 h-4 w-4" /> Quitar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Card className="lg:col-span-1 sticky top-24 border border-amber-800 bg-gray-800 shadow-lg">
          <CardHeader className="border-b border-amber-800">
            <CardTitle className="font-serif text-2xl text-amber-100 font-medium">Total de compra</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 py-6">
            <div className="flex justify-between text-base">
              <span className="text-amber-200">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
              <span className="font-medium text-amber-100">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-amber-200">
              <span>Envio</span>
              <span>Gratis</span>
            </div>
            <div className="flex justify-between text-sm text-amber-200">
              <span>Impuestos</span>
              <span>No</span>
            </div>
            <hr className="my-4 border-amber-800" />
            <div className="flex justify-between text-lg font-medium">
              <span className="text-amber-100">Total</span>
              <span className="text-amber-400">${total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 pt-0">
            <Link to="/checkout">
              <Button size="lg" className="w-full bg-amber-600 hover:bg-amber-500 text-gray-900 font-medium">
                Proceder con la compra <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={clearCart} 
              className="w-full border-amber-600 text-amber-100 hover:bg-gray-700 font-medium"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Vaciar carrito
            </Button>
            <p className="text-center text-sm text-amber-200 mt-2">
              Envio gratis en compras mayores a $1000
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}