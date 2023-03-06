import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { auth } from "../services/firebase";
import Logout from "./Logout";

function Header() {
  return (
    <Navbar bg="light" style={{'height': '10vh'}}>
      <Container>
        <Navbar.Brand href="#home">Chat App 🕺</Navbar.Brand>
        {auth.currentUser && <Logout />}
      </Container>
    </Navbar>
  );
}

export default Header;
