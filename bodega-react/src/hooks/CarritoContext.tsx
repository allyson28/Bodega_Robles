import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type ProductoCarrito = {
  idProducto: number;
  nombre: string;
  precio: number;
  cantidad: number;
};

type CarritoContextType = {
  carrito: ProductoCarrito[];
  agregarProducto: (producto: Omit<ProductoCarrito, 'cantidad'>) => void;
  actualizarCantidad: (idProducto: number, cantidad: number) => void;
  eliminarProducto: (idProducto: number) => void;
  vaciarCarrito: () => void;
  total: number;
};

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);

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
    setCarrito(
      carrito.filter((item) => item.idProducto !== idProducto)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const total = carrito.reduce(
    (acumulador, item) => acumulador + item.precio * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        actualizarCantidad,
        eliminarProducto,
        vaciarCarrito,
        total,
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