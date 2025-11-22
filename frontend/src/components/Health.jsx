import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Health() {

  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/healthz");
      setHealth(res.data);
    } catch (err) {
      setHealth({ ok: false, error: "Server unreachable" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
      setShowLogin(false);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/register", {
        name: regName,
        email: regEmail,
        password: regPassword,
      });

      alert("Registration Successful!");
      setShowRegister(false);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "40px auto" }}>

      {/* NAVBAR */}
      <div
        style={{
          display: "flex",
          gap: "100px",
          padding: "15px",
          position: "absolute",
          alignItems: "center",
          top: "20px",
          fontWeight: "bold",
          borderBottom: "2px solid black",
          width: "90%",
          background: "white",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "black", fontSize: "20px" }}>
          Dashboard
        </Link>

        <Link to="/code/123" style={{ textDecoration: "none", color: "black", fontSize: "20px" }}>
          Stats
        </Link>

        <Link to="/healthz" style={{ textDecoration: "none", color: "black", fontSize: "20px" }}>
          Health
        </Link>

        <div style={{ marginLeft: "auto", display: "flex", gap: "15px" }}>
          {!token && (
            <>
              <button onClick={() => { setShowRegister(true); setShowLogin(false); }}>
                Register
              </button>

              <button onClick={() => { setShowLogin(true); setShowRegister(false); }}>
                Login
              </button>
            </>
          )}

          {token && (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "red",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* REGISTER UI */}
      {showRegister && (
        <div
          style={{
            width: "400px",
            border: "1px solid #ccc",
            padding: "20px",
            backgroundColor: "black",
            borderRadius: "10px",
            textAlign: "center",
            marginTop: "100px",
          }}
        >
          <h3 style={{ color: "white" }}>Register</h3>
          <form onSubmit={handleRegister}>
            <input type="text" placeholder="Name" value={regName} onChange={(e) => setRegName(e.target.value)}
              required style={{ width: "70%", padding: "10px", marginBottom: "10px" }} />

            <input type="email" placeholder="Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)}
              required style={{ width: "70%", padding: "10px", marginBottom: "10px" }} />

            <input type="password" placeholder="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)}
              required style={{ width: "70%", padding: "10px", marginBottom: "10px" }} />

            <button type="submit" style={{ width: "30%", backgroundColor: "rgb(8, 203, 0)" }}>
              Register
            </button>
          </form>
        </div>
      )}

      {/* LOGIN UI */}
      {showLogin && (
        <div
          style={{
            width: "400px",
            border: "1px solid #ccc",
            padding: "20px",
            backgroundColor: "black",
            borderRadius: "10px",
            textAlign: "center",
            marginTop: "100px",
          }}
        >
          <h3 style={{ color: "white" }}>Login</h3>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required style={{ width: "70%", padding: "10px", marginBottom: "10px" }} />

            <input type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              required style={{ width: "70%", padding: "10px", marginBottom: "10px" }} />

            <button type="submit" style={{ width: "30%", backgroundColor: "rgb(8, 203, 0)" }}>
              Login
            </button>
          </form>
        </div>
      )}

      {/* HEALTH STATUS UI */}
      {!showLogin && !showRegister && (
        <div
          style={{
            width: "800px",
            border: "1px solid #ccc",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "10px",
            marginTop: "120px",
          }}
        >
          {loading ? (
            <p>Loading health status...</p>
          ) : (
            <>
              <p style={{color:"black"}}>
                <strong style={{color:"black"}}>Server Status:</strong>{" "}
                <span style={{ color: health?.ok ? "green" : "red" }}>
                  {health?.ok ? "Online" : "Offline"}
                </span>
              </p>

              <p style={{color:"black"}}><strong style={{color:"black"}}>Version:</strong> {health?.version || "N/A"}</p>

              <p style={{color:"black"}}>
                <strong style={{color:"black"}}>Database:</strong>{" "}
                {health?.db === "ok" ? (
                  <span style={{ color: "green" }}>Connected</span>
                ) : (
                  <span style={{ color: "red" }}>Disconnected</span>
                )}
              </p>

              <p style={{color:"black"}}><strong style={{color:"black"}}>Time:</strong> {new Date().toLocaleString()}</p>

              {health?.error && (
                <p style={{ color: "red" }}>
                  <strong>Error:</strong> {health.error}
                </p>
              )}

              <button
                onClick={fetchHealth}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Refresh Status
              </button>
            </>
          )}
        </div>
      )}

    </div>
  );
}
