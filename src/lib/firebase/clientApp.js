// lib/firebase/clientApp.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Importa la config. Asume que está en lib/config.js
import { firebaseConfig } from "./config"; // Ajusta la ruta si es necesario
import { getStorage } from "firebase/storage";
// --- Inicialización Segura (Evita inicializar múltiples veces) ---
// Comprueba si ya hay apps inicializadas, si no, inicializa una nueva.
// Esto es importante para Next.js donde el código puede re-evaluarse.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// ----------------------------------------------------------------

const auth = getAuth(app);
const db = getFirestore(app); // Inicializa Firestore aquí también
const storage = getStorage(app);

// Exporta todo lo necesario para el cliente desde este archivo
export { app, auth, db, storage };
