import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCKQyfVlz_RG899-z3DnmBXdfe478sG2u0",
    authDomain: "auth-sellacar-dev.firebaseapp.com",
    projectId: "auth-sellacar-dev",
    storageBucket: "auth-sellacar-dev.appspot.com",
    messagingSenderId: "165170528928",
    appId: "1:165170528928:web:6333f133122d69203abfc5"
});

export const auth = app.auth();
export const storageRef = app.storage();

export const carsRef = app.firestore().collection('cars');
export const usersRef = app.firestore().collection('users');
export const usersBlackListRef = app.firestore().collection('usersBlackList');

export const timeRef = firebase.firestore.FieldValue.serverTimestamp();

export default app;