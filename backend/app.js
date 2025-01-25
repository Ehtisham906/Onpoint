import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vedioRoutes from './routes/fetchVediosinDb.route.js';
import authRoutes from './routes/auth.route.js';
import fetchUsers from './routes/fetchUsers.route.js';
import cookieParser from 'cookie-parser';
import { createClient } from '@supabase/supabase-js';
import path from 'path';
import sendNotification from './notification/sendNotification.js';



dotenv.config();
const Port = process.env.PORT;
const __dirname = path.resolve();

import connectToDb from './db/supadb.js';
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)
 
app.use('/api/vedio_posts', vedioRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/fetchUsers', fetchUsers)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
 
const checkIfTableEmpty = async (tableName) => {
    const { count, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true }); // Fetch only the count, no actual data

    if (error) {
        console.error(`Error checking if ${tableName} is empty:`, error);
        return true; // Assume empty if an error occurs
    }

    return count === 0; // Return true if the table is empty
};

const deleteOldPosts = async () => {
    const isPostsEmpty = await checkIfTableEmpty('posts');
    if (isPostsEmpty) {
        console.log('Posts table is empty. No records to delete.');
        return;
    }

    const { data, error } = await supabase
        .from('posts')
        .delete()
        .lt('updated_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (error) {
        console.error('Error deleting old posts:', error);
    } else {
        console.log('Old posts deleted:', data);
    }
};

const deleteOldStories = async () => {
    const isStoriesEmpty = await checkIfTableEmpty('story');
    if (isStoriesEmpty) {
        console.log('Stories table is empty. No records to delete.');
        return;
    }

    const { data, error } = await supabase
        .from('story')
        .delete()
        .lt('updatedat', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

    if (error) {
        console.error('Error deleting old stories:', error);
    } else {
        console.log('Old stories deleted:', data);
    }
};

// 5 minutes
setInterval(deleteOldPosts, 5 * 60 * 1000);
setInterval(deleteOldStories, 5 * 60 * 1000);

if (process.env.NODE_ENV === "development") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
    })

}
app.post('/send-notification', async (req, res) => {
    const { fcmToken, eventDetails } = req.body;
  
    try {
      await sendNotification(fcmToken, eventDetails);
      res.status(200).send('Notification sent successfully');
    } catch (error) {
      res.status(500).send('Failed to send notification');
    }
  });


app.listen(Port, (req, res) => {
    console.log(`Server is started at port ${Port}`)
    console.log("hello")
    console.log(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    connectToDb();
})