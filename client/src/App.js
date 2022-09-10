import './App.css';
import io from "socket.io-client"
import { useEffect } from "react"

const socket = io.connect("http://localhost:3001")

function App() {
  const sendMessage = () => {
    socket.emit("send_message", { message: "hello" })
  }

  // the arrow function will run whenever socket change 
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message)
    })
  }, [socket])

  return (
    <div className="App">
      <input placeholder='message' />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
