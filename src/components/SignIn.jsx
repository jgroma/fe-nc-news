import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";

export default function SignIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { setSignedInUser } = useContext(UserContext);
  const defaultUser = {
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  };

  function handleSignIn() {
    if (isSignedIn === false) {
      setSignedInUser(defaultUser);
      setIsSignedIn(true);
    } else {
      setSignedInUser({});
      setIsSignedIn(false);
    }
  }
  return (
    <main>
      <img className="SignIn__avatar-img" src={defaultUser.avatar_url} />
      <p>Username: {defaultUser.username}</p>
      <button onClick={handleSignIn}>
        {isSignedIn ? "Sign in" : "Sign out"}
      </button>
    </main>
  );
}
