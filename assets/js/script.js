import log from 'loglevel';

log.setLevel("info");
log.info("Application started");

const email = JSON.parse(localStorage.getItem("email"));

if(!email){
  window.location.href = "/";
}

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem("email");
  window.location.href = "/"
});