import './App.css';
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001")

function App() {
  const sendMessage = () => {

  }

  return (
    <div className="App">
      <input placeholder='message' />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
