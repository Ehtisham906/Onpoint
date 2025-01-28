import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useVideoStore = create((set) => ({
    videoPosts: [],
    storiesPosts: [],
    loading: true,
    error: null,

    fetchVideoPosts: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get('/vedio_posts/all');
            set({ videoPosts: response.data.data, loading: false });
        } catch (err) {
            set({ videoPosts: [], error: err.message, loading: false });
        }
    },

    hidePost: async (post_id) => {
        try {
            await axiosInstance.post("/vedio_posts/hide", { post_id }); // Adjust the API URL
            toast.success("Post hidden successfully");

            // Optionally, update the state to reflect the change
            set((state) => ({
                videoPosts: state.videoPosts.map((post) =>
                    post.post_id === post_id ? { ...post, is_hidden: true } : post
                ),
            }));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to hide the post");
        }
    },

    unhidePost: async (post_id) => {
        try {
            await axiosInstance.put("/vedio_posts/unhide", { post_id });
            toast.success("Post unhidden successfully");

            set((state) => ({
                videoPosts: state.videoPosts.map((post) =>
                    post.post_id === post_id ? { ...post, is_hidden: false } : post
                ),
            }));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to unhide the post");
        }
    },

    fetchStories: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get('/vedio_posts/stories');
            set({ storiesPosts: response.data.data, loading: false });
        } catch (err) {
            set({ storiesPosts: [], error: err.message, loading: false });
        }
    }
}));
