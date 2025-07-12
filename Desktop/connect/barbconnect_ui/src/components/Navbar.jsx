import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#245", color: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
          BarbConnect
        </Link>

        <div style={{ display: "flex", gap: "1rem" }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
              <Link to="/find-barbers" style={{ color: "white" }}>Find Barbers</Link>
              <button onClick={logout} style={{ background: "transparent", border: "none", color: "white", cursor: "pointer" }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: "white" }}>Login</Link>
              <Link to="/register" style={{ color: "white" }}>SignUp</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
