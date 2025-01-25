import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useUserStore = create((set) => ({
    usersinDb: [],
    isLoading: false,
    error: null,

    fetchUsers: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/fetchUsers/users");
            // Extract the "users" field from the response
            const users = response.data.users;
            set({ usersinDb: users, error: null, isLoading: false });
        } catch (error) {
            console.error("Error in fetchUsers:", error);
            set({ usersinDb: [], error: "Failed to fetch users", isLoading: false });
        }
    },
}));
