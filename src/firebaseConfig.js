import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';



const firebaseConfig = {
    apiKey: "AIzaSyA-7r2rqYS8x3zv2VaLe2EvjF-A9-T9L9g",
    authDomain: "obligatorio2-multimedia.firebaseapp.com",
    databaseURL: "https://obligatorio2-multimedia-default-rtdb.firebaseio.com",
    projectId: "obligatorio2-multimedia",
    storageBucket: "obligatorio2-multimedia.appspot.com",
    messagingSenderId: "158667386398",
    appId: "1:158667386398:web:3a78d94319cecc3ff5c80f"
};



const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);


