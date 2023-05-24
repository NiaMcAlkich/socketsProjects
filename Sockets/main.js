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

    <h1>Please input your name below: </h1>
    <input type="text" id="name" name="name">
    <button id="getName" type="button">Enter</button>

    <div class="card">
      <button id="counter" type="button">Click</button>
      <button id="reset" type="button">Reset</button>
      <div id="totalClicks">TotalClicks: </div>
      <div id="whoClicked">WhoClicked: </div> 
      <div id="resetClicks">Reset: </div>
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

document.getElementById("getName").addEventListener("click", () => {
  let name = document.getElementById('name').value;

  socket.emit("getName", name)
});

socket.on("someoneClicked", (payloadAsString) => {
  let jsonData = JSON.parse(payloadAsString)

  let totalClicks = jsonData.totalClicks;
  let whoClicked = jsonData.name;

  document.getElementById('whoClicked').innerHTML = whoClicked + " clicked the button!";
  document.getElementById('totalClicks').innerHTML = "TotalClicks: " + totalClicks;
});

socket.on("someoneResetClicks", (payloadAsString) => {
  let jsonData = JSON.parse(payloadAsString)

  let totalClicks = jsonData.totalClicks;
  let whoClicked = jsonData.name;

  document.getElementById('resetClicks').innerHTML = whoClicked + " reset the button!";
  document.getElementById('totalClicks').innerHTML = "TotalClicks: " + totalClicks;
});



  //Test

