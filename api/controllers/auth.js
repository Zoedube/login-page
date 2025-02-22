import { db } from "../db.js";
import bcrypt from 'bcryptjs';
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Code for Google Authentication Route
export const googleAuth = (req, res, next) => {
  const returnTo = req.query.returnTo || "login"; 
  req.session.returnTo = returnTo; 
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
};

// Code for Google Callback Route
export const googleCallback = (req, res) => {
  console.log("req.user:", req.user); 
  if (!req.user || !req.user.id) {
    return res.status(500).json("Authentication failed: No user data");
  }
  const token = jwt.sign(
    { id: req.user.id },  
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  
  const redirectTo = req.session.returnTo || "login"; 
  res.redirect(`http://localhost:3000/${redirectTo}?token=${token}&googleSuccess=true`);
};

export const register = (req, res) => {

  //Code to check existing user
  const q = "SELECT * FROM user WHERE email = ? OR username = ?"

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Code to create user and hash password 
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO user (`username`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });

  });
};

export const login = (req, res) => {
  console.log(req.body);  

  //Code to check if password credentials are correct
  const q = "SELECT * FROM user WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
    if (!isPasswordCorrect) return res.status(400).json("Wrong username or password");

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    const { password, ...other } = data[0];
    res
      .cookie("access_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" })
      .status(200)
      .json(other);
  });
};
