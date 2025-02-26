import log from 'loglevel';
import { db } from './firebase';
import { addDoc, collection, doc, getDocs, getDoc, orderBy, query, Timestamp, updateDoc } from '@firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';

log.setLevel("info");
log.info("Application started");

let logList;
let authorFilter;
let genreFilter;
let addBookSection;
let addBook;
let editBookSection;
let editBook;
let editTitle;
let editAuthor;
let editGenre;
let editRating;
let editThoughts;
let editId;
let chatButton;
let chatBox;
let chatMessages;
let messageForm;

let logs;
let authors = [];
let genres = [];
let chatOpen = false;
let model;

const email = JSON.parse(localStorage.getItem("email"));
const userId = JSON.parse(localStorage.getItem("userID"));

if(!email){
  window.location.href = "index.html";
}

async function getApiKey() {
  let snapshot = await getDoc(doc(db, "apikey", "googlegenai"));
  let apiKey =  snapshot.data().key;
  let genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

async function askChatBot(request) {
  return await model.generateContent(request);
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
    addTime: Timestamp.now(),
    deleted: false
  });
  return newLog.id;
}

async function removeLog(id) {
  updateDoc(doc(db, "logs", userId, "logs", id), {
    deleted: true
  });
  document.getElementById(`id_${id}`).remove()
};

async function renderLogs() {
  if (!logs) {
    logs = [];
    let dbData = await getLogsFromFirestore();
    dbData.docs.forEach(book => {
      let data = book.data();
      if (!data.deleted) {
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
      }
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
    unselectedFilter.innerText = "No Author Filter"
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
    unselectedFilter.innerText = "No Genre Filter"
    genreFilter.appendChild(unselectedFilter);
    genres.forEach((genre) => {
      let filter = document.createElement('option');
      filter.value = genre;
      filter.innerText = genre
      genreFilter.appendChild(filter);
    });
  }
}

function createBookItem(id, title, author, genre, rating, thoughts, newLog = false, oldElement = false) {
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

  let deleteItem = document.createElement('button');
  deleteItem.type = "button";
  deleteItem.innerText = "Delete";
  deleteItem.addEventListener('click', () => {
    if (confirm(`Are you sure you want to delete ${title}.`)) {
      removeLog(id);
    }
  })
  let editItem = document.createElement('button');
  editItem.type = "button";
  editItem.innerText = "Edit";
  editItem.addEventListener('click', () => {
    editBookSection.style.display = 'block';
    editTitle.value = title;
    editAuthor.value = author;
    editGenre.value = genre;
    editRating.value = `${rating}`;
    editThoughts.value = thoughts;
    editId.value = id;
  });
  let itemButtons = document.createElement('div');
  itemButtons.append(deleteItem);
  itemButtons.append(editItem);

  let listItem = document.createElement('li');
  listItem.id = `id_${id}`;
  listItem.appendChild(itemData);
  listItem.appendChild(itemThoughts);
  listItem.appendChild(itemButtons);

  if (newLog) {
    logList.prepend(listItem);
  } else if (oldElement) {
    oldElement.after(listItem);
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
  }

  if (error) {
    alert('You must fill in all fields.');
    return;
  }
  addBookSection.style.display = 'none';
  addBook.reset();
  updateGenreFilter(genre);
  updateAuthorFilter(author);
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

function editExistingBook(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let values = Object.fromEntries(formData.entries());
  let id = values.id;
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
  }

  if (error) {
    alert('You must fill in all fields.');
    return;
  }

  updateDoc(doc(db, "logs", userId, "logs", id), {
    title: title,
    author: author,
    genre: genre,
    rating: rating,
    thoughts: thoughts
  });

  logs.find(log => log.id == id).data = {
    title: title,
    author: author,
    genre: genre,
    rating: rating,
    thoughts: thoughts
  };

  updateGenreFilter(genre);
  updateAuthorFilter(author);
  let logItem = document.getElementById(`id_${id}`);
  logItem.id = "tempId";
  createBookItem(id, title, author, genre, rating, thoughts, false, logItem);
  editBookSection.style.display = "none";
  logs.fin
  logItem.remove();
}

async function newChatMessage(e) {
  e.preventDefault();
  let formData = new FormData(e.target);
  let message = Object.fromEntries(formData.entries()).message.trim();
  if (!(message.length > 0)) {
    return;
  }
  
  let userMessage = document.createElement('p');
  userMessage.innerText = sanitizeInput(message);
  userMessage.classList.add('userMessage');
  chatMessages.appendChild(userMessage);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  messageForm.reset();

  let aiResponse = "";

  if (message.toLowerCase().startsWith('add ')) {
    aiResponse = 'Honestly, asking an AI to add a book to a list instead of entering it yourself is unnecesary. Please press "Add" at the top of the screen to add a new book log.';
  } else if (message.toLowerCase().startsWith('delete ')) {
    aiResponse = 'Honestly, asking an AI to delete a book from a list instead of deleting it yourself is unnecesary. Please press "Delete" on the entry you wish to delete.';
  } else if (message.toLowerCase().startsWith('update ') || message.toLowerCase().startsWith('edit ')) {
    aiResponse = 'Honestly, asking an AI to edit a book in a list instead of editing it yourself is unnecesary. Please press "Edit" on the entry you want to edit.';
  } else if (message.toLowerCase().startsWith('logout') || message.toLowerCase().startsWith('sign out')) {
    aiResponse = 'Ok. Goodbye.';
    localStorage.removeItem("email");
    window.location.href = "index.html"
  } else {
    let response = await askChatBot(message);
    aiResponse = response.response.candidates[0].content.parts[0].text;
  }

  let aiMessage = document.createElement('p');
  aiMessage.innerHTML = sanitizeInput(aiResponse);
  aiMessage.classList.add('aiMessage');
  chatMessages.appendChild(aiMessage);
  chatMessages.scrollTop = chatMessages.scrollHeight;
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


  editBookSection = document.getElementById('editBookSection');
  editBook = document.getElementById('editBook');
  editBook.addEventListener('submit', editExistingBook)
  editTitle = document.getElementById('editTitle');
  editAuthor = document.getElementById('editAuthor');
  editGenre = document.getElementById('editGenre');
  editRating = document.getElementById('editRating');
  editThoughts = document.getElementById('editThoughts');
  editId = document.getElementById('editId');
  document.getElementById('closeEdit').addEventListener('click', () => {
    editBookSection.style.display = 'none';
    editBook.reset();
  })


  chatButton = document.getElementById('chatButton');
  chatButton.addEventListener('click', () => {
    if (chatOpen) {
      chatOpen = false;
      chatButton.innerText = "Open Chat";
      chatBox.style.display = "";
    } else {
      chatOpen = true;
      chatButton.innerText = "Close Chat";
      chatBox.style.display = "flex";
    }
  });
  chatBox = document.getElementById('chatBox');
  chatMessages = document.getElementById('chatMessages');
  messageForm = document.getElementById('messageForm');
  messageForm.addEventListener('submit', newChatMessage);

  getApiKey();
  renderLogs();
});

/* async function test() {
  let j = await getLogsFromFirestore();
  j.docs.forEach(l => {
    console.log(l.id, l.data());
  })
}
test(); */