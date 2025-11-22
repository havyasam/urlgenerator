import express from "express";
import { register, login, logout } from "../controller/auth.js";
import { shortUrl, redirectUrl, getUserLinks,deleteByShortCode,getByShortCode } from "../controller/url.js";
import { auth } from "../middleware/auth.js";
import pool from "../db/db.js";

const router = express.Router();

router.use(express.json());

router.get("/healthz", async(req, res) => {
    try {
        // Check DB connectivity
        const dbCheck = await pool.query("SELECT 1");
    
        res.status(200).json({
          ok: true,
          version: "1.0",
          db: "ok",
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        res.status(500).json({
          ok: false,
          version: "1.0",
          db: "error",
          error: "Database connection failed",
          timestamp: new Date().toISOString(),
        });
      }
  });


router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout); 


router.get("/api/links", auth, getUserLinks);
router.post("/shorten", auth, shortUrl);
router.get("/api/:code", redirectUrl)
router.get("/api/links/:code", getByShortCode)
router.delete("/api/:code", auth, deleteByShortCode)



export default router;
