import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Subscriptions.css";

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("User not authenticated. Please log in.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8085/subscriptions", {
          headers: { Authorization: token },
        });
        setSubscriptions(response.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data);
        } else {
          setError("An error occurred while fetching subscriptions.");
        }
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="subscriptions-container">
      <h2>Your Subscriptions</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="subscriptions-grid">
        {subscriptions.map((sub) => (
          <div key={sub.id} className="subscription-card">
            <h3>{sub.name}</h3>
            <p>{sub.description}</p>
            <p>Price: ${sub.price}</p>
            <p>Next Payment: {new Date(sub.nextPaymentDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
