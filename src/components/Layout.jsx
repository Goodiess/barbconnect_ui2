// src/components/Layout.jsx
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="max-w-full">{children}</main>
    </div>
  );
}
