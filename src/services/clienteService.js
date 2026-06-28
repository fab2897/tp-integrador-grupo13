export const obtenerClientesAPI = async () => {
  const respuesta = await fetch('https://fakestoreapi.com/users');
  if (!respuesta.ok) {
    throw new Error('Error de red al intentar obtener los clientes.');
  }
  return await respuesta.json();
};

// Modulo D
export const obtenerClientePorIdAPI = async (id) => {
  const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);
  if (!respuesta.ok) {
    throw new Error('Error al obtener el cliente desde el servidor.');
  }
  return await respuesta.json();
};

// Modulo D
export const eliminarClienteAPI = async (id) => {
  const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`, {
    method: 'DELETE',
  });
  if (!respuesta.ok) {
    throw new Error('Error al intentar eliminar el cliente en el servidor.');
  }
  return await respuesta.json();
};
// Modulo C
export const crearClienteAPI = async (clienteData) => {
  const respuesta = await fetch('https://fakestoreapi.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clienteData),
  });

  if (!respuesta.ok) {
    throw new Error('Error en el servidor al intentar crear el cliente.');
  }
  return await respuesta.ok ? respuesta.json() : null;
};