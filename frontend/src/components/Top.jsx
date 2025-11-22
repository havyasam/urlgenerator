import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Top() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 20px",
        backgroundColor: "#eaeaea",
        marginBottom: "20px",
      }}
    >
      {/* LEFT SIDE NAV LINKS */}
      <div>
        <Link style={{ marginRight: "20px" }} to="/">Dashboard</Link>
        <Link style={{ marginRight: "20px" }} to="/healthz">Health</Link>
      </div>

      {/* RIGHT SIDE AUTH BUTTONS */}
      <div>
        {!token ? (
          <>
            <button onClick={() => navigate("/login")} style={{ marginRight: "10px" }}>
              Login
            </button>

            <button onClick={() => navigate("/register")}>
              Register
            </button>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Top;
