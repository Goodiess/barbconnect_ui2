import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to BarbConnect 💈</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Find top-rated barbers near you, read reviews, and book your next cut with ease.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-md shadow hover:bg-gray-100 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 border border-white font-semibold rounded-md hover:bg-white hover:text-blue-700 transition"
          >
            Register
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">✨ Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-lg text-gray-700">
          <div className="bg-white p-6 rounded shadow">
            📍 Find nearby barbers using geolocation
          </div>
          <div className="bg-white p-6 rounded shadow">
            ⭐ Rate and review your experience
          </div>
          <div className="bg-white p-6 rounded shadow">
            📆 Barbers can manage their availability
          </div>
          <div className="bg-white p-6 rounded shadow">
            🖼️ View barber profiles with images
          </div>
        </div>
      </section>
    </div>
  );
}
// This Home component serves as the landing page for the application, providing a brief introduction and links to login or register.
// It includes a hero section with a call to action and a features section highlighting the main functionalities of the app.