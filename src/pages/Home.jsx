import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { GiRazor } from "react-icons/gi";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, offset: 100, once: true });

    const loginState = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loginState);
  }, []);

  const handleSearch = () => {
    console.log("Searching for barbers in:", searchTerm);
    // You can fetch from your API using `searchTerm`
  };

 const handleLocationSearch = async () => {
  if (!searchTerm) {
    alert("Please enter a location to search.");
    return;
  }

  setIsLoadingLocation(true);

  try {
    const apiKey = import.meta.env.VITE_OPENCAGE_KEY;
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        searchTerm
      )}&key=${apiKey}`
    );
    const data = await response.json();

    console.log("🧭 Full OpenCage Response:", data);

    const result = data?.results?.[0];

    if (!result) {
      console.warn("⚠️ No result returned by OpenCage.");
      alert("Location lookup failed.");
      return;
    }

    const { lat, lng } = result.geometry;
    const formatted = result.formatted;

    console.log("✅ Coordinates:", lat, lng);
    console.log("📝 Formatted Address:", formatted);

    // 👉 Now you can call your backend to search barbers near these coords
    // Example:
    // const barbers = await fetch(`/api/barbers?lat=${lat}&lng=${lng}`);

  } catch (error) {
    console.error("🚨 Location search error:", error);
    alert("Failed to determine location.");
  } finally {
    setIsLoadingLocation(false);
  }
};
  const handleGeolocationSearch = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("📍 Current Location:", latitude, longitude);
        // You can now use these coordinates to search for barbers
      },
      (error) => {
        console.error("🚨 Geolocation error:", error);
        alert("Failed to retrieve your location.");
      }
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">

{/* Hero Section */}
<section className="relative text-center py-60 bg-gradient-to-br from-[#4b1e1e] via-[#601c1c] to-[#2f0e0e] text-white transition-all duration-500 overflow-hidden">
  {/* Background Image */}
  <img
    src="/public/haircuts/mike.jpeg"  // ✅ remove /public (Vite serves /public at root)
    alt="Barber Cutting Hair"
    className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
  />

  {/* Content */}
  <div className="relative z-10">
    {isLoggedIn ? (
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-6">Find Barbers Near You ✂️</h1>

        {/* Location Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter your city, area or zip code..."
          className="w-full px-5 py-3 rounded-md bg-white border-2 border-[#601c1c] text-gray-800 shadow focus:outline-none focus:ring-2 focus:ring-[#601c1c]"
        />

        {/* Search Button */}
        <button
          className="mt-4 px-6 py-2 bg-[#601c1c] text-white rounded hover:bg-yellow-600 transition"
          onClick={handleLocationSearch}   // ✅ now uses your new handleLocationSearch
        >
          Search
        </button>
      </div>
    ) : (
      <>
        {/* Unauthenticated view remains unchanged */}
      </>
    )}
  </div>
</section>


      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-gray-50">
        <h2 className="text-4xl font-extrabold text-center uppercase mb-10" data-aos="fade-down">
          ✨ Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-lg">
          {[
            { icon: "📍", content: "Find nearby barbers using geolocation" },
            { icon: "⭐", content: "Rate and review your experience" },
            { icon: "📆", content: "Barbers can manage their availability" },
            { icon: "🖼️", content: "View barber profiles with images" },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded shadow hover:shadow-md transition-transform duration-300 hover:scale-105"
              data-aos="fade-up"
            >
              <div className="text-center text-4xl mb-3">{feature.icon}</div>
              <div className="text-center">{feature.content}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-white">
        <h2 className="text-4xl font-extrabold text-center mb-16" data-aos="fade-down">
          💬 Customer Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-full mx-auto">
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
              className="h-120 bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              data-aos="zoom-in"
            >
              <img
                src={review.image}
                alt={`Haircut by ${review.name}`}
                className="w-full h-80 object-cover rounded mb-4"
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
  <h2 className="text-4xl font-extrabold text-center mb-10" data-aos="fade-down">💸 Pricing</h2>
  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
    {[
      {
        title: "Basic Cut",
        price: "#1,500",
        amount: 150000, // Paystack amount in kobo
        items: ["Taper-Fade", "Afro Two-Step", "Lowcut Two-Step", "30 mins"],
      },
      {
        title: "Dreadlock",
        price: "#2,500",
        amount: 250000,
        items: ["Dreadlock", "Beard trim", "Clean-Cut", "Dye + Tint", "1 Hour"],
      },
      {
        title: "Full Groom",
        price: "#4,000",
        amount: 400000,
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
        {/* Book & Pay Button */}
        <button
          onClick={() => {
            setSelectedService(pkg);
            setShowBookingForm(true);
          }}
          className="mt-4 px-6 py-2 bg-[#601c1c] text-white rounded hover:bg-yellow-600 transition"
        >
          Book & Pay
        </button>
      </div>
    ))}
  </div>
</section>

{/* Booking Modal */}
{showBookingForm && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Book: {selectedService?.title}</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);

          const booking = {
            customerId: "12345", // TODO: replace with logged-in user ID
            barberId: "67890",   // TODO: replace with actual barber ID
            service: {
              name: selectedService.title,
              price: selectedService.amount,
              currency: "NGN",
            },
            slot: {
              startUtc: new Date(`${formData.get("date")}T${formData.get("time")}:00Z`),
              endUtc: new Date(`${formData.get("date")}T${formData.get("time")}:00Z`),
            },
            email: formData.get("email"),
          };

          try {
            const res = await fetch("http://localhost:5000/api/appointments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(booking),
            });
            const data = await res.json();
            if (data.checkoutUrl) {
              window.location.href = data.checkoutUrl; // Redirect to Paystack
            }
          } catch (err) {
            console.error("Booking failed", err);
            alert("Booking failed, try again.");
          }
        }}
        className="space-y-3"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="time"
          name="time"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#601c1c] text-white py-2 rounded hover:bg-yellow-600"
        >
          Confirm & Pay
        </button>
      </form>
      <button
        onClick={() => setShowBookingForm(false)}
        className="mt-3 text-gray-600 hover:underline"
      >
        Cancel
      </button>
    </div>
  </div>
)}
{showBookingForm && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">
        Book: {selectedService?.title}
      </h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);

          const booking = {
            customerId: "12345", // TODO: Replace with logged-in user
            barberId: "67890",  // TODO: Replace dynamically
            service: {
              name: selectedService.title,
              price: selectedService.amount,
              currency: "NGN",
            },
            slot: {
              startUtc: new Date(`${formData.get("date")}T${formData.get("time")}:00Z`),
              endUtc: new Date(`${formData.get("date")}T${formData.get("time")}:00Z`),
            },
            email: formData.get("email"),
          };

          try {
            const res = await fetch("http://localhost:5000/api/appointments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(booking),
            });
            const data = await res.json();
            if (data.checkoutUrl) {
              window.location.href = data.checkoutUrl; // Redirect to Paystack
            }
          } catch (err) {
            console.error("Booking failed", err);
            alert("Booking failed, try again.");
          }
        }}
        className="space-y-3"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="date"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="time"
          name="time"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#601c1c] text-white py-2 rounded hover:bg-yellow-600"
        >
          Confirm & Pay
        </button>
      </form>
      <button
        onClick={() => setShowBookingForm(false)}
        className="mt-3 text-gray-600 hover:underline"
      >
        Cancel
      </button>
    </div>
  </div>
)}


      {/* Booking & Payment Section */}
{/* <section className="py-16 px-6 bg-gray-100">
  <h2
    className="text-4xl font-extrabold text-center mb-10"
    data-aos="fade-down"
  >
    ✂️ Book & Pay
  </h2>

  <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
    <h3 className="text-xl font-bold mb-4">Book a Haircut</h3>

    <p className="mb-2">Service: <span className="font-semibold">Basic Cut</span></p>
    <p className="mb-4">Price: <span className="font-semibold">₦1,500</span></p>

    <button
      onClick={async () => {
        try {
          const res = await fetch("/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              customerId: "64e123abc",   // 🔹 replace with real logged-in user ID
              barberId: "64e456def",     // 🔹 replace with real barber ID
              service: {
                name: "Basic Cut",
                price: 150000, // Paystack expects kobo (₦1500 = 150000)
                currency: "NGN",
                duration: 30
              },
              slot: {
                startUtc: new Date().toISOString(),
                endUtc: new Date(Date.now() + 30 * 60000).toISOString()
              },
              email: "customer@example.com" // 🔹 logged-in user email
            })
          });

          const data = await res.json();

          if (data.checkoutUrl) {
            window.location.href = data.checkoutUrl; // Redirect to Paystack
          } else {
            alert("Booking failed.");
          }
        } catch (err) {
          console.error(err);
          alert("Error booking.");
        }
      }}
      className="w-full bg-[#601c1c] text-white py-2 rounded hover:bg-[#4b1e1e] transition"
    >
      Book & Pay
    </button>
  </div>
</section> */}



      {/* Location Section */}
<section
  id="location"
  className="py-16 px-6 bg-gradient-to-r from-indigo-100 via-blue-100 to-pink-100 transition-all duration-500"
>
  <h2
    className="text-4xl font-extrabold text-center mb-10"
    data-aos="fade-down"
  >
    📍 Our Locations
  </h2>
  <div className="max-w-full mx-auto text-center" data-aos="zoom-in-up">
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
      <footer className="bg-gray-900 text-white py-10 mt-2">
        <div className="max-w-full justify-center mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-1">
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
                <a href="https://www.facebook.com/Goodies_Raphael_Ngene" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400">
                  <FaFacebookF className="text-lg" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/@GoodnessN34464" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400">
                  <FaTwitter className="text-lg" />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/@goodiesngene" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-purple-400">
                  <FaInstagram className="text-lg" />
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-10 px-1">
          © {new Date().getFullYear()} BarbConnect. All rights reserved.
        </div>
      </footer>

    </div>
  );
} 