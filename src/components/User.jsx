import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function User() {
  const { signedInUser } = useContext(UserContext);

  return (
    <div className="User">
      <span>{signedInUser.username}</span>
      <img src={signedInUser.avatar_url} alt="user avatar image" />
    </div>
  );
}
