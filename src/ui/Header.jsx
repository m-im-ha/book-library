import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-between bg-yellow-300">
      <Link to="/">Book Vibe</Link>
      <div className="flex gap-4">
        <NavLink>Home</NavLink>
        <NavLink to="/listedbooks">Listed Books</NavLink>
        <NavLink to="/pagestoread">Pages to read</NavLink>
      </div>
      <div className="flex gap-4">
        <button>Sign In</button>
        <button>Sign Up</button>
      </div>
    </div>
  );
}

export default Header;
