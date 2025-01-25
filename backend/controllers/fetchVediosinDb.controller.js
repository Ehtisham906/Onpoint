import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch all video posts from the "posts" table.
 */
export const fetchVediosinDb = async (req, res) => {
    try {
        const { data, error } = await supabase.from('posts').select('*');

        if (error) {
            console.error('Error fetching posts:', error.message);
            return res.status(500).json({ message: 'Error fetching posts', error: error.message });
        }

        res.status(200).json({ message: 'All video posts fetched successfully', data });
    } catch (err) {
        console.error('Unexpected error:', err.message);
        res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
    }
};

/**
 * Hide a specific post by updating the `is_hidden` field to true.
 */
export const hidePost = async (req, res) => {
    const { post_id } = req.body;

    try {
        if (!post_id) {
            return res.status(400).json({ message: 'Post ID is required' });
        }

        const { data, error } = await supabase
            .from('posts')
            .update({ is_hidden: true })
            .eq('post_id', post_id)
            .select();

        if (error) {
            console.error('Error hiding post:', error.message);
            return res.status(500).json({ message: 'Failed to hide the post', error: error.message });
        }

        res.status(200).json({ message: 'Post hidden successfully', data });
    } catch (error) {
        console.error('Internal server error:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

/**
 * Unhide a specific post by updating the `is_hidden` field to false.
 */
export const unhidePost = async (req, res) => {
    const { post_id } = req.body;

    try {
        if (!post_id) {
            return res.status(400).json({ message: 'Post ID is required' });
        }

        const { data, error } = await supabase
            .from('posts')
            .update({ is_hidden: false })
            .eq('post_id', post_id)
            .select();

        if (error) {
            console.error('Error unhiding post:', error.message);
            return res.status(500).json({ message: 'Failed to unhide the post', error: error.message });
        }

        res.status(200).json({ message: 'Post unhidden successfully', data });
    } catch (error) {
        console.error('Internal server error:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const stories = async (req, res) => {
    try {
        const { data, error } = await supabase.from('story').select('*');

        if (error) {
            console.error('Error fetching posts:', error.message);
            return res.status(500).json({ message: 'Error fetching posts', error: error.message });
        }

        res.status(200).json({ message: 'All video posts fetched successfully', data });
    } catch (err) {
        console.error('Unexpected error:', err.message);
        res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
    }
}