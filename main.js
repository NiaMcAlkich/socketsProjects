//Imports socket io and the css into the project
import { io } from 'socket.io-client';
import './style.css'
import 'animate.css'


document.addEventListener("DOMContentLoaded", function() {

  //This is to inject the html as app into the index file
  //It has multipl wrappers to control where each element sits and make it look nice on screen 
  //It also sets up ids to grab the elements by id for the javascript code part
  //The marquee tells you to input a name in the box then when you hit enter that name is then 
  //sent over to the server as your friendly name 
  //if you click the click me! button it tells you in the who clicked box 
  //if you click reset it will tell you who reset the button in the who reset box 
  //it will also update the final count box to show the current count 
  document.querySelector('#app').innerHTML = `
    <div>
      <h1><marquee class="marquee">Please input your name below: </marquee></h1>
      <input class="inputs" type="text" id="friendlyName" name="friendlyName">
      <button class="enterButton" id="getFriendlyName" type="button">Enter</button>

      <div class="card">
          <div class="everythingWrapper">
          <div class="buttonWrap">
          <button class="buttons" id="counter" type="button">Click me!</button>
          <button class="buttons" id="reset" type="button">Reset</button>
          </div>
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
              <div class="scoreWrapper" id="finalCountBox">
                <div class="name"> <h2>Final Count: </h2></div>
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
      element.innerHTML = "Click Me!"
    }
    element.addEventListener('click', () => setCounter(counter + 1))
    setCounter(0)
  }


  setupCounter(document.querySelector('#counter'))

  //Sets up socket io connection with server
  const socket = io("ws://localhost:3000")

  //Emits a complete connection signal to confirm user is connected
  socket.emit("connectComplete")

//This grabs the html element counter
//then adds an event click listener 
//when someone clicks the button it will emit the click to the server
  document.getElementById("counter").addEventListener("click", () => {
    socket.emit("click")
  });

  //This grabs the html reset element
  //and adds a listener to it 
  //then emits the reset click to the server
  document.getElementById("reset").addEventListener("click", () => {
    socket.emit("resetClicks")
  });

  //This will send out the payload when someone connects and parses the data 
  //then gets the total clicks and who clicked to update the html accordingly
  socket.on("connection", (payloadAsString) => {
    let jsonData = JSON.parse(payloadAsString);

    let totalClicks = jsonData.totalClicks;
    let whoClicked = jsonData.whoClicked ?? socket.id;

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

  //This is where when someone clicks enter the client side will grab the value they enter in the box
  //and it will set the friendlyName variable equal to the value and emit that back to the server
  document.getElementById("getFriendlyName").addEventListener("click", () => {
    let friendlyName = document.getElementById('friendlyName').value;

    socket.emit("getFriendlyName", friendlyName)
    document.getElementById('getFriendlyName').classList = "enterButton animate__animated animate__rubberBand";
    document.getElementById('friendlyName').classList = "inputs animate__animated animate__flash";
  });

  //This listens for the server to say someone clicked the button
  //it will parse the payload sent and pull out the friendly name and total clicks
  //it then updates html accordingly 
  socket.on("someoneClicked", (payloadAsString) => {
    let jsonData = JSON.parse(payloadAsString)

    let totalClicks = jsonData.totalClicks;
    let whoClicked = jsonData.whoClicked ?? socket.id;

    //using the find function to get the name paired with the users socket id to display
    if (jsonData.friendlyName) {
      let friendlyName = jsonData.friendlyName.find(([socketId]) => socketId === whoClicked);
      if (friendlyName) {
        whoClicked = friendlyName[1];
      }
    }

    document.getElementById('counter').classList = "buttons animate__animated animate__rubberBand";
    document.getElementById('whoClicked').innerHTML = whoClicked;
    document.getElementById('whoClicked').classList = "nameBox animate__animated animate__heartBeat";
    //Trying to get this to flip the box every time someone clicks for some reason only flips once
    document.getElementById('totalClicks').classList = "scoreBoard animate__animated animate__flipInX";
    document.getElementById('totalClicks').innerHTML = totalClicks;
  });

  //This listens for the server to say the reset button was clicked 
  //and grabs the payload data to update the html with just like the someone clicked signal
  socket.on("someoneResetClicks", (payloadAsString) => {
    let jsonData = JSON.parse(payloadAsString)

    let totalClicks = jsonData.totalClicks;
    let whoClicked = jsonData.whoClicked ?? socket.id;

    //using the find function to get the name paired with the users socket id to display
    if (jsonData.friendlyName) {
      let friendlyName = jsonData.friendlyName.find(([socketId]) => socketId === whoClicked);
      if (friendlyName) {
        whoClicked = friendlyName[1];
      }
    }

    document.getElementById('reset').classList = "buttons animate__animated animate__rubberBand";
    document.getElementById('resetClicks').innerHTML = whoClicked;
    document.getElementById('resetClicks').classList = "nameBox animate__animated animate__heartBeat";
    //Trying to get this to flip the box every time someone clicks for some reason only flips once
    document.getElementById('totalClicks').classList = "scoreBoard animate__animated animate__wobble";
    document.getElementById('totalClicks').innerHTML = totalClicks;
  });

})


