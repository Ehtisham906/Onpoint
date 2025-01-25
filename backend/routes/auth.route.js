// import express from "express";
// import { login, logout, signup, updateProfile, checkAuth } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";

// const router = express.Router();

// //Signup Route
// router.post('/signup', signup)
// //login Route
// router.post('/login', login)
// //logout Route 
// router.post('/logout', logout)

// router.put('/update-profile', protectRoute, updateProfile)

// router.get("/check", protectRoute, checkAuth)
// export default router;



import express from 'express';
import { signupAdmin, loginAdmin, logoutAdmin, checkAuthAdmin } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signupAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/check', protectRoute, checkAuthAdmin);

export default router;
