import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function SetLocation() {
  const { token, user } = useAuth();
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState("");

  const getLocation = () => {
    if (!navigator.geolocation) {
      return setStatus("Geolocation is not supported by your browser.");
    }

    setStatus("Locating...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(coords);
        setStatus("Location retrieved.");
      },
      () => setStatus("Unable to retrieve your location.")
    );
  };

  const saveLocation = async () => {
    if (!location) return;

    try {
      const res = await axios.put(
        "http://localhost:5000/api/users/set-location",
        location,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setStatus("Location saved successfully!");
    } catch (err) {
      setStatus("Failed to save location.");
    }
  };

  return (
    <div>
      <h2>Set Your Location</h2>
      {user?.role !== "barber" ? (
        <p>Only barbers can update their location.</p>
      ) : (
        <>
          <button onClick={getLocation}>Get My Location</button>
          {location && (
            <>
              <p>
                Latitude: {location.latitude}, Longitude: {location.longitude}
              </p>
              <button onClick={saveLocation}>Save Location</button>
            </>
          )}
          <p>{status}</p>
        </>
      )}
    </div>
  );
}
