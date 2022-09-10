import './App.css';
import io from "socket.io-client"
import { useEffect, useState } from "react"

const socket = io.connect("http://localhost:3001")

function App() {

  // room state
  const [room, setRoom] = useState("");

  // message states
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", { room, message })
  }

  // the arrow function will run whenever socket change 
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div className="App">
      <input placeholder="Room number"
        onChange={(event) => {
          setRoom(event.target.value)
        }} />
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder='message'
        onChange={event => {
          setMessage(event.target.value)
        }} />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message: {messageReceived}</h1>
    </div>
  );
}

export default App;
