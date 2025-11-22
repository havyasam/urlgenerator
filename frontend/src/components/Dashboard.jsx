import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegCopy } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [myLinks, setMyLinks] = useState([]);


  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [longUrl, setLongUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");

  // LOGIN

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:3000/api/links", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => setMyLinks(res.data.links))
      .catch(() => {});
    }
  }, [token]);
  

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

  // REGISTER
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

  // SHORT URL
  const handleShorten = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/shorten",
        { longUrl, customCode },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      setGeneratedUrl(res.data.shortUrl);
    } catch (err) {
      alert(err.response?.data?.message || "Error creating short URL");
    }
  };

  return (
    <div style={{ width: "100%",  maxWidth: "900px", margin: "40px auto" }}>

     
      <div
        style={{
          display: "flex",
          gap: "150px",
          padding: "15px",
          position:"absolute",
          
          alignItems: "center",
          top:"20px",
          fontWeight: "bold",
          borderBottom: "2px solid black",
        }}
      >
        <Link to="/" style={{ textDecoration: "none", color: "black",fontWeight:"bold", fontSize:"20px" }}>
          Dashboard
        </Link>

        <Link to="/code/" style={{ textDecoration: "none", color: "black",fontWeight:"bold", fontSize:"20px" }}>
          Stats
        </Link>

        <Link
          to="/healthz"
          style={{ textDecoration: "none", color: "black" ,fontWeight:"bold", fontSize:"20px"}}
        >
          Health
        </Link>

        
        <div style={{ marginLeft: "auto", display: "flex", gap: "15px" }}>
          {!token && (
            <>
              <button
                onClick={() => {
                  setShowRegister(true);
                  setShowLogin(false);
                }}
                style={{ cursor: "pointer" }}
              >
                Register
              </button>

              <button
                onClick={() => {
                  setShowLogin(true);
                  setShowRegister(false);
                }}
                style={{ cursor: "pointer" }}
              >
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

      
      {showRegister && (
        <div
          style={{
            width: "400px",
            border: "1px solid #ccc",
            paddingBottom: "40px",
            padding: "10px",
            backgroundColor: "black",
            borderRadius: "10px",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <h3 style={{ color: "white" }}>Register</h3>
          <form onSubmit={handleRegister}>
            <input
              type="name"
              placeholder="Name"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              required
              style={{
                fontSize: "15px",
                width: "70%",
                marginBottom: "10px",
                paddingLeft: "10px",
                paddingBottom: "15px",
                paddingTop: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
                color: "black",
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
              style={{
                fontSize: "15px",
                width: "70%",
                marginBottom: "10px",
                paddingLeft: "10px",
                paddingBottom: "15px",
                paddingTop: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
                color: "black",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={regPassword}
              onChange={(e) => setRegPassword(e.target.value)}
              required
              style={{
                width: "70%",
                marginBottom: "10px",
                paddingLeft: "10px",
                paddingBottom: "15px",
                paddingTop: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
                color: "black",
              }}
            />
            <button
              type="submit"
              style={{ width: "30%", backgroundColor: "rgb(8, 203, 0)" }}
            >
              Register
            </button>
          </form>
        </div>
      )}

      
      {showLogin && (
        <div
          style={{
            width: "400px",
            border: "1px solid #ccc",
            paddingBottom: "40px",
            padding: "10px",
            backgroundColor: "black",
            borderRadius: "10px",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <h3 style={{ color: "white" }}>Login</h3>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                fontSize: "15px",
                width: "70%",
                marginBottom: "10px",
                paddingLeft: "10px",
                paddingBottom: "15px",
                paddingTop: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
                color: "black",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                fontSize: "15px",
                width: "70%",
                marginBottom: "10px",
                paddingLeft: "10px",
                paddingBottom: "15px",
                paddingTop: "10px",
                backgroundColor: "white",
                borderRadius: "5px",
                color: "black",
              }}
            />
            <button
              type="submit"
              style={{ width: "30%", backgroundColor: "rgb(8, 203, 0)" }}
            >
              Login
            </button>
          </form>
        </div>
      )}

     
      {!showLogin && !showRegister && (
        <>
          <div
            style={{
              width: "800px",
              maxWidth: "800px",
              border: "1px solid #ccc",
              paddingBottom: "40px",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
           <h1 style={{color:"black", fontFamily:"cursive"}}>Bitly Links </h1>
            <form
            
              onSubmit={handleShorten}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <p style={{ color: "black", fontWeight: "bold" }}>
                Destination URL
              </p>
              <input
                type="url"
                placeholder="http://example.com"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
                required
                style={{
                  fontSize: "15px",
                  width: "90%",
                  marginBottom: "10px",
                  paddingLeft: "10px",
                  paddingBottom: "15px",
                  paddingTop: "10px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  color: "black",
                }}
              />
              <p style={{ color: "black", fontWeight: "bold" }}>
                Custom Code (Optional)
              </p>
              <input
                type="text"
                placeholder="docs"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                style={{
                  fontSize: "15px",
                  width: "90%",
                  marginBottom: "10px",
                  paddingLeft: "10px",
                  paddingBottom: "15px",
                  paddingTop: "10px",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  color: "black",
                }}
              />
              <button type="submit" style={{ width: "20%", margin: "30px" }}>
                Create Your Link
              </button>
            </form>

            {/* SHOW SHORT URL */}
            {generatedUrl && (
              <div style={{ marginTop: "20px" }}>
                  
                <strong style={{ color: "black" }}>Short URL:</strong>{" "}
                <a href={generatedUrl} target="_blank">
                  {generatedUrl}
                </a>

                <button
                  style={{
                    marginLeft: "15px",
                    padding: "5px 10px",
                    backgroundColor: "rgb(34, 40, 49)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(generatedUrl);
                    alert("Short URL copied!");
                  }}
                >
                  <FaRegCopy />
                </button>
                
              </div>
            )}
          </div>
        </>
      )}


{token && myLinks.length > 0 && (
  <div
    style={{
      width: "800px",
      maxWidth: "800px",
      marginTop: "30px",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      background: "white"
    }}
  >
    <h2 style={{ color: "black", fontFamily: "cursive" }}>My Links</h2>

    {myLinks.map((link, index) => (
       
      <div
        key={index}
        style={{
          marginBottom: "10px",
          padding: "10px",
          borderBottom: "1px solid #ddd"
        }}
      >
         
          <p style={{color:"black"}}>
          <strong style={{color:"black"}}>Long URL: {link.long_url}</strong>{" "}
        </p>
        <p>

          <strong style={{color:"black"}}>Short:</strong>{" "}
          <a
            href={`http://localhost:3000/api/${link.short_code}`}
            target="_blank"
          >
            http://localhost:3000/api/{link.short_code}
          </a>
        </p>
        {/* <p style={{color:"black"}}>
          <strong style={{color:"black"}}>created At: {link.created_at}</strong>{" "}
        </p>
        <p style={{color:"black"}}>
          <strong style={{color:"black"}}>Last clicked: {link.last_clicked}</strong>{" "}
        </p>
        <p style={{color:"black"}}>
          <strong style={{color:"black"}}>Click count: {link.click_count}</strong>{" "}
        </p> */}

        <button><Link to={`/code/${link.short_code}`} style={{ color: "white", fontWeight: "bold" }} >view stat</Link></button>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default Dashboard;
