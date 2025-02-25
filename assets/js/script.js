import log from 'loglevel';
import { db } from './firebase';
import { /* addDoc, */ collection, getDocs, orderBy, query/* , Timestamp */ } from '@firebase/firestore';

log.setLevel("info");
log.info("Application started");

let logList;
let logs;

const email = JSON.parse(localStorage.getItem("email"));
const userId = JSON.parse(localStorage.getItem("userID"));

if(!email){
  window.location.href = "index.html";
}

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

async function renderLogs() {
  logs = logs || await getLogsFromFirestore();
  logList.innerHTML = "";
  
  logs.docs.forEach(book => {
    let data = book.data();
    createBookItem(book.id, data.title, data.author, data.genre, data.rating, data.thoughts);
  });
}

function createBookItem(id, title, author, genre, rating, thoughts) {
  let itemTitle = document.createElement('h3');
  itemTitle.innerText = title;

  let itemRating = document.createElement('p');
  let ratingText = "";
  for (i = 1; i <= rating; i++) {
    ratingText += "★";
  }
  itemRating.innerText = ratingText.padEnd(5, '☆');
  itemRating.ariaLabel = `Rated ${rating} of 5`;

  let itemAuthor = document.createElement('p');
  itemAuthor.innerText = author;
  itemAuthor.ariaLabel = `By ${author}`

  let itemGenre = document.createElement('p')
  itemGenre.innerText = genre;
  itemGenre.ariaLabel = `Genre ${genre}`

  let itemData = document.createElement('div');
  itemData.appendChild(itemTitle);
  itemData.appendChild(itemRating);
  itemData.appendChild(itemAuthor);
  itemData.appendChild(itemGenre);

  let itemThoughts = document.createElement('p');
  itemThoughts.innerText = thoughts;

  let listItem = document.createElement('li');
  listItem.appendChild(itemData);
  listItem.appendChild(itemThoughts);

  logList.appendChild(listItem);
}

window.addEventListener('load', () => {
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem("email");
    window.location.href = "index.html"
  });
  logList = document.getElementById('logList');
  renderLogs();
});

/* async function test() {
  let j = await getLogsFromFirestore();
  j.docs.forEach(l => {
    console.log(l.id, l.data());
  })
}
test(); */