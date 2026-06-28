import { LISTA_USUARIOS } from '../data/usuarios.js';

export const autenticarUsuarioAPI = (correo, contra) => {

  const usuarioEncontrado = LISTA_USUARIOS.find(
    (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.contra === contra
  );

  if (!usuarioEncontrado) {
    throw new Error('Correo o contraseña incorrectos.');
  }

  return { 
    name: usuarioEncontrado.nombre, 
    sector: usuarioEncontrado.sector,
    rol: usuarioEncontrado.rol,
    imagen: usuarioEncontrado.imagen
  };
};