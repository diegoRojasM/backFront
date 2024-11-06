import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

export const connectDB = async () => {
    try {
        const mongoURI = process.env.mongodb_URL; // Obtener la URL de la base de datos desde la variable de entorno
        if (!mongoURI) {
            throw new Error('La variable de entorno mongodb_URL no está definida');
        }
        await mongoose.connect(mongoURI);  // Conectar con la base de datos
        console.log(">>> DB conectada");
    } catch (err) {
        console.error("Error de conexión a la DB: ", err.message);
    }
};
