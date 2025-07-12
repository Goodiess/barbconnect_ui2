import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GiRazor } from "react-icons/gi";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "20px", background: "#4b1e1e", color: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Brand: BarbConnect + Razor */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          BarbConnect
          <GiRazor size={50} />
        </Link>

        {/* Navigation Links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
              <Link to="/find-barbers" style={{ color: "white" }}>Find Barbers</Link>
              <button
                onClick={logout}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
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
