import NavLink from "./NavLink";

export default function Navbar() {
  return (
    <nav>
      <NavLink linkDestination="" linkName="All articles" />
      <NavLink
        linkDestination="articles/topics"
        linkName="Search by topics"
      ></NavLink>
    </nav>
  );
}
