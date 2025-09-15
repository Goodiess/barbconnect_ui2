import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
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
    if (!form.fullName || !form.email || !form.password || !form.role) {
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
      console.log("Registering user. Setting sessionStorage:", {
        isLoggedIn: "true",
        role: form.role,
        barbUser: {
          id: Date.now().toString(),
          name: form.fullName,
          email: form.email,
          role: form.role,
        },
      });
      // Set sessionStorage for immediate login (optional)
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", form.role); // Set role directly
      sessionStorage.setItem(
        "barbUser",
        JSON.stringify({
          id: Date.now().toString(),
          name: form.fullName,
          email: form.email,
          role: form.role,
        })
      );
      alert("Account created successfully!");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-[#4b1e1e] via-[#601c1c] to-[#2f0e0e]">
      {/* Background image */}
      <img
        src="/haircuts/signUp_image.jpg"
        alt="Barber Cutting Hair"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />

      {/* Form Card */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md z-10 relative">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Your BarbConnect Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
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

          {/* Email */}
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

          {/* Password */}
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

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#601c1c] focus:outline-none"
            >
              <option value="">Select Role</option>
              <option value="client">Client</option>
              <option value="barber">Barber</option>
            </select>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Submit */}
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