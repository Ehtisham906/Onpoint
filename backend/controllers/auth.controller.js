// import { generateToken } from "../lib/utils.js";
// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs"; 

// export const signup = async (req, res) => {
//   const { fullName, email, password } = req.body;
//   try {
//     if (!fullName || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     if (password.length < 6) {
//       return res.status(400).json({ message: "Password must be at least 6 characters" });
//     }

//     const user = await User.findOne({ email });

//     if (user) return res.status(400).json({ message: "Email already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       fullName,
//       email,
//       password: hashedPassword,
//     });

//     if (newUser) {
//       // generate jwt token here
//       generateToken(newUser._id, res);
//       await newUser.save();

//       res.status(201).json({
//         _id: newUser._id,
//         fullName: newUser.fullName,
//         email: newUser.email,
//         profilePic: newUser.profilePic,
//       });
//     } else {
//       res.status(400).json({ message: "Invalid user data" });
//     }
//   } catch (error) {
//     console.log("Error in signup controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     generateToken(user._id, res);

//     res.status(200).json({
//       _id: user._id,
//       fullName: user.fullName,
//       email: user.email,
//       profilePic: user.profilePic,
//     });
//   } catch (error) {
//     console.log("Error in login controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export const logout = (req, res) => {
//   try {
//     res.cookie("jwt", "", { maxAge: 0 });
//     res.status(200).json({ message: "Logged out successfully" });
//   } catch (error) {
//     console.log("Error in logout controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



// export const checkAuth = (req, res) => {
//   try {
//     res.status(200).json(req.user);
//   } catch (error) {
//     console.log("Error in checkAuth controller", error.message);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };



import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { generateToken } from "../lib/utils.js";


dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const signupAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if admin with the email already exists
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

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the admin into the database
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
      .select("*"); // Explicitly select the inserted row
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
  return crypto.randomUUID(); // Use this if you're in Node.js 16+
};


export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Both email and password are required" });
    }

    // Check if admin exists in the database
    const { data: admin, error: findError } = await supabase
      .from("admin")
      .select("*")
      .eq("email", email)
      .single(); // `single()` ensures it only returns one admin or none

    if (findError || !admin) {
      console.log("Error finding admin:", findError ? findError.message : "Admin not found");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token for the logged-in admin
    generateToken(admin.id, res);
    console.log(admin.id)

    // Send back admin data (excluding the password)
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
    // const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT
    // req.user = decoded; // Attach the decoded user data to the request

    // Send the user data back as a response
    res.status(200).json(req.user); 
  } catch (error) {
    console.log("Error in checkAuth controller:", error.message);
    res.status(401).json({ message: "Invalid or expired token" }); // If verification fails
  }
};