import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginRegisterPage.css";

const LoginRegisterPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isRegister
      ? "http://localhost:8085/auth/register"
      : "http://localhost:8085/auth/login";

    try {
      const response = await axios.post(url, formData);
      if (isRegister) {
        alert("Registration successful!");
        toggleForm();
      } else {
        alert("Login successful! Token: " + response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>{isRegister ? "Register" : "Log In"}</h2>

          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isRegister && (
            <>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-primary">
            {isRegister ? "Register" : "Log In"}
          </button>
        </form>
      </div>

      <div className="overlay">
        <div className="overlay-panel">
          <h2>{isRegister ? "Welcome Back!" : "Hello, Friend!"}</h2>
          <p>
            {isRegister
              ? "Already have an account? Log in to continue!"
              : "Don't have an account? Register now!"}
          </p>
          <button onClick={toggleForm} className="btn-secondary">
            {isRegister ? "Back to Login" : "Create an Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
