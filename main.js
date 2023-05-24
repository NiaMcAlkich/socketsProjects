import { setupCounter } from './counter.js';
import { io } from 'socket.io-client';
import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1><marquee class="marquee">Please input your name below: </marquee></h1>
    <input class="inputs" type="text" id="name" name="name">
    <button class="buttons" id="getName" type="button">Enter</button>

    <div class="card">
      <button class="buttons" id="counter" type="button">Click</button>
      <button class="buttons" id="reset" type="button">Reset</button>
      <div class="scoreBoardWrapper">
      <div class="scoreBoard" id="totalClicks">TotalClicks: </div>
      <div class="scoreBoard" id="whoClicked">WhoClicked: </div> 
      <div class="scoreBoard" id="resetClicks">Reset: </div>
      </div>
    </div>
  </div>
`

setupCounter(document.querySelector('#counter'))


const socket = io("ws://localhost:3000")

socket.emit("connectComplete")

document.getElementById("counter").addEventListener("click", () => {
  socket.emit("click")
});

document.getElementById("reset").addEventListener("click", () => {
  socket.emit("resetClicks")
});

socket.on("connection", (payloadAsString) => {
  let jsonData = JSON.parse(payloadAsString);

  let totalClicks = jsonData.totalClicks;
  let whoClicked = jsonData.whoClicked;

  //using the find function to get the name paired with the users socket id to display
  if (jsonData.name) {
    let name = jsonData.name.find(([socketId]) => socketId === whoClicked);
    if (name) {
      whoClicked = name[1];
    }
  }

  document.getElementById('whoClicked').innerHTML = whoClicked + " connected!";
  document.getElementById('totalClicks').innerHTML = "TotalClicks: " + totalClicks;
});

document.getElementById("getName").addEventListener("click", () => {
  let name = document.getElementById('name').value;

  socket.emit("getName", name)
});

socket.on("someoneClicked", (payloadAsString) => {
  let jsonData = JSON.parse(payloadAsString)

  let totalClicks = jsonData.totalClicks;
  let whoClicked = jsonData.whoClicked;

  //using the find function to get the name paired with the users socket id to display
  if (jsonData.name) {
    let name = jsonData.name.find(([socketId]) => socketId === whoClicked);
    if (name) {
      whoClicked = name[1];
    }
  }

  document.getElementById('whoClicked').innerHTML = whoClicked + " clicked the button!";
  document.getElementById('totalClicks').innerHTML = "TotalClicks: " + totalClicks;
});

socket.on("someoneResetClicks", (payloadAsString) => {
  let jsonData = JSON.parse(payloadAsString)

  let totalClicks = jsonData.totalClicks;
  let whoClicked = jsonData.whoClicked;

  //using the find function to get the name paired with the users socket id to display
  if (jsonData.name) {
    let name = jsonData.name.find(([socketId]) => socketId === whoClicked);
    if (name) {
      whoClicked = name[1];
    }
  }

  document.getElementById('resetClicks').innerHTML = whoClicked + " reset the button!";
  document.getElementById('totalClicks').innerHTML = "TotalClicks: " + totalClicks;
});



  //Test
