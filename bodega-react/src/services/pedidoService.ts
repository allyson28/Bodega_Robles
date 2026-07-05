import { loginClientePrueba } from './authService';
import type { ProductoCarrito } from '../hooks/CarritoContext';

const API_URL = 'http://localhost:3000/api';

type CrearPedidoParams = {
  carrito: ProductoCarrito[];
  metodoPago: string;
};

function convertirMetodoPago(metodoPago: string) {
  if (metodoPago === 'tarjeta') return 'TARJETA';
  if (metodoPago === 'yape') return 'TRANSFERENCIA';
  if (metodoPago === 'plin') return 'TRANSFERENCIA';

  return 'EFECTIVO';
}

export async function crearPedido({
  carrito,
  metodoPago,
}: CrearPedidoParams) {
  const token = await loginClientePrueba();

  const pedido = {
    numero_pedido: `PED-${Date.now()}`,
    cliente_id: 3,
    vendedor_id: 2,
    metodo_pago: convertirMetodoPago(metodoPago),
    detalles: carrito.map((item) => ({
      producto_id: item.idProducto,
      cantidad: item.cantidad,
    })),
  };

  console.log('Pedido enviado al backend:', pedido);

  const respuesta = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(pedido),
  });

  const resultado = await respuesta.json();

  console.log('Respuesta del backend al crear pedido:', resultado);

  if (!respuesta.ok) {
    const detalles = resultado.error?.details;

    if (Array.isArray(detalles) && detalles.length > 0) {
      const mensajes = detalles
        .map((detalle) => detalle.msg || detalle.message || JSON.stringify(detalle))
        .join('\n');

      throw new Error(mensajes);
    }

    throw new Error(
      resultado.error?.message ||
      'Error al registrar el pedido'
    );
  }

  return resultado;
}