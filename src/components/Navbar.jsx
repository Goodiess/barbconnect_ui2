import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GiRazor } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#4b1e1e] text-white shadow-md px-6 py-4 ">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          BarbConnect <GiRazor size={30} />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/find-barbers">Find Barbers</Link>
              <button onClick={logout} className="hover:underline">Logout</button>
            </>
         ) : (
  <>
  <a href="#barbershops" className="hover:underline">Barbershops</a>
  <a href="#location" className="hover:underline">Location</a>
</>

)}
        </div>

        {/* Hamburger (Mobile Only) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-center">
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <Link to="/find-barbers" onClick={() => setIsOpen(false)}>Find Barbers</Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
         <>
  <a href="#features" className="hover:underline">Features</a>
  <a href="#location" className="hover:underline">Location</a>
</>
          )}
        </div>
      )}
    </nav>
  );
}
