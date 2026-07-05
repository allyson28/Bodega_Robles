const API_URL = 'http://localhost:3000/api';

export async function loginClientePrueba(): Promise<string> {
  const respuesta = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'vendedor@bodega-robles.com',
      password: 'ventas123',
    }),
  });

  const resultado = await respuesta.json();

  console.log('Respuesta login:', resultado);

  if (!respuesta.ok) {
    throw new Error(
      resultado.error?.message ||
      resultado.error?.details?.[0]?.msg ||
      'No se pudo iniciar sesión'
    );
  }

  return resultado.data.token;
}