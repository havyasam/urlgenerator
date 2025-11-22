import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db/db.js"




export const register = async(req, res) =>{
  const { name, email, password } = req.body;

  try {
  
    const existing = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existing.rowCount > 0){
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);


    await pool.query(
      "INSERT INTO users(name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashed]
    );

    return res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async(req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rowCount === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    console.log(user.rows[0].id)
    console.log(user.rows[0].email)

    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    console.log(token)

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  return res.json({ message: "User logged out successfully" });
};
