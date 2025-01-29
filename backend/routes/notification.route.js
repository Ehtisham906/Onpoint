import express from "express";
import { sendNotification } from "../controllers/notification.controller.js";


const router = express.Router();

router.post('/to-users', sendNotification);

export default router;