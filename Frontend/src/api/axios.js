import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Asegúrate de que esta variable esté correctamente definida
  withCredentials: true, // Si usas cookies o autenticación basada en sesiones
});

export default instance;
