import { auth } from "./services/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import Header from "./components/Header";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Header />
      {user ? <ChatRoom user={user} /> : <Login />}
    </div>
  );
}

export default App;
