import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Message from "./components/Message";

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/messages");
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/submit", {
        message,
      });
      if (response.status === 201) {
        setMessage("");
        fetchData();
      } else {
        console.log("Error submitting message");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  };

  return (
    <div>
      <h1>mini-message-board</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        {messages.map((messageObj) => (
          <Message
            key={messageObj._id}
            messageObj={messageObj}
            fetchData={fetchData}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
