import admin from '../firebase-admin-config.js';

const sendNotification = async (fcmToken, eventDetails) => {
  const message = {
    notification: {
      title: `Event Alert: ${eventDetails.title}`,
      body: `Details: ${eventDetails.description}\nDate: ${eventDetails.date}`,
    },
    token: fcmToken, // Target a specific device
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Notification sent successfully:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export default sendNotification;
