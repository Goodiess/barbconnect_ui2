import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!form.fullName || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Account created successfully!");
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#4b1e1e] via-[#601c1c] to-[#2f0e0e]">
      {/* Background image */}
      <img
        src="/haircuts/signUp_image.jpg" // ✅ image in public/haircuts/
        alt="Barber Cutting Hair"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />

      {/* Form Card */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md z-10 relative">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your BarbConnect Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#601c1c] focus:outline-none"
              placeholder="Jane Doe"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#601c1c] text-white py-2 rounded-md font-semibold hover:bg-[#4b1e1e] transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#601c1c] font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
