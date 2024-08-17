
import {
    auth,
    createUserWithEmailAndPassword,
    db,
    doc,
    setDoc,
  } from "./firebase.js";

  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const signupHandler = async () => {
    try {
      const userObj = {
        fullName: fullname.value,
        email: email.value,
      };
      const userSignup = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      const uid = userSignup.user.uid;

      const response = await setDoc(doc(db, "users", uid), userObj);
      alert("User Signup!");
      location.href = "../pages/login.html";
    } catch (error) {
      alert(error.message);
    }
  };
  
  window.signupHandler = signupHandler;