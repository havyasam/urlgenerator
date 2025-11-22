import express from "express";
import dotenv from "dotenv";
import db from "./db/db.js";
import router from "./routes/auth.js";
import cors from 'cors'


dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to the home page");
});

app.use("/", router)

async function startServer() {
    
    app.listen(3000, () => {
        
      console.log(`Express server listening 3000`);
    });
  }
  

  startServer();
