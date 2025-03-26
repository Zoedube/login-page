import express from "express"
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session"; 
import { db } from "./db.js"; 


dotenv.config();

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://login-pi-ecru.vercel.app",
  credentials: true,
}));
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false })); 
app.use(passport.initialize());
app.use(passport.session()); 

// Google OAuth setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://login-page-1-g98u.onrender.com/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google Profile:", profile); 
      try {
        const q = "SELECT * FROM user WHERE email = ?";
        db.query(q, [profile.emails[0].value], (err, data) => {
          if (err) {
            console.error("DB Error (SELECT):", err);
            return done(err);
          }
          console.log("DB Result:", data); 
          if (data.length) {
            return done(null, { id: data[0].id, ...data[0] });
          } else {
            const q = "INSERT INTO user (username, email) VALUES (?, ?)";
            const values = [profile.displayName, profile.emails[0].value];
            db.query(q, values, (err, result) => {
              if (err) {
                console.error("DB Error (INSERT):", err);
                return done(err);
              }
              console.log("Inserted User ID:", result.insertId); 
              return done(null, { id: result.insertId, username: profile.displayName, email: profile.emails[0].value });
            });
          }
        });
      } catch (err) {
        console.error("Strategy Error:", err);
        return done(err);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user for session
passport.deserializeUser((user, done) => {
  done(null, user);
});


app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.get("/test", (req, res)=> {
  res.json("It works!")
})

// Listen on the .env port
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
