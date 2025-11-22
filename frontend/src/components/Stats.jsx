
import { Link, useNavigate, useParams} from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";



export default function Stats() {
    const { code } = useParams();
    const [urlData, setUrlData] = useState(null);

    useEffect(() => {
        if (!code) return;
        console.log(code)
      
        const fetchUrlData = async () => {
          try {
              console.log("hii")
            const res = await axios.get(`http://localhost:3000/api/links/${code}`);
            console.log("heloo")
            setUrlData(res.data);
          } catch (err) {
            alert("Invalid or expired short code");
          }
        };
      
        fetchUrlData();
      }, [code]);

      
      const deleteUrl = async () => {
        try {
          await axios.delete(`http://localhost:3000/api/${code}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
      
          alert("URL deleted successfully!");
          navigate("/");
        } catch (err) {
          alert(err.response?.data?.message || "Delete failed");
        }
      };
      


    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  
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
  
  
  return (
<div style={{ width: "100%",  maxWidth: "900px", margin: "40px auto" }}>

     
<div
  style={{
    display: "flex",
    gap: "100px",
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

  <Link to="/code/123" style={{ textDecoration: "none", color: "black",fontWeight:"bold", fontSize:"20px" }}>
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
      <h2 style={{ color: "black" }}>Stats for code: {code}</h2>

{urlData ? (
  <div style={{ marginTop: "20px" }}>
    <p style={{color:"black"}}><strong style={{color:"black"}}>Long URL:</strong> {urlData.long_url}</p>

    <p style={{color:"black"}}>
      <strong style={{color:"black"}}>Short URL:</strong>{" "}
      <a href={`http://localhost:3000/${urlData.short_code}`} target="_blank">
        http://localhost:3000/{urlData.short_code}
      </a>
    </p>
    
    <p style={{color:"black"}}><strong style={{color:"black"}}>Created At:</strong> {urlData.created_at}</p>
    <p style={{color:"black"}}><strong style={{color:"black"}}>last clicked:</strong> {urlData.last_clicked}</p>
    <p style={{color:"black"}}><strong style={{color:"black"}}>click count:</strong> {urlData.click_count}</p>
    {token && (
      <button
        onClick={deleteUrl}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          marginTop: "20px",
          cursor: "pointer"
        }}
      >
        Delete URL
      </button>
    )}
  </div>
) : (
  <p style={{ marginTop: "20px" }}>Loading URL details...</p>
)}
</div>
</>
  )}
</div>

  )
}

