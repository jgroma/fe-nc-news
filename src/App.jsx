import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import PageManager from "./components/PageManager";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import User from "./components/User";

function App() {
  const [signedInUser, setSignedInUser] = useState({
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  });

  return (
    <>
      <UserContext.Provider value={{ signedInUser, setSignedInUser }}>
        <Header />
        <Navbar />
        <User />
        <PageManager />
      </UserContext.Provider>
    </>
  );
}

export default App;
