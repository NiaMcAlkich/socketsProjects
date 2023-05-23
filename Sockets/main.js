import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';
import { io } from 'socket.io-client';

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button">Click</button>
      <button id="reset" type="button">Reset</button>
      <div id="totalClicks"> </div>
      <div id="whoClicked"> </div> 
      <div id="resetClicks"> </div>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))


const socket = io("ws://localhost:3000")

socket.emit("connection")

document.getElementById("counter").addEventListener("click", () => {
  socket.emit("click")
});

document.getElementById("reset").addEventListener("click", () => {
  socket.emit("resetClicks")
});

socket.on("someoneClicked", () => {
  let jsonData = JSON.parse()

  let totalClicks = jsonData.totalClicks;
  let whoClicked = jsonData.whoClicked;

  document.getElementById('resetClicks').innerHTML = whoClicked + " clicked the button!";
  document.getElementById('totalClicks').innerHTML = totalClicks;
});

socket.on("someoneResetClicks", () => {
  let jsonData = JSON.parse()

  let totalClicks = jsonData.totalClicks;
  let whoClicked = jsonData.whoClicked;

  document.getElementById('resetClicks').innerHTML = whoClicked + " reset the button!";
  document.getElementById('totalClicks').innerHTML = totalClicks;
});


  //Test

