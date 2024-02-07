import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import PageManager from "./components/PageManager";
import { useState } from "react";
import UserContext from "./contexts/UserContext";

function App() {
  const [signedInUser, setSignedInUser] = useState("grumpy19");
  return (
    <>
      <UserContext.Provider value={{ signedInUser }}>
        <Header />
        <Navbar />
        <PageManager />
      </UserContext.Provider>
    </>
  );
}

export default App;
