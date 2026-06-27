import { Routes, Route, Navigate } from 'react-router-dom';

import Tienda from '../pages/Tienda';
import Carrito from '../pages/Carrito';
import HistorialCompras from '../pages/HistorialCompras';
import Checkout from '../pages/Checkout';
import PagoExitoso from '../pages/PagoExitoso';
import DetallePedido from '../pages/DetallePedido';
import DetalleHistorial from '../pages/DetalleHistorial';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tienda" />} />
      <Route path="/tienda" element={<Tienda />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/historial" element={<HistorialCompras />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/pago-exitoso" element={<PagoExitoso />} />
      <Route path="/detalle-pedido" element={<DetallePedido />} />
      <Route path="/detalle-historial" element={<DetalleHistorial />} />
    </Routes>
  );
}

export default AppRoutes;