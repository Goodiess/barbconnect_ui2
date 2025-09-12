import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { GiRazor } from "react-icons/gi";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import hero from '../../public/haircuts/Mike.jpeg'; // Ensure the path is correct

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // "client" or "barber"
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // ✅ Booking modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, offset: 100, once: true });

    const loginState = sessionStorage.getItem("isLoggedIn") === "true";
    const userRole = sessionStorage.getItem("role") || "";
    setIsLoggedIn(loginState);
    setRole(userRole);
  }, []);

  const handleSearch = () => {
    console.log("Searching for barbers in:", searchTerm);
    // TODO: integrate backend search API
  };

  const handleGeolocationSearch = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("📍 Coordinates:", latitude, longitude);

        try {
          const apiKey = import.meta.env.VITE_OPENCAGE_KEY;
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
          );
          const data = await response.json();

          const result = data?.results?.[0];
          if (!result) {
            alert("Location lookup failed.");
            return;
          }

          const components = result.components || {};
          const formatted = result.formatted;

          const location =
            components.suburb ||
            components.village ||
            components.town ||
            components.country ||
            components.city ||
            components.state ||
            formatted;

          setSearchTerm(location || formatted);
        } catch (error) {
          console.error("🚨 Reverse geocoding error:", error);
          alert("Failed to determine location.");
        } finally {
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error("🛑 Geolocation error:", error);
        alert("Unable to retrieve your location.");
        setIsLoadingLocation(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const barberCards = [
    { title: "🏪 Manage Shop Profile", desc: "Create and update your barbershop details." },
    { title: "💵 List Services & Prices", desc: "Add or edit your haircut, beard, and styling prices." },
    { title: "📆 Manage Bookings", desc: "Track client bookings and set availability." },
  ];

  const clientCards = [
    { title: "🔍 Search Shops", desc: "Find barbershops close to your location." },
    { title: "💈 View Shop Profiles", desc: "Check services, pricing, and barber ratings." },
    { title: "📅 Book & Pay", desc: "Book appointments and pay securely online." },
  ];

  const dashboardCards = role === "barber" ? barberCards : clientCards;

  // ✅ Shops array
  const shops = [
    { name: "Fade Masters", image: "/public/haircuts/Mike.jpeg", rating: 4.8, reviews: 124 },
    { name: "Clean Cutz", image: "/haircuts/Mark.png", rating: 4.6, reviews: 98 },
    { name: "Sharp Styles", image: "/haircuts/James.jpeg", rating: 4.9, reviews: 210 },
    { name: "Royal Touch", image: "/haircuts/Raph.jpg", rating: 4.7, reviews: 156 },
    { name: "Classic Cutz", image: "/haircuts/Goody.jpeg", rating: 4.5, reviews: 87 },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* Hero Section */}
      <section className="relative text-center py-40 md:py-60 bg-gradient-to-br from-[#4b1e1e] via-[#601c1c] to-[#2f0e0e] text-white transition-all duration-500 overflow-hidden">
        <img
          src={hero}
          alt="Barber Cutting Hair"
          className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        />

        <div className="relative z-10">
          {isLoggedIn ? (
            <div className="max-w-2xl mx-auto px-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Find Barbers Near You ✂️</h1>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by city, area or zip code..."
                className="w-full px-5 py-3 rounded-md bg-white border-2 border-[#601c1c] text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-[#601c1c]"
              />

              <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-3">
                <button
                  className="px-6 py-2 bg-[#601c1c] text-white rounded hover:bg-yellow-600 transition"
                  onClick={handleSearch}
                >
                  Search
                </button>

                <button
                  className="px-6 py-2 bg-white text-[#601c1c] border border-[#601c1c] rounded hover:bg-gray-100 transition"
                  onClick={handleGeolocationSearch}
                  disabled={isLoadingLocation}
                >
                  {isLoadingLocation ? "Locating..." : "📍 Use My Location"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1
                className="text-2xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3"
                data-aos="fade-down"
              >
                Welcome to BarbConnect
                <GiRazor className="text-white text-4xl" />
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6" data-aos="fade-up">
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
        </div>
      </section>

      {/* Dashboard Section */}
      {isLoggedIn && (
        <section className="py-20 px-6 bg-gray-100 w-full">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8" data-aos="fade-down">
              {role === "barber" ? "💈 Barber Dashboard" : "👤 Client Dashboard"}
            </h2>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              {dashboardCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white text-gray-800 p-6 rounded-lg shadow hover:shadow-xl hover:scale-105 transition-transform duration-300"
                  data-aos="fade-up"
                >
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Barbershops Section */}
      <section id="barbershops" className="py-16 px-6 bg-gray-50 w-full">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center uppercase mb-10" data-aos="fade-down">
            💈 Nearby Barbershops
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-10">
            {shops.map((shop, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1 flex flex-col"
                data-aos="zoom-in"
              >
                <img src={shop.image} alt={shop.name} className="w-full h-56 object-cover" />

                <div className="p-5 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{shop.name}</h3>
                    <div className="flex items-center justify-center mb-4">
                      {Array.from({ length: 5 }, (_, idx) => (
                        <span
                          key={idx}
                          className={`text-yellow-400 text-lg ${
                            idx < Math.floor(shop.rating) ? "fas fa-star" : "far fa-star"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-gray-600 text-sm">
                        {shop.rating} ({shop.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center mt-4">
                    <button
                      onClick={() => {
                        setSelectedShop(shop);
                        setShowModal(true);
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => (window.location.href = "https://paystack.com/pay/demo")}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                    >
                      Pay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Modal */}
          {showModal && selectedShop && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-2xl font-bold mb-4">
                  Book Appointment at {selectedShop.name}
                </h3>
                <form className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full border p-2 rounded" />
                  <input type="email" placeholder="Your Email" className="w-full border p-2 rounded" />
                  <input type="datetime-local" className="w-full border p-2 rounded" />
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                  >
                    Confirm Booking
                  </button>
                </form>
                <button onClick={() => setShowModal(false)} className="mt-4 text-gray-600 hover:underline">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-white w-full">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-16" data-aos="fade-down">
            💬 Customer Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "Joe",
                image: "/haircuts/Joe.jpg",
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
                className="bg-gray-100 rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                data-aos="zoom-in"
              >
                <img src={review.image} alt={`Haircut by ${review.name}`} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <p className="italic text-gray-700 mb-3">"{review.review}"</p>
                  <h4 className="font-semibold text-lg">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-sky-100 to-indigo-200 w-full">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-10" data-aos="fade-down">
            💸 Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { title: "Basic Cut", price: "₦1,500", items: ["Taper-Fade", "Afro Two-Step", "Lowcut Two-Step", "30 mins"] },
              { title: "Dreadlock", price: "₦2,500", items: ["Dreadlock", "Beard trim", "Clean-Cut", "Dye + Tint", "1 Hour"] },
              { title: "Full Groom", price: "₦4,000", items: ["Cut + beard + facial", "Hot towel", "45 mins"] },
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
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-16 px-6 bg-gradient-to-r from-indigo-100 via-blue-100 to-pink-100 w-full">
        <div className="w-full max-w-7xl mx-auto text-center" data-aos="zoom-in-up">
          <h2 className="text-4xl font-extrabold mb-10" data-aos="fade-down">📍 Our Locations</h2>
          <p className="text-2xl mb-4">We currently serve clients in:</p>
          <ul className="text-lg font-medium space-y-2">
            <li>🔹 Plateau, Nigeria</li>
            <li>🔹 Jos, Jos-North</li>
            <li>🔹 Unijos, Farin Gada</li>
            <li>🔹 Tina, Angwan Rukuba</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 mt-2 w-full">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold mb-3">
              <span>BarbConnect</span>
              <GiRazor size={40} className="text-white" />
            </div>
            <p>Farin Gada, Jos-North, Plateau State</p>
            <p>Email: support@barbconnect.com</p>
            <p>Phone: +234 8142064514</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-purple-400 transition">Home</Link></li>
              <li><Link to="/login" className="hover:text-purple-400 transition">Login</Link></li>
              <li><Link to="/register" className="hover:text-purple-400 transition">Register</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Services</h4>
            <ul className="space-y-2">
              <li>Haircuts</li>
              <li>Beard Trim</li>
              <li>Dreadlocks</li>
              <li>Hair Dyeing</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-purple-400 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-purple-400 transition"><FaTwitter /></a>
              <a href="#" className="hover:text-purple-400 transition"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <p className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} BarbConnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
