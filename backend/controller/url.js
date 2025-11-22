import pool from "../db/db.js";
import { shortId } from "../utils/idgenerate.js";
import validator from "validator";


export const getByShortCode = async (req, res) => {
    const { code } = req.params;
  
    try {
      const result = await pool.query(
        "SELECT * FROM urls WHERE short_code = $1",
        [code]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Short code not found" });
      }
  
      return res.json(result.rows[0]);
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  export const deleteByShortCode = async (req, res) => {
    const userID = req.user.id;
    const { code } = req.params;
  
    try {
      const result = await pool.query(
        "DELETE FROM urls WHERE short_code = $1 AND user_id = $2 RETURNING *",
        [code, userID]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "URL not found or unauthorized" });
      }
  
      return res.json({ message: "URL deleted successfully" });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };
  
  

export const getUserLinks = async (req, res) => {
    try {
        const userID = req.user.id;
        console.log(userID)
    
        const result = await pool.query(
          "SELECT id, long_url, short_code, created_at, click_count, last_clicked FROM urls WHERE user_id = $1 ORDER BY created_at DESC",
          [userID]
        );
    
        return res.status(200).json({
          links: result.rows,
        });
    
      } catch (error) {
        console.error("Error fetching user's links:", error);
        return res.status(500).json({ message: "Server error" });
      }
  };

export const shortUrl = async (req, res) => {
 
  const userID = req.user.id;
  console.log(userID)
  const { longUrl, customCode } = req.body;

  try {

    if (!validator.isURL(longUrl, { require_protocol: true })) {
      return res.status(400).json({ message: "Invalid URL" });
    }


    if (customCode) {
      const exists = await pool.query(
        "SELECT * FROM urls WHERE short_code = $1",
        [customCode]
      );

      if (exists.rowCount > 0) {
        return res.status(409).json({ message: "Custom code already exists" });
      }
    }

    const generatedCode = await shortId();

    const finalCode = customCode || generatedCode;

    await pool.query(
      "INSERT INTO urls(user_id, long_url, short_code) VALUES ($1, $2, $3)",
      [userID, longUrl, finalCode]
    );

    return res.json({
      shortUrl: `http://localhost:3000/api/${finalCode}`,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const redirectUrl = async(req, res) =>{
    const {code} = req.params;

    console.log(code)
    try {
        const result = await pool.query("SELECT * FROM urls WHERE short_code = $1",[code]);
        if(result.rowCount === 0) {
            return res.status(404).send("url is not found")
        }
        const url = result.rows[0];
        console.log(url)

        await pool.query(
            "UPDATE urls SET click_count = click_count + 1, last_clicked = NOW() WHERE short_code = $1",
            [code]
          );
      
       return res.redirect(302, url.long_url)
        
    } catch (error) {
        res.status(500).send("server error")
        
    }
}
