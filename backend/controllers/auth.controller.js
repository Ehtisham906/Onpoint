import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { generateToken } from "../lib/utils.js";
import { supabase } from '../db/supadb.js';


dotenv.config();

export const signupAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    const { data: existingAdmins, error: findError } = await supabase
      .from("admin")
      .select("*")
      .eq("email", email);

    if (findError) {
      console.log("Error finding admin:", findError.message);
      return res.status(500).json({ message: "Error checking for existing admin" });
    }

    if (existingAdmins.length > 0) {
      return res.status(400).json({ message: "Admin already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error: insertError } = await supabase
      .from("admin")
      .insert([
        {
          id: genRandomUUID(),
          fullName,
          email,
          password: hashedPassword,
        },
      ])
      .select("*");
    generateToken(data[0].id, res);
    console.log("Headers being sent:", res.getHeaders());

    if (insertError) {
      console.log("Error inserting admin:", insertError.message);
      return res.status(500).json({ message: "Error registering admin" });
    }

    res.status(201).json({ message: "Admin registered successfully", data });
  } catch (error) {
    console.log("Error in signupAdmin:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const genRandomUUID = () => {
  return crypto.randomUUID();
};


export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Both email and password are required" });
    }

    const { data: admin, error: findError } = await supabase
      .from("admin")
      .select("*")
      .eq("email", email)
      .single();

    if (findError || !admin) {
      console.log("Error finding admin:", findError ? findError.message : "Admin not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(admin.id, res);
    console.log(admin.id)

    res.status(200).json({
      message: "Admin logged in successfully",
      _id: admin.id,
      fullName: admin.fullName,
      email: admin.email,
    });
  } catch (error) {
    console.log("Error in loginAdmin:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logoutAdmin:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const checkAuthAdmin = (req, res) => {

  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};