import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type ProductoCarrito = {
  idProducto: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen: string;
};

type CarritoContextType = {
  carrito: ProductoCarrito[];
  agregarProducto: (producto: Omit<ProductoCarrito, 'cantidad'>) => void;
  actualizarCantidad: (idProducto: number, cantidad: number) => void;
  eliminarProducto: (idProducto: number) => void;
  vaciarCarrito: () => void;
  total: number;
  descuento: number;
  totalFinal: number;
  cuponAplicado: string;
  aplicarCupon: (codigo: string) => boolean;
  quitarCupon: () => void;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

const CARRITO_STORAGE_KEY = 'carrito_bodega_robles';
const CUPON_STORAGE_KEY = 'cupon_bodega_robles';

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>(() => {
    const carritoGuardado = localStorage.getItem(CARRITO_STORAGE_KEY);

    if (carritoGuardado) {
      try {
        return JSON.parse(carritoGuardado);
      } catch (error) {
        console.error('Error al leer el carrito:', error);
        return [];
      }
    }

    return [];
  });

  const [cuponAplicado, setCuponAplicado] = useState<string>(() => {
    return localStorage.getItem(CUPON_STORAGE_KEY) || '';
  });

  useEffect(() => {
    localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (cuponAplicado) {
      localStorage.setItem(CUPON_STORAGE_KEY, cuponAplicado);
    } else {
      localStorage.removeItem(CUPON_STORAGE_KEY);
    }
  }, [cuponAplicado]);

  const agregarProducto = (producto: Omit<ProductoCarrito, 'cantidad'>) => {
    const productoExiste = carrito.find(
      (item) => item.idProducto === producto.idProducto
    );

    if (productoExiste) {
      const carritoActualizado = carrito.map((item) =>
        item.idProducto === producto.idProducto
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );

      setCarrito(carritoActualizado);
    } else {
      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad: 1,
        },
      ]);
    }
  };

  const actualizarCantidad = (idProducto: number, cantidad: number) => {
    if (cantidad < 1) return;

    const carritoActualizado = carrito.map((item) =>
      item.idProducto === idProducto
        ? { ...item, cantidad }
        : item
    );

    setCarrito(carritoActualizado);
  };

  const eliminarProducto = (idProducto: number) => {
    const carritoActualizado = carrito.filter(
      (item) => item.idProducto !== idProducto
    );

    setCarrito(carritoActualizado);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setCuponAplicado('');
    localStorage.removeItem(CARRITO_STORAGE_KEY);
    localStorage.removeItem(CUPON_STORAGE_KEY);
  };

  const total = carrito.reduce(
    (acumulador, item) => acumulador + item.precio * item.cantidad,
    0
  );

  const calcularDescuento = () => {
    if (cuponAplicado === 'ROBLES10') {
      return total * 0.1;
    }

    if (cuponAplicado === 'BIENVENIDA5') {
      return Math.min(5, total);
    }

    return 0;
  };

  const descuento = calcularDescuento();

  const totalFinal = Math.max(total - descuento, 0);

  const aplicarCupon = (codigo: string) => {
    const codigoNormalizado = codigo.trim().toUpperCase();

    const cuponesValidos = ['ROBLES10', 'BIENVENIDA5'];

    if (!cuponesValidos.includes(codigoNormalizado)) {
      return false;
    }

    setCuponAplicado(codigoNormalizado);
    return true;
  };

  const quitarCupon = () => {
    setCuponAplicado('');
    localStorage.removeItem(CUPON_STORAGE_KEY);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        actualizarCantidad,
        eliminarProducto,
        vaciarCarrito,
        total,
        descuento,
        totalFinal,
        cuponAplicado,
        aplicarCupon,
        quitarCupon,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const context = useContext(CarritoContext);

  if (!context) {
    throw new Error('useCarrito debe usarse dentro de CarritoProvider');
  }

  return context;
}