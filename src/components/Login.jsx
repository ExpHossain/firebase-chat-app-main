import React from "react";
import { auth, signInWithGoogle } from "../services/firebase";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

function Login() {
  return (
    <Container>
      <div
        style={{
          height: "100vh",
          display: "flex",
          marginTop: "auto",
          alignItems: 'center',
          justifyContent: "center",
        }}
      >
        <div>
          <Button
            as="button"
            variant="outline-primary"
            onClick={signInWithGoogle}
          >
            Sign In
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Login;
