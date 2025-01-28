import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import vedioRoutes from './routes/fetchVediosinDb.route.js';
import authRoutes from './routes/auth.route.js';
import fetchUsers from './routes/fetchUsers.route.js';
import sendNotification from './routes/notification.route.js';
import cookieParser from 'cookie-parser';
import { createClient } from '@supabase/supabase-js';
import { connectToDb, supabase } from './db/supadb.js';
import path from 'path';
import { deleteOldPosts } from './functions/toDeletePosts.js';
import { deleteOldStories } from './functions/toDeleteStories.js';

dotenv.config();
const Port = process.env.PORT;
const __dirname = path.resolve();

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
app.use('/send-notification', sendNotification);


setInterval(deleteOldPosts, 1 * 60 * 1000);
setInterval(deleteOldStories, 1 * 60 * 1000);

if (process.env.NODE_ENV === "development") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
    })

}


app.listen(Port, (req, res) => {
    console.log(`Server is started at port ${Port}`)
    console.log("hello")
    console.log(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    connectToDb();
})