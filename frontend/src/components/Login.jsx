import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login clicked");
    // your login API here
  };

  return (
    <div style={{
      width: "400px",
      margin: "40px auto",
      padding: "20px",
      background: "white",
      borderRadius: "10px",
      border: "1px solid #ccc"
    }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: "12px",
            padding: "10px",
            borderRadius: "5px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            marginBottom: "12px",
            padding: "10px",
            borderRadius: "5px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#1dbf73",
            borderRadius: "5px",
            color: "white",
            fontWeight: "bold"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
