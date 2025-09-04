import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Enter a valid email.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("barbUser", JSON.stringify({ email: form.email }));
      alert("Login successful!");
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#4b1e1e] via-[#601c1c] to-[#2f0e0e]">

      {/* Background Image */}
      <img
        src="/haircuts/login_image.jpg"
        alt="Barber Cutting Hair"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />

      {/* Login Form */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md z-10 relative">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to BarbConnect</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#601c1c] focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#601c1c] focus:outline-none"
              placeholder="********"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#601c1c] text-white py-2 rounded-md font-semibold hover:bg-[#4b1e1e] transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#601c1c] font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
