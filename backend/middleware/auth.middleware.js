import { createClient } from '@supabase/supabase-js';
import jwt from "jsonwebtoken";



export const protectRoute = async (req, res, next) => {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const token = req.cookies.jwt;
    // Check if a token is provided
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded",decoded.userId)
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Fetch the user from the Supabase database
    const { data: user, error } = await supabase
      .from("admin") // Replace "admin" with your Supabase table name for users
      .select("*")
      .eq("id", decoded.userId) // Match the user ID from the decoded JWT
      .single(); // Fetch a single record

    if (error || !user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object to the request for later use
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
