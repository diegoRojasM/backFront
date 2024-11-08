import axios from "axios";


const instance = axios.create({
  baseURL: 'https://backfront-bgob.onrender.com/api', // URL del backend en Render
  withCredentials: true, // Si usas cookies o autenticación basada en sesiones
});

export default instance;
