import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBcRot2ijgcUzODBHfVrlLmZm5S_BjeUvI',
    authDomain: 'nha-xinh.firebaseapp.com',
    projectId: 'nha-xinh',
    storageBucket: 'nha-xinh.firebasestorage.app',
    messagingSenderId: '104478662102',
    appId: '1:104478662102:web:18e319ad2221743d6c5877',
    measurementId: 'G-DHM90C8GBT'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
