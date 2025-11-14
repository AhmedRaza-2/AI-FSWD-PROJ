import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBt3oXJuXno2Mf6ebxF1UWphsyKHafPbvk",
  authDomain: "phishindetector-74682.firebaseapp.com",
  projectId: "phishindetector-74682",
  storageBucket: "phishindetector-74682.firebasestorage.app",
  messagingSenderId: "178099829102",
    appId: "1:178099829102:web:ad5d8676b17d1bde36a97f",
  measurementId: "G-D2C8G88C55"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
