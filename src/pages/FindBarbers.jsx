import { useState } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import api from "../services/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

export default function FindBarbers() {
  const [barbers, setBarbers] = useState([]);
  const [center, setCenter] = useState(null);
  const [status, setStatus] = useState("");
  const [selectedBarber, setSelectedBarber] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const findNearby = () => {
    if (!navigator.geolocation) {
      return setStatus("Geolocation is not supported by your browser.");
    }

    setStatus("Locating...");

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;
        setCenter({ lat, lng });
        setStatus("Fetching nearby barbers...");

        try {
          const res = await api.get(
            `/users/barbers/nearby?lat=${lat}&lng=${lng}&distance=10`
          );
          setBarbers(res.data.barbers);
          setStatus(`Found ${res.data.count} barbers near you.`);
        } catch (err) {
          console.error(err);
          setStatus("Error fetching barbers.");
        }
      },
      () => setStatus("Unable to retrieve your location.")
    );
  };

  return (
    <div>
      <h2>Find Nearby Barbers</h2>
      <button onClick={findNearby}>Use My Location</button>
      <p>{status}</p>

      {isLoaded && center && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          <Marker position={center} label="You" />

          {barbers.map((barber) => (
            <Marker
              key={barber._id}
              position={{
                lat: barber.location.coordinates[1],
                lng: barber.location.coordinates[0],
              }}
              onClick={() => setSelectedBarber(barber)}
              label={barber.username}
            />
          ))}

          {selectedBarber && (
            <InfoWindow
              position={{
                lat: selectedBarber.location.coordinates[1],
                lng: selectedBarber.location.coordinates[0],
              }}
              onCloseClick={() => setSelectedBarber(null)}
            >
              <div style={{ maxWidth: "200px" }}>
                <img
                  src={selectedBarber.profileImage || "https://via.placeholder.com/100"}
                  alt="barber"
                  style={{ width: "100%", borderRadius: "8px", marginBottom: "5px" }}
                />
                <h4>{selectedBarber.username}</h4>
                <p>{selectedBarber.email}</p>
                <p style={{ color: "#FFD700", margin: "5px 0" }}>⭐⭐⭐⭐☆</p>
                <button
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    alert(`Booking request for ${selectedBarber.username}`)
                  }
                >
                  Book Now
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
}
