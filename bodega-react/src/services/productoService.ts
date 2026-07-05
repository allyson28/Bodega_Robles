const API_URL = 'http://localhost:3000/api';

export type ProductoApi = {
  id: number;
  sku: string;
  nombre: string;
  descripcion: string;
  categoria_id: number;
  unidad_medida: string;
  stock_minimo: number;
  stock_maximo: number;
  stock_actual: number;
  estado: string;
  precio_venta: string;
  url_imagen: string;
  createdAt: string;
  updatedAt: string;
  Categoria?: {
    id: number;
    nombre: string;
  };
};

export async function obtenerProductos(): Promise<ProductoApi[]> {
  const respuesta = await fetch(`${API_URL}/productos`);

  if (!respuesta.ok) {
    throw new Error('Error al obtener productos');
  }

  const resultado = await respuesta.json();

  return resultado.data;
}