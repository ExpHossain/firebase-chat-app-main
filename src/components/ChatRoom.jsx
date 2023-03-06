import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { auth, firestore, storage } from "../services/firebase";
import { uploadBytes } from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "./ChatMessage";
import { Container } from "react-bootstrap";
import { v4 } from "uuid";

function ChatRoom({ user }) {
  // form management
  const [formValue, setFormValue] = useState("");
  const [imageValue, setImageValue] = useState("");
  // fetch messages in firestore collection
  const messagesRef = firestore.collection("messages");
  // create query
  const query = messagesRef.orderBy("createdAt").limit(25);
  // listen to messages received
  const [messages] = useCollectionData(query, { idField: "id" });

  const sendMessage = async () => {
    const { uid, photoURL } = auth.currentUser;

    if(!formValue && !imageValue) return;

    let imagePath = "";

    if (imageValue) {
      // create ref, randomize filename
      const imageRef = storage.ref(`images/${imageValue.name + v4()}`);
      const uploadResult = await uploadBytes(imageRef, imageValue);
      imagePath = uploadResult.metadata.name;
    }

    messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      userImageURL: imagePath || null,
    });

    // reset values
    setFormValue("");
    setImageValue("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", overflow: "auto" }}>
      <Container
        style={{
          height: "80vh",
        }}
      >
        {messages &&
          messages.map((msg, idx) => {
            return <ChatMessage message={msg} key={idx} />;
          })}
      </Container>
      <div
        style={{
          backgroundColor: "#f8f8f8",
          position: "absolute",
          width: "100%",
          bottom: "0px",
        }}
      >
        <div
          style={{
            height: "10vh",
            position: "fixed",
            bottom: 0,
            width: "100%",
            maxWidth: "100%",
            display: "flex",
            fontSize: "1.5rem",
          }}
        >
          <input
            placeholder="Enter a message..."
            style={{ flexGrow: 2, padding: "10px" }}
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            type={"text"}
          />
          <button style={{ flexGrow: 1 }} onClick={(e) => sendMessage()}>
            Send
          </button>
          <input
            style={{ width: "1rem", flexGrow: 1, padding: "10px" }}
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) => setImageValue(e.target.files[0])}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default ChatRoom;
