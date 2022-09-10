import './App.css';
import io from "socket.io-client"
import { useEffect, useState } from "react"

const socket = io.connect("http://localhost:3001")

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message })
  }

  // the arrow function will run whenever socket change 
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div className="App">
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
