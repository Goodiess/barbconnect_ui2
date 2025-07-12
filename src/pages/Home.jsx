import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { GiRazor } from "react-icons/gi";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, offset: 100, once: true });

    const loginState = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginState);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-br from-[#4b1e1e] via-[#601c1c] to-[#2f0e0e] text-white transition-all duration-500">
        {isLoggedIn ? (
          <div className="max-w-2xl mx-auto px-6">
            <h1 className="text-3xl font-bold mb-6">Find Barbers Near You ✂️</h1>
            <input
  type="text"
  placeholder="Search by city, area or zip code..."
  className="w-full px-5 py-3 rounded-md bg-white border-2 border-[#601c1c] text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-[#601c1c]"

/>

            <button className="mt-4 px-6 py-2 bg-[#601c1c] border-radius white text-white rounded hover:bg-yellow-600 transition">
              Search
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-5xl font-extrabold mb-4 flex items-center justify-center gap-3" data-aos="fade-down">
              <span>Welcome to BarbConnect</span>
              <GiRazor className="text-white text-4xl" />
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-6" data-aos="fade-up">
              Find top-rated barbers near you, read reviews, and book your next cut with ease.
              Register now to get started!
            </p>
            <div className="flex justify-center gap-4" data-aos="zoom-in">
              <Link
                to="/login"
                className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-md shadow hover:bg-gray-100 transition-transform duration-300 hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 border border-white font-semibold rounded-md hover:bg-white hover:text-purple-700 transition-transform duration-300 hover:scale-105"
              >
                Register
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10" data-aos="fade-down">✨ Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-lg">
          {[
            "📍 Find nearby barbers using geolocation",
            "⭐ Rate and review your experience",
            "📆 Barbers can manage their availability",
            "🖼️ View barber profiles with images",
          ].map((text, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded shadow hover:shadow-md transition-transform duration-300 hover:scale-105"
              data-aos="fade-up"
            >
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-white">
        <h2 className="text-4xl font-extrabold text-center mb-16" data-aos="fade-down">
          💬 Customer Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Jayden",
              image: "/haircuts/Jayden.jpg",
              review: "Best fade in town. Booking was super easy!",
              role: "Student, UNIJOS",
            },
            {
              name: "Mike",
              image: "/haircuts/Mike.jpeg",
              review: "Loved the service and the clean shop. 10/10!",
              role: "Business Owner",
            },
            {
              name: "Malik",
              image: "/haircuts/James.jpeg",
              review: "My cut was fresh, sharp and quick. Will return!",
              role: "Software Engineer",
            },
          ].map((review, i) => (
            <div
              key={i}
              className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              data-aos="zoom-in"
            >
              <img
                src={review.image}
                alt={`Haircut by ${review.name}`}
                className="w-full h-56 object-cover rounded mb-4"
              />
              <p className="italic text-gray-700 mb-3">"{review.review}"</p>
              <h4 className="font-semibold text-lg">{review.name}</h4>
              <p className="text-sm text-gray-500">{review.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-sky-100 to-indigo-200">
        <h2 className="text-3xl font-bold text-center mb-10" data-aos="fade-down">💸 Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          {[
            {
              title: "Basic Cut",
              price: "#1,500",
              items: ["Taper-Fade", "Afro Two-Step", "Lowcut Two-Step", "30 mins"],
            },
            {
              title: "Dreadlock",
              price: "#2,500",
              items: ["Dreadlock", "Beard trim", "Clean-Cut", "Dye + Tint", "1 Hour"],
            },
            {
              title: "Full Groom",
              price: "#4,000",
              items: ["Cut + beard + facial", "Hot towel", "45 mins"],
            },
          ].map((pkg, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded shadow hover:shadow-xl hover:scale-105 transition-transform duration-300"
              data-aos="flip-left"
            >
              <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
              <p className="text-3xl font-bold mb-4">{pkg.price}</p>
              <ul className="text-gray-700 space-y-1 mb-4">
                {pkg.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-100 via-blue-100 to-pink-100 transition-all duration-500">
        <h2 className="text-3xl font-bold text-center mb-10" data-aos="fade-down">📍 Our Locations</h2>
        <div className="max-w-4xl mx-auto text-center" data-aos="zoom-in-up">
          <p className="mb-4">We currently serve clients in:</p>
          <ul className="text-lg font-medium space-y-2">
            <li>🔹 Plateau, Nigeria</li>
            <li>🔹 Jos, Jos-North</li>
            <li>🔹 Unijos, Farin Gada</li>
            <li>🔹 Tina, Angwan Rukuba</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-20">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <div className="flex items-center gap-2 text-xl font-bold mb-3">
  <span>BarbConnect</span>
  <GiRazor size={40} className="text-white" />
</div>

            <p>Farin Gada, Jos-North, Plateau State</p>
            <p>Email: support@barbconnect.com</p>
            <p>Phone: +234 8142 0645 14</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-purple-400 transition">Home</Link></li>
              <li><Link to="/login" className="hover:text-purple-400 transition">Login</Link></li>
              <li><Link to="/register" className="hover:text-purple-400 transition">Register</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Services</h4>
            <ul className="space-y-2">
              <li>Haircuts</li>
              <li>Beard Trim</li>
              <li>Dreadlocks</li>
              <li>Styling</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://www.facebook.com/YOUR_FACEBOOK_USERNAME" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400">
                  <FaFacebookF className="text-lg" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/YOUR_TWITTER_HANDLE" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400">
                  <FaTwitter className="text-lg" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/YOUR_INSTAGRAM_USERNAME" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400">
                  <FaInstagram className="text-lg" />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-10">
          © {new Date().getFullYear()} BarbConnect. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
