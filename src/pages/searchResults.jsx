// src/pages/SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GiRazor } from "react-icons/gi";

export default function SearchResults() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const [loading, setLoading] = useState(true);
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    if (!query) return;

    // Simulate fetching from backend
    setLoading(true);
    setTimeout(() => {
      setBarbers([
        {
          id: 1,
          name: "Fresh Cuts",
          location: "Farin Gada, Jos",
          rating: 4.8,
          image: "/haircuts/mike.jpeg",
        },
        {
          id: 2,
          name: "Sharp & Clean",
          location: "Tina Junction, Jos",
          rating: 4.6,
          image: "/haircuts/Jayden.jpg",
        },
        {
          id: 3,
          name: "Classic Styles",
          location: "Angwan Rukuba, Jos",
          rating: 4.9,
          image: "/haircuts/James.jpeg",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Results for: <span className="text-indigo-600">{query}</span>
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : barbers.length === 0 ? (
        <p className="text-center text-gray-600">No barbers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {barbers.map((barber) => (
            <div
              key={barber.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={barber.image}
                alt={barber.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <GiRazor className="text-indigo-600" />
                  {barber.name}
                </h2>
                <p className="text-gray-600">{barber.location}</p>
                <p className="mt-2 text-yellow-500 font-medium">
                  ⭐ {barber.rating.toFixed(1)}
                </p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
