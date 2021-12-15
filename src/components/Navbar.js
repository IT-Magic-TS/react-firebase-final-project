import { Link } from "react-router-dom";
import "./Navbar.css";
import Temple from "../assets/temple.svg";
import { useLogout } from "../hooks/useLogout";
import { useAuthcontext } from "../hooks/useAuthContext";

export default function Navbar() {
  const { user } = useAuthcontext();
  const { logout } = useLogout();
  return (
    <div className="w3-container w3-sand w3-padding navbar">
      <ul>
        <li className="logo">
          <Link className="w3-btn" to="/">
            <img src={Temple} alt="magic logo" />
            The Dojo
          </Link>
        </li>
        {!user && (
          <>
            <li>
              <Link
                className="w3-btn w3-yellow"
                style={{ marginRight: "5px" }}
                to="/login"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                className="w3-btn w3-yellow"
                style={{ marginRight: "5px" }}
                to="/signup"
              >
                Signup
              </Link>
            </li>
          </>
        )}
        {user && (
          <li>
            <button onClick={logout} className="w3-btn w3-red">
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
