import log from 'loglevel';
import { db } from './firebase';
import { /* addDoc, */ collection, getDocs, orderBy, query/* , Timestamp */ } from '@firebase/firestore';

log.setLevel("info");
log.info("Application started");

const email = JSON.parse(localStorage.getItem("email"));
const userId = JSON.parse(localStorage.getItem("userID"));

if(!email){
  window.location.href = "index.html";
}

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem("email");
  window.location.href = "index.html"
});

async function getLogsFromFirestore() {
  let q = query(collection(db, "logs", userId, "logs"), orderBy("addTime", "desc"));
  return await getDocs(q);
}

/* async function addLogToFirestore(title, author, genre, rating, thoughts) {
  let newLog = await addDoc(collection(db, "logs", userId, "logs"), {
    title: title,
    author: author,
    genre: genre,
    rating: rating,
    thoughts: thoughts,
    addTime: Timestamp.now()
  });
  return newLog.id;
} */

window.addEventListener('load', () => {

});

async function test() {
  let j = await getLogsFromFirestore();
  j.docs.forEach(l => {
    console.log(l.id, l.data());
  })
}
test();