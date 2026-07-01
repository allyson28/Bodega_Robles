const API_URL = 'http://localhost:3000/api';

export type ProductoApi = {
  id_producto: number;
  id_categoria: number;
  sku: string;
  nombre: string;
  descripcion: string;
  marca: string;
  unidad_medida: string;
  Categorium?: {
    id_categoria: number;
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