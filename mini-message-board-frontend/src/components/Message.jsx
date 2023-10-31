/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

export default function Message({ messageObj, fetchData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(messageObj.message);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (messageId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/messages/${messageId}`,
        {
          message: newMessage,
        }
      );
      if (response.status === 200) {
        setIsEditing(false);
        fetchData();
      } else {
        console.log("Error saving message");
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleDelete = async (messageId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/messages/${messageId}`
      );
      if (response.status === 204) {
        fetchData();
      } else {
        console.log("Error deleting message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div key={messageObj._id}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <button onClick={() => handleSave(messageObj._id)}>Save</button>
        </div>
      ) : (
        <div>
          <input type="text" value={messageObj.message} disabled />
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
      <button onClick={() => handleDelete(messageObj._id)}>Delete</button>
    </div>
  );
}
