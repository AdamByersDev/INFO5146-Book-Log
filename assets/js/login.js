import log from 'loglevel';
import { auth } from "./firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

log.setLevel("info");
log.info("Application started");

const email = JSON.parse(localStorage.getItem("email"));

if(email){
  window.location.href = "logs.html";
}

// Login code
const provider = new GoogleAuthProvider();
document.getElementById('login').addEventListener('click', () => {
  signInWithPopup(auth, provider).then((result) => {
    const user = result.user;
    localStorage.setItem("email", JSON.stringify(user.email));
    localStorage.setItem("userID", JSON.stringify(user.uid));
    window.location = "logs.html"
  })
});