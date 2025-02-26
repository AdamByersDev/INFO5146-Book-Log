import log from 'loglevel';
import { db } from './firebase';
import { addDoc, collection, getDocs, orderBy, query, Timestamp } from '@firebase/firestore';

log.setLevel("info");
log.info("Application started");

let logList;
let authorFilter;
let genreFilter;
let addBookSection;
let addBook;

let logs;
let authors = [];
let genres = [];

const email = JSON.parse(localStorage.getItem("email"));
const userId = JSON.parse(localStorage.getItem("userID"));

if(!email){
  window.location.href = "index.html";
}

async function getLogsFromFirestore() {
  let q = query(collection(db, "logs", userId, "logs"), orderBy("addTime", "desc"));
  return await getDocs(q);
}

async function addLogToFirestore(title, author, genre, rating, thoughts) {
  let newLog = await addDoc(collection(db, "logs", userId, "logs"), {
    title: title,
    author: author,
    genre: genre,
    rating: rating,
    thoughts: thoughts,
    addTime: Timestamp.now()
  });
  return newLog.id;
}

async function renderLogs() {
  if (!logs) {
    logs = [];
    let dbData = await getLogsFromFirestore();
    dbData.docs.forEach(book => {
      let data = book.data();
      logs.push({
        id: book.id,
        data: {
          title: data.title,
          author: data.author,
          genre: data.genre,
          rating: parseInt(data.rating),
          thoughts: data.thoughts
        }
      })
    })
  }
  logList.innerHTML = "";
  logs.forEach(book => {
    let data = book.data;
    updateAuthorFilter(data.author);
    updateGenreFilter(data.genre);
    if (authorFilter.value.length == 0 && genreFilter.value.length == 0) {
      createBookItem(book.id, data.title, data.author, data.genre, data.rating, data.thoughts);
    } else if (authorFilter.value == 0 && genreFilter.value == data.genre) {
      createBookItem(book.id, data.title, data.author, data.genre, data.rating, data.thoughts);
    } else if (authorFilter.value == data.author && genreFilter.value == 0) {
      createBookItem(book.id, data.title, data.author, data.genre, data.rating, data.thoughts);
    } else if (authorFilter.value == data.author && genreFilter.value == data.genre) {
      createBookItem(book.id, data.title, data.author, data.genre, data.rating, data.thoughts);
    }
  });
}

function updateAuthorFilter(newAuthor) {
  if (!authors.includes(newAuthor)) {
    authors.push(newAuthor);
    authors.sort();
    
    authorFilter.innerHTML = "";
    let unselectedFilter = document.createElement('option');
    unselectedFilter.value = '';
    unselectedFilter.innerText = "Author"
    authorFilter.appendChild(unselectedFilter);
    authors.forEach((author) => {
      let filter = document.createElement('option');
      filter.value = author;
      filter.innerText = author
      authorFilter.appendChild(filter);
    });
  }
}

function updateGenreFilter(newGenre) {
  if (!genres.includes(newGenre)) {
    genres.push(newGenre);
    genres.sort();

    genreFilter.innerHTML = "";
    let unselectedFilter = document.createElement('option');
    unselectedFilter.value = '';
    unselectedFilter.innerText = "Genre"
    genreFilter.appendChild(unselectedFilter);
    genres.forEach((genre) => {
      let filter = document.createElement('option');
      filter.value = genre;
      filter.innerText = genre
      genreFilter.appendChild(filter);
    });
  }
}

function createBookItem(id, title, author, genre, rating, thoughts, newLog = false) {
  let itemTitle = document.createElement('h3');
  itemTitle.innerText = title;

  let itemRating = document.createElement('p');
  let ratingText = "";
  for (let i = 1; i <= rating; i++) {
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

  if (newLog) {
    logList.prepend(listItem);
  } else {
    logList.appendChild(listItem);
  }
}

function sanitizeInput(input) {
  const replacements = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '/': '&#x2F;'
  };
  
  return input.replace(/[<>"'&/]/g, c => replacements[c]);
}

async function addNewBook(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let values = Object.fromEntries(formData.entries());
  let title = sanitizeInput(values.title.trim());
  let author = sanitizeInput(values.author.trim());
  let genre = sanitizeInput(values.genre.trim());
  let rating = parseInt(values.rating);
  let thoughts = sanitizeInput(values.thoughts.trim());

  let error = false;

  if (title.length < 1) {
    error = true;
  } else if (author.length < 1) {
    error = true;
  } else if (genre.length < 1) {
    error = true;
  } else if (thoughts.length < 1) {
    error = true;
  }

  if (error) {
    alert('You must fill in all fields.');
    return;
  }
  addBookSection.style.display = 'none';
  addBook.reset();
  let id = await addLogToFirestore(title, author, genre, rating, thoughts);
  logs.push({
    id: id,
    data: {
      title: title,
      author: author,
      genre: genre,
      rating: parseInt(rating),
      thoughts: thoughts
    }
  });

  createBookItem(id, title, author, genre, rating, thoughts, true);
}

window.addEventListener('load', () => {
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem("email");
    window.location.href = "index.html"
  });

  logList = document.getElementById('logList');

  authorFilter = document.getElementById('authorFilter');
  authorFilter.addEventListener('change', () => {
    renderLogs();
  });
  genreFilter = document.getElementById('genreFilter')
  genreFilter.addEventListener('change', () => {
    renderLogs();
  });

  document.getElementById('add').addEventListener('click', () => {
    addBookSection.style.display = 'block';
  });
  document.getElementById('closeAdd').addEventListener('click', () => {
    addBookSection.style.display = 'none';
    addBook.reset();
  })
  addBookSection = document.getElementById('addBookSection');
  addBook = document.getElementById('addBook');
  addBook.addEventListener('submit', addNewBook)

  renderLogs();
});

/* async function test() {
  let j = await getLogsFromFirestore();
  j.docs.forEach(l => {
    console.log(l.id, l.data());
  })
}
test(); */