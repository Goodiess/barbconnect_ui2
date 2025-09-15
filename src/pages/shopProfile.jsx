import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ShopProfile() {
  const { shopId } = useParams();
  const [shopDetails, setShopDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    console.log("Raw shopId from URL:", shopId); // Debug
    AOS.init({ duration: 800, offset: 100, once: true });

    // Check user role from sessionStorage
    const userRole = sessionStorage.getItem("role") || "client";
    setRole(userRole);

    const mockShops = [
      {
        name: "Joe's Barbershop",
        id: "joes-barbershop",
        image: "/haircuts/Joe.jpg",
        rating: 4.9,
        reviews: 150,
        address: "123 Main St, Jos-North, Plateau, Nigeria",
        hours: "Mon-Sat: 9 AM - 6 PM",
        services: [
          { name: "Taper Fade", price: "₦1,500" },
          { name: "Beard Trim", price: "₦1,000" },
          { name: "Hair Dye", price: "₦2,000" },
          { name: "Shave", price: "₦800" },
          { name: "Taper Fade", price: "₦3,000" },
        ],
        barbers: ["Joe", "Mike", "Sam", "Alex"],
        description: "Joe's Barbershop offers classic and modern haircuts with a focus on quality and customer satisfaction.",
      },
      {
        name: "Clean Cutz",
        id: "clean-cutz",
        image: "/haircuts/Mark.png",
        rating: 4.6,
        reviews: 98,
        address: "45 Ring Road, Jos, Nigeria",
        hours: "Mon-Fri: 10 AM - 7 PM",
        services: [
          { name: "Low Cut", price: "₦1,200" },
          { name: "Dreadlock Maintenance", price: "₦2,500" },
          { name: "Beard Trim", price: "₦1,000" },
          { name: "Shave", price: "₦800" },
          { name: "Taper Fade", price: "₦3,000" },
        ],
        barbers: ["Mark", "Tunde", "Ayo", "Solo"],
        description: "Clean Cutz provides a fresh and stylish experience with skilled barbers.",
      },
      {
        name: "Sharp Styles",
        id: "sharp-styles",
        image: "/haircuts/James.jpeg",
        rating: 4.9,
        reviews: 210,
        address: "78 Farin Gada, Jos, Nigeria",
        hours: "Tue-Sun: 8 AM - 5 PM",
        services: [
          { name: "High Fade", price: "₦1,800" },
          { name: "Beard Shaping", price: "₦1,200" },
        ],
        barbers: ["James", "Sam", "Lekan", "Bola"],
        description: "Sharp Styles is your go-to for precision cuts and trendy styles.",
      },
      {
        name: "Royal Touch",
        id: "royal-touch",
        image: "/haircuts/Raph.jpg",
        rating: 4.7,
        reviews: 156,
        address: "12 Angwan Rukuba, Jos, Nigeria",
        hours: "Mon-Sat: 9 AM - 6 PM",
        services: [
          { name: "Full Groom", price: "₦4,000" },
          { name: "Hair Tint", price: "₦2,500" },
          { name: "Skin Fade", price: "₦2,000" },
          { name: "Beard Trim", price: "₦1,000" },
          { name: "Shave", price: "₦800" },
          { name: "Taper Fade", price: "₦3,000" },
        ],
        barbers: ["Raph", "Emeka"],
        description: "Royal Touch offers a premium grooming experience with a touch of class.",
      },
      {
        name: "Classic Cutz",
        id: "classic-cutz",
        image: "/haircuts/Goody.jpeg",
        rating: 4.5,
        reviews: 87,
        address: "56 Tina Junction, Jos, Nigeria",
        hours: "Mon-Sat: 10 AM - 8 PM",
        services: [
          { name: "Classic Cut", price: "₦3,000" },
          { name: "Beard Trim", price: "₦1,000" },
          { name: "Shave", price: "₦800" },
          { name: "Taper Fade", price: "₦3,000" },

        ],
        barbers: ["Goody", "Chidi", "Femi", "Chucks"],
        description: "Classic Cutz specializes in timeless haircuts with excellent service.",
      },
    ];

    console.log("mockShops IDs:", mockShops.map((s) => s.id)); // Debug
    const shop = mockShops.find((s) => s.id === shopId);
    console.log("Found shop for shopId:", shopId, "Result:", shop); // Debug
    if (shop) {
      setShopDetails(shop);
      setFormData({
        name: shop.name,
        address: shop.address,
        hours: shop.hours,
        services: shop.services.map((s) => ({ ...s })), // Deep copy
        barbers: shop.barbers.join(", "), // Convert array to string
        description: shop.description,
      });
    } else {
      setShopDetails(null);
    }
    setIsLoading(false);
  }, [shopId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (index, field, value) => {
    setFormData((prev) => {
      const newServices = [...prev.services];
      newServices[index] = { ...newServices[index], [field]: value };
      return { ...prev, services: newServices };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update shopDetails with form data (temporary, replace with API call later)
    setShopDetails((prev) => ({
      ...prev,
      name: formData.name,
      address: formData.address,
      hours: formData.hours,
      services: formData.services,
      barbers: formData.barbers.split(",").map((b) => b.trim()),
      description: formData.description,
    }));
    console.log("Updated shop details:", formData); // Debug: Log changes
    setShowModal(false);
    // TODO: Add API call to save changes to backend
    // fetch(`/api/shops/${shopId}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-800">Loading...</p>
      </div>
    );
  }

  if (!shopDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Shop Not Found</h1>
          <p className="text-gray-600 mb-4">The barbershop you're looking for does not exist.</p>
          <Link
            to="/"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6" data-aos="fade-up">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <img
              src={shopDetails.image}
              alt={shopDetails.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{shopDetails.name}</h1>
            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }, (_, idx) => (
                <span
                  key={idx}
                  className={`text-yellow-400 text-lg ${
                    idx < Math.floor(shopDetails.rating) ? "fas fa-star" : "far fa-star"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-gray-600 text-sm">
                {shopDetails.rating} ({shopDetails.reviews} reviews)
              </span>
            </div>
            <p className="text-gray-600 mb-4">{shopDetails.description}</p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">📍 Address:</span> {shopDetails.address}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">🕒 Hours:</span> {shopDetails.hours}
            </p>
            <div className="flex gap-4">
              <Link
                to="/"
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                aria-label="Back to home"
              >
                Back to Home
              </Link>
              {role === "barber" && (
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-block px-4 py-2 bg-[#601c1c] text-white rounded-lg shadow hover:bg-[#4b1e1e] transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4" data-aos="fade-right">Services</h2>
          <ul className="list-disc pl-5 mb-6 text-gray-700">
            {shopDetails.services.map((service, i) => (
              <li key={i} data-aos="fade-up" data-aos-delay={i * 100}>
                {service.name}: {service.price}
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mb-4" data-aos="fade-right">Our Barbers</h2>
          <p className="text-gray-700" data-aos="fade-up">{shopDetails.barbers.join(", ")}</p>
        </div>
      </div>

      {showModal && formData && role === "barber" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Edit {shopDetails.name} Profile</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-semibold">Shop Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Hours</label>
                <input
                  type="text"
                  name="hours"
                  value={formData.hours}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                  rows="4"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Barbers (comma-separated)</label>
                <input
                  type="text"
                  name="barbers"
                  value={formData.barbers}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold">Services</label>
                {formData.services.map((service, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={service.name}
                      onChange={(e) => handleServiceChange(index, "name", e.target.value)}
                      className="w-1/2 border p-2 rounded"
                      placeholder="Service Name"
                      required
                    />
                    <input
                      type="text"
                      value={service.price}
                      onChange={(e) => handleServiceChange(index, "price", e.target.value)}
                      className="w-1/2 border p-2 rounded"
                      placeholder="Price"
                      required
                    />
                  </div>
                ))}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-gray-600 hover:underline w-full text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}