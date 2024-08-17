


window.addEventListener("load", () => {
    if (localStorage.getItem("users")) {
      window.location.replace("../index.html");
    }
  });

import {
    auth,
    createUserWithEmailAndPassword,
    db,
    doc,
    setDoc,
    signInWithEmailAndPassword,
  } from "./firebase.js";
  
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  console.log("email , password")
  const loginHandler = async () => {
    try {
      const userSignup = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const uid = userSignup.user.uid;


      localStorage.setItem("uid", uid);
      alert("User Login Successfully!");
      location.href = "../index.html";

    } catch (error) {
      alert(error.message);
    }
  };
  
  window.loginHandler = loginHandler;