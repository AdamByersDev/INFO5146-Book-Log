let e,t,n,r;function a(e){return e&&e.__esModule?e.default:e}var l=globalThis,i={},o={},d=l.parcelRequire94c2;null==d&&((d=function(e){if(e in i)return i[e].exports;if(e in o){var t=o[e];delete o[e];var n={id:e,exports:{}};return i[e]=n,t.call(n.exports,n,n.exports),n.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){o[e]=t},l.parcelRequire94c2=d),d.register;var u=d("lR3v8"),c=d("47Mwn"),h=d("9HrqM");a(u).setLevel("info"),a(u).info("Application started");let p=[],g=[];const s=JSON.parse(localStorage.getItem("email")),m=JSON.parse(localStorage.getItem("userID"));async function E(){let e=(0,h.query)((0,h.collection)(c.db,"logs",m,"logs"),(0,h.orderBy)("addTime","desc"));return await (0,h.getDocs)(e)}async function v(){r||(r=[],(await E()).docs.forEach(e=>{let t=e.data();r.push({id:e.id,data:{title:t.title,author:t.author,genre:t.genre,rating:parseInt(t.rating),thoughts:t.thoughts}})})),e.innerHTML="",r.forEach(e=>{let r=e.data;(function(e){if(!p.includes(e)){p.push(e),p.sort(),t.innerHTML="";let n=document.createElement("option");n.value="",n.innerText="Author",t.appendChild(n),p.forEach(e=>{let n=document.createElement("option");n.value=e,n.innerText=e,t.appendChild(n)})}})(r.author),function(e){if(!g.includes(e)){g.push(e),g.sort(),n.innerHTML="";let t=document.createElement("option");t.value="",t.innerText="Genre",n.appendChild(t),g.forEach(e=>{let t=document.createElement("option");t.value=e,t.innerText=e,n.appendChild(t)})}}(r.genre),0==t.value.length&&0==n.value.length?f(e.id,r.title,r.author,r.genre,r.rating,r.thoughts):0==t.value&&n.value==r.genre?f(e.id,r.title,r.author,r.genre,r.rating,r.thoughts):t.value==r.author&&0==n.value?f(e.id,r.title,r.author,r.genre,r.rating,r.thoughts):t.value==r.author&&n.value==r.genre&&f(e.id,r.title,r.author,r.genre,r.rating,r.thoughts)})}function f(t,n,r,a,l,i,o=!1){let d=document.createElement("h3");d.innerText=n;let u=document.createElement("p"),c="";for(let e=1;e<=l;e++)c+="★";u.innerText=c.padEnd(5,"☆"),u.ariaLabel=`Rated ${l} of 5`;let h=document.createElement("p");h.innerText=r,h.ariaLabel=`By ${r}`;let p=document.createElement("p");p.innerText=a,p.ariaLabel=`Genre ${a}`;let g=document.createElement("div");g.appendChild(d),g.appendChild(u),g.appendChild(h),g.appendChild(p);let s=document.createElement("p");s.innerText=i;let m=document.createElement("li");m.appendChild(g),m.appendChild(s),o?e.prepend(m):e.appendChild(m)}s||(window.location.href="index.html"),window.addEventListener("load",()=>{document.getElementById("logout").addEventListener("click",()=>{localStorage.removeItem("email"),window.location.href="index.html"}),e=document.getElementById("logList"),(t=document.getElementById("authorFilter")).addEventListener("change",()=>{v()}),(n=document.getElementById("genreFilter")).addEventListener("change",()=>{v()}),v()});
//# sourceMappingURL=logs.054d499e.js.map
