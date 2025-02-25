import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsINr4MAe6ajjpBLJhK-7DI_mt9mhejTs",
  authDomain: "booknook-dc16c.firebaseapp.com",
  projectId: "booknook-dc16c",
  storageBucket: "booknook-dc16c.firebasestorage.app",
  messagingSenderId: "968616278564",
  appId: "1:968616278564:web:0a260ce9ff4640c30ab6b1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();