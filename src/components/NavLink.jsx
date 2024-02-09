import { Link } from "react-router-dom";
export default function NavLink({ linkDestination, linkName }) {
  return (
    //<li>
    <Link to={`/${linkDestination}`}>{linkName}</Link>
    //</li>
  );
}
