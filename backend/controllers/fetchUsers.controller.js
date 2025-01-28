
import { supabase } from '../db/supadb.js';
 

export const fetchUsers = async (req, res) => {
    try {
        const { data: users, error: findError } = await supabase
            .from("users")
            .select("*");
        if (findError) {
            return res.status(500).json({ message: "Error fetching users" });
        }
        res.status(200).json({ message: "Users fetched successfully", users });

    } catch (error) {
        console.error("Error in fetchUsers:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}