import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./clientApp";

/**
 * Guarda los datos del usuario que solicita un ticket en Firestore
 * @param {Object} userData - Datos del formulario del usuario
 * @param {string} userData.nombre - Nombre completo del usuario
 * @param {string} userData.whatsapp - Número de WhatsApp
 * @param {string} userData.email - Correo electrónico
 * @param {string} userData.cedula - Número de cédula
 * @returns {Promise<Object>} - Objeto con el resultado de la operación
 */
export const saveUserTicket = async (userData) => {
  try {
    // Validar que db esté inicializado
    if (!db) {
      throw new Error("Base de datos no inicializada. Verifica la configuración de Firebase.");
    }

    // Referencia a la colección "users-tickets"
    const ticketsCollection = collection(db, "users-tickets");

    // Agregar el documento con los datos del usuario y timestamp
    const docRef = await addDoc(ticketsCollection, {
      nombre: userData.nombre,
      whatsapp: userData.whatsapp,
      email: userData.email,
      cedula: userData.cedula,
      createdAt: serverTimestamp(),
      status: "pending", // Estado inicial del ticket
    });

    return {
      success: true,
      message: "¡Registro exitoso! Revisa tu correo pronto.",
      ticketId: docRef.id,
    };
  } catch (error) {
    console.error("Error detallado:", error);
    
    let errorMessage = "Error al guardar los datos. Por favor intenta de nuevo.";
    
    // Mensajes específicos según el tipo de error
    if (error.code === "permission-denied") {
      errorMessage = "No tienes permisos para realizar esta acción. Configura las reglas de Firestore.";
    } else if (error.code === "unavailable") {
      errorMessage = "Servicio no disponible. Verifica tu conexión a internet.";
    } else if (error.message?.includes("Firebase")) {
      errorMessage = "Error de configuración de Firebase. Verifica las credenciales.";
    }
    
    return {
      success: false,
      message: errorMessage,
      error: error.message,
      code: error.code,
    };
  }
};
