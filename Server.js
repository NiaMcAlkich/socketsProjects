import { Server as SocketServer } from "socket.io";

let clickCount = 0

const io = new SocketServer(3000, {
    //options
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});

io.on("connection", (socket) => {
  
  //create payload
  const payload = {
    totalClicks: clickCount
  }

  //payload as string
  const payloadAsString = JSON.stringify(payload)

  //log and send initial data to socket
  console.log("connection")
  socket.emit("connectComplete", payloadAsString)

  socket.on("click", () => {

    //update click counter
    clickCount += 1

    //create payload
    const payload = {
      totalClicks: clickCount,
      whoClicked: socket.id
    }

    //payload as string
    const payloadAsString = JSON.stringify(payload)

    //log and broadcast
    console.log("click", payloadAsString)
    io.emit("someoneClicked", payloadAsString)
  });

  socket.on("resetClicks", () => {

    //reset click counter
    clickCount = 0

    //create payload
    const payload = {
      totalClicks: clickCount,
      whoClicked: socket.id
    }

    //payload as string
    const payloadAsString = JSON.stringify(payload)

    //log and broadcast
    console.log("resetClicks", payloadAsString)
    io.emit("someoneResetClicks", payloadAsString)
  });

});

