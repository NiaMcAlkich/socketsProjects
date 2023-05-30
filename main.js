//Imports socket io and the css into the project
import { io } from 'socket.io-client';
import './style.css'


//This is to inject the html as app into the index file
//It has multipl wrappers to control where each element sits and make it look nice on screen 
//It also sets up ids to grab the elements by id for the javascript code part
document.querySelector('#app').innerHTML = `
  <div>
    <h1><marquee class="marquee">Please input your name below: </marquee></h1>
    <input class="inputs" type="text" id="friendlyName" name="friendlyName">
    <button class="buttons" id="getfriendlyName" type="button">Enter</button>

    <div class="card">
      <button class="buttons" id="counter" type="button">Click me!</button>
      <button class="buttons" id="reset" type="button">Reset</button>
        <div class="everythingWrapper">
          <div class="namesWrapper">
            <div class="nameBoxWrapper">
              <div class="name"> <h2>Who Clicked: </h2></div>
              <div class="nameBox" id="whoClicked"></div> 
            </div>
            <div class="nameBoxWrapper">
              <div class="name"> <h2>Who Reset: </h2></div>
              <div class="nameBox" id="resetClicks"></div>
            </div>
          </div>
            <div class="scoreWrapper">
              <div class="name"> <span>Final Count: </span></div>
              <div class="scoreBoard" id="totalClicks"></div>
            </div>
        </div>
    </div>
  </div>
`


//Setting up counter and increments on click 
function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = counter
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}


setupCounter(document.querySelector('#totalClicks'))

//Sets up socket io connection with server
const socket = io("ws://localhost:3000")

//Emits a complete connection signal to confirm user is connected
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
  if (jsonData.friendlyName) {
    let friendlyName = jsonData.friendlyName.find(([socketId]) => socketId === whoClicked);
    if (friendlyName) {
      whoClicked = friendlyName[1];
    }
  }

  document.getElementById('whoClicked').innerHTML = whoClicked + " connected!";
  document.getElementById('totalClicks').innerHTML = totalClicks;
});

document.getElementById("getFriendlyName").addEventListener("click", () => {
  let friendlyName = document.getElementById('friendlyName').value;

  socket.emit("getfriendlyName", friendlyName)
});

socket.on("someoneClicked", (payloadAsString) => {
  let jsonData = JSON.parse(payloadAsString)

  let totalClicks = jsonData.totalClicks;
  let whoClicked = jsonData.whoClicked;

  //using the find function to get the name paired with the users socket id to display
  if (jsonData.friendlyName) {
    let friendlyName = jsonData.friendlyName.find(([socketId]) => socketId === whoClicked);
    if (friendlyName) {
      whoClicked = friendlyName[1];
    }
  }

  document.getElementById('whoClicked').innerHTML = whoClicked;
  document.getElementById('totalClicks').innerHTML = totalClicks;
});

socket.on("someoneResetClicks", (payloadAsString) => {
  let jsonData = JSON.parse(payloadAsString)

  let totalClicks = jsonData.totalClicks;
  let whoClicked = jsonData.whoClicked;

  //using the find function to get the name paired with the users socket id to display
  if (jsonData.friendlyName) {
    let friendlyName = jsonData.friendlyName.find(([socketId]) => socketId === whoClicked);
    if (friendlyName) {
      whoClicked = friendlyName[1];
    }
  }

  document.getElementById('resetClicks').innerHTML = whoClicked;
  document.getElementById('totalClicks').innerHTML = totalClicks;
});


