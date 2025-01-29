import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import LoginPage from "./Pages/LoginPage";
import Navbar from "./Components/Navbar";
import Users from "./Pages/Users";
import HiddenPosts from "./Pages/HiddenPosts";
import Notifications from "./Pages/Notifications";
import Stories from "./Pages/Stories";

// import { messaging } from "./firebase-config";
// import { getToken, onMessage } from "firebase/messaging";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const [fcmToken, setFcmToken] = useState("");

  // Register service worker and request FCM token
  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker
  //       .register("/firebase-messaging-sw.js")
  //       .then((registration) => {
  //         console.log("Service Worker registered:", registration.scope);
  //       })
  //       .catch((error) => {
  //         console.error("Service Worker registration failed:", error);
  //       });
  //   }

  //   // Request FCM token
  //   getToken(messaging, {
  //     vapidKey: "BM3aa4lk2oXEhapwpHS8QO8-WkWoB4np26NXjqdYSVYALdgDpw_LD75mNG0UmvlL0DCotM9Nh74PGB-nFMALlSc",
  //   })
  //     .then((token) => {
  //       console.log("FCM Token:", token);
  //       if (token) {
  //         setFcmToken(token);
  //         // Optionally send token to your backend
  //       } else {
  //         console.warn("No registration token available.");
  //       }
  //     })
  //     .catch((err) => {
  //       console.error("Error retrieving FCM token:", err);
  //     });

  //   // Listen for foreground messages
  //   const unsubscribe = onMessage(messaging, (payload) => {
  //     console.log("Foreground message received:", payload);
  //   });

  //   return () => unsubscribe();
  // }, []);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/users" element={!authUser ? <LoginPage /> : <Users />} />
        <Route path="/hidden-posts" element={!authUser ? <LoginPage /> : <HiddenPosts />} />
        <Route path="/event-notification" element={!authUser ? <LoginPage /> : <Notifications />} />
        <Route path="/stories-page" element={<Stories />} />
      </Routes>
      <Toaster />
    </>
  );  
}

export default App;
