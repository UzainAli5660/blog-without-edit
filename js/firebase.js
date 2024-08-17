
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
  
import{ getFirestore, doc ,setDoc , getDocs , addDoc , collection , updateDoc,
  deleteDoc,
  getDoc } from  "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import{      getDownloadURL,
    ref,
getStorage,
    uploadBytesResumable, } from  "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import{  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
      } from  "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyA0WT4ZNfBjgVP3K9FGe8OdfnVsM2Fv9XA",
    authDomain: "login-signup-practice-32a3f.firebaseapp.com",
    projectId: "login-signup-practice-32a3f",
    storageBucket: "login-signup-practice-32a3f.appspot.com",
    messagingSenderId: "1043618109644",
    appId: "1:1043618109644:web:39e25104622c8ec0c48a69"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

export{
    app,
    db, 
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setDoc,
    doc,
    getDocs,
    addDoc,
    getDownloadURL,
    ref,
    storage,
    uploadBytesResumable,
    getStorage,
collection,
updateDoc,
    deleteDoc,
    getDoc
}