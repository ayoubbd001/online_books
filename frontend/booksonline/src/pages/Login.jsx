import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token } = response.data;

      localStorage.setItem("token", token); // Store token in local storage
      // Optionally, you can redirect the user to another page after successful login
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error.response.data);
      // Handle login error (e.g., display error message to the user)
    }
  };

  return (
    <div className="login-box">
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <center>
          <button type="submit">
            SEND
            <span></span>
          </button>
        </center>
      </form>
    </div>
  );
};

export default Login;
