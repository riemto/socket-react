const express = require('express')
const app = express();
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", socket => {
    console.log(`User connected: ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on("send_message", (data) => {
        // send it to everyone in that room
        io.to(data.room).emit("receive_message", data)
        // broadcase in that room (all except own)
        // socket.to(data.room).emit("receive_message", data)
    })
})

server.listen(3001, () => {
    console.log("SERVER IS RUNNING ON 3001");
})