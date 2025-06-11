import { getOrders } from "app/services/orderService";
import { useEffect, useState } from "react";
import { Trash2, ArrowRight, CreditCard, Banknote, Wallet } from "lucide-react";
import Swal from "sweetalert2";
import Navbar from "app/components/Navbar/Navbar";

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  items?: OrderItem[];
  total: number;
  date: string;
  status: string; // Agregamos estado de la orden
  detalles?: any[];
}

type PaymentMethod = 'credit_card' | 'debit_card' | 'cash' | '';

export default function Checkout() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('');
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        
        const transformedOrders = data.map((order: any) => ({
          id: order.id || 0,
          items: (order.items || order.detalles || []).map((item: any) => ({
            id: item.id || item.id_producto || 0,
            productName: item.productName || item.nombre || item.producto?.nombre || 'Producto sin nombre',
            quantity: item.quantity || item.cantidad || 0,
            price: parseFloat(item.price || item.precio_unitario || item.producto?.precio || 0),
          })),
          total: parseFloat(order.total || 0),
          date: order.date || new Date().toISOString(),
          status: order.status || 'pending' // Agregamos estado
        }));

        setOrders(transformedOrders);
        setError(null);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("No se pudieron cargar las órdenes. Por favor intenta más tarde.");
        Swal.fire({
          title: "Error",
          text: "No se pudieron cargar las órdenes.",
          icon: "error",
          confirmButtonText: "OK"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const handlePayOrder = (order: Order) => {
    setSelectedOrder(order);
    setPaymentMethod('');
  };

  const processPayment = async () => {
    if (!selectedOrder || !paymentMethod) {
      Swal.fire({
        title: "Error",
        text: "Por favor selecciona un método de pago",
        icon: "error",
        confirmButtonText: "OK"
      });
      return;
    }

    setIsPaying(true);

    try {
      // Simulamos el pago con el backend
      const paymentData = {
        orderId: selectedOrder.id,
        amount: selectedOrder.total,
        paymentMethod,
        currency: 'MXN'
      };

      const payOrder = async (prueba:any) => {}

      const result = await payOrder(paymentData);
      
      // Actualizamos el estado local
      setOrders(prev => prev.map(order => 
        order.id === selectedOrder.id ? { ...order, status: 'paid' } : order
      ));

      Swal.fire({
        title: "¡Pago exitoso!",
        text: `Tu pago de $${selectedOrder.total.toFixed(2)} se ha procesado correctamente.`,
        icon: "success",
        confirmButtonText: "OK"
      });

      setSelectedOrder(null);
    } catch (error) {
      console.error("Error processing payment:", error);
      Swal.fire({
        title: "Error en el pago",
        text: "Ocurrió un error al procesar tu pago. Por favor intenta nuevamente.",
        icon: "error",
        confirmButtonText: "OK"
      });
    } finally {
      setIsPaying(false);
    }
  };

  const PaymentModal = () => {
    if (!selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full border border-amber-700">
          <h3 className="text-2xl font-semibold text-amber-300 mb-4">
            Pagar Orden #{selectedOrder.id}
          </h3>
          
          <p className="text-amber-200 mb-2">
            Total a pagar: <span className="text-amber-400 font-bold text-xl">
              ${selectedOrder.total.toFixed(2)}
            </span>
          </p>
          
          <div className="space-y-4 mb-6">
            <p className="text-amber-100">Selecciona método de pago:</p>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-3 rounded-lg flex flex-col items-center border-2 transition-all ${
                  paymentMethod === 'credit_card' 
                    ? 'border-amber-500 bg-amber-900 bg-opacity-30' 
                    : 'border-gray-600 hover:border-amber-400'
                }`}
              >
                <CreditCard className="h-6 w-6 mb-1 text-amber-300" />
                <span className="text-amber-100">Tarjeta Crédito</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod('debit_card')}
                className={`p-3 rounded-lg flex flex-col items-center border-2 transition-all ${
                  paymentMethod === 'debit_card' 
                    ? 'border-amber-500 bg-amber-900 bg-opacity-30' 
                    : 'border-gray-600 hover:border-amber-400'
                }`}
              >
                <CreditCard className="h-6 w-6 mb-1 text-amber-300" />
                <span className="text-amber-100">Tarjeta Débito</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-lg flex flex-col items-center border-2 transition-all ${
                  paymentMethod === 'cash' 
                    ? 'border-amber-500 bg-amber-900 bg-opacity-30' 
                    : 'border-gray-600 hover:border-amber-400'
                }`}
              >
                <Banknote className="h-6 w-6 mb-1 text-amber-300" />
                <span className="text-amber-100">PayPal</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod('')}
                className={`p-3 rounded-lg flex flex-col items-center border-2 transition-all ${
                  paymentMethod === '' 
                    ? 'border-amber-500 bg-amber-900 bg-opacity-30' 
                    : 'border-gray-600 hover:border-amber-400'
                }`}
              >
                <Wallet className="h-6 w-6 mb-1 text-amber-300" />
                <span className="text-amber-100">Otro método</span>
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setSelectedOrder(null)}
              className="px-4 py-2 border border-gray-600 rounded-md text-amber-100 hover:bg-gray-700 transition-colors"
              disabled={isPaying}
            >
              Cancelar
            </button>
            <button
              onClick={processPayment}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-gray-900 rounded-md font-semibold flex items-center"
              disabled={!paymentMethod || isPaying}
            >
              {isPaying ? (
                'Procesando...'
              ) : (
                <>
                  Confirmar Pago <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-900 p-8 rounded-lg">
        <p className="text-3xl font-serif text-red-400 mb-4">Error</p>
        <p className="text-amber-300 max-w-md text-center">
          {error}
        </p>
        <button 
          className="mt-4 bg-amber-600 hover:bg-amber-500 text-gray-900 px-4 py-2 rounded-md font-semibold"
          onClick={() => window.location.reload()}
        >
          Recargar
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-20 text-amber-400 font-serif text-2xl">
        Cargando tus órdenes...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-900 p-8 rounded-lg">
        <p className="text-3xl font-serif text-amber-400 mb-4">No tienes órdenes aún</p>
        <p className="text-amber-300 max-w-md text-center mb-6">
          Cuando realices una compra, aparecerán aquí tus órdenes.
        </p>
        <a 
          href="/home" 
          className="bg-amber-600 hover:bg-amber-500 text-gray-900 px-6 py-3 rounded-md font-semibold"
        >
          Ir a la tienda
        </a>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="mt-5 max-w-6xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg text-amber-100 font-serif">
        <h1 className="text-4xl mb-8 font-semibold text-amber-300 text-center">Tus Órdenes</h1>
        <div className="space-y-8">
          {orders.map((order) => (
            <section
              key={order.id}
              className="border border-amber-700 rounded-xl bg-gray-800 shadow-md p-6"
            >
              <header className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-amber-300">
                    Orden #{order.id}
                  </h2>
                  <p className="text-amber-400 text-sm mt-1">
                    {new Date(order.date).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className={`mt-2 text-sm ${
                    order.status === 'paid' 
                      ? 'text-green-400' 
                      : 'text-amber-400'
                  }`}>
                    Estado: {order.status === 'paid' ? 'Pagada' : 'Pendiente de pago'}
                  </p>
                </div>
              </header>

              {(order.items && order.items.length > 0) ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col items-center bg-gray-700 rounded-lg p-4 shadow-inner hover:bg-gray-600 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-amber-200 text-center">
                          {item.productName}
                        </h3>
                        <p className="text-amber-400 text-sm">
                          Cantidad: {item.quantity}
                        </p>
                        <p className="text-amber-300 font-medium mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <footer className="mt-6 flex flex-col sm:flex-row justify-between items-center border-t border-amber-700 pt-4 gap-4">
                    <div className="text-center sm:text-left">
                      <p className="text-amber-400 font-semibold">
                        Total: <span className="text-amber-200 text-xl">
                          ${order.total.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    {order.status !== 'paid' && (
                      <button
                        className="flex items-center gap-1 bg-amber-600 hover:bg-amber-500 text-gray-900 px-4 py-2 rounded-md font-semibold transition-colors"
                        onClick={() => handlePayOrder(order)}
                      >
                        Pagar Orden <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </footer>
                </>
              ) : (
                <p className="text-amber-400 text-center py-4">
                  No hay productos en esta orden
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
      <PaymentModal />
    </main>
  );
}