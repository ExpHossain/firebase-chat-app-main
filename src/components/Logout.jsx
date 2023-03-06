import React from "react";
import { Button } from "react-bootstrap";
import { auth } from "../services/firebase";

function Logout() {
  return <Button onClick={() => auth.signOut()}>Log Out</Button>;
}

export default Logout;
