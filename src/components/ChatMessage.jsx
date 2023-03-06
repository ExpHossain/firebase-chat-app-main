import { getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, storage } from "../services/firebase";

const MessageContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em;
  background-color: ${(props) => (props.currentUserMessage ? "green" : "blue")};
  margin: 1em 0 1em ${(props) => (props.currentUserMessage ? "auto" : "0")};
  border-radius: 5px;
`;

const ProfileImage = styled.img`
  max-width: 64px;
`;

const MessageText = styled.p`
  margin-left: 10px;
  font-size: 1.2rem;
`;

function ChatMessage({ message }) {
  const [image, setImage] = useState("");
  const { text, uid, photoURL, userImageURL } = message;

  const currentUserMessage = uid === auth.currentUser.uid;
  const fetchImage = async () => {
    console.log(userImageURL);
    await getDownloadURL(storage.ref(`images/${userImageURL}`))
      .then((url) => setImage(url))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (userImageURL) {
      fetchImage();
    }
  }, []);

  return (
    <MessageContainer currentUserMessage={currentUserMessage}>
      <ProfileImage src={photoURL} referrerPolicy="no-referrer" />
      <MessageText>{text}</MessageText>
      {image.length ? <img src={image} /> : <></>}
    </MessageContainer>
  );
}

export default ChatMessage;
