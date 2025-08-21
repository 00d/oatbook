import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import OatCard from "../components/OatCard.jsx";
import instance from "../lib/axios.js";

const HomePage = () => {
  const [rateLimit, setRateLimit] = useState(false);
  const [oats, setOats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("oats");
        setOats(response.data);
        setRateLimit(false);
      } catch (error) {
        console.error("Error fetching oats:", error);
        if (error.response && error.response.status === 429) {
          setRateLimit(true);
        } else {toast.error("Failed to fetch oats.");}
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {rateLimit && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        {loading && <p>Loading oats...</p>}
        {!loading && oats.length === 0 && <p>No oats found.</p>}
        {!loading && oats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {oats.map((oat) => (
              <OatCard key={oat._id} oat={oat} setOats={setOats} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
