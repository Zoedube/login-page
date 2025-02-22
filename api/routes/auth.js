import express from "express"
import passport from "passport";
import { register, login, googleAuth, googleCallback } from "../controllers/auth.js";


//Routes for single pages 
const router = express.Router()

router.post("/register", register)
router.post("/login", login)

// Google Auth Routes
router.get("/google", googleAuth);  
router.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", { failureRedirect: "/login", session: true }, (err, user, info) => {
      if (err) {
        console.error("Passport Auth Error:", err); 
        return res.status(500).json({ message: "Authentication failed", error: err.message });
      }
      if (!user) {
        console.error("No User Returned, Info:", info); 
        return res.status(401).json({ message: "No user authenticated", info });
      }
      req.logIn(user, (loginErr) => {
        if (loginErr) {
          console.error("Login Error:", loginErr);
          return res.status(500).json({ message: "Login failed", error: loginErr.message });
        }
        return next(); 
      });
    })(req, res, next);
  },
  googleCallback
);

export default router;