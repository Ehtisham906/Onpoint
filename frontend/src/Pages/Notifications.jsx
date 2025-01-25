import axios from 'axios';

const sendEventNotification = async (fcmToken) => {
  const eventDetails = {
    title: 'Hackathon 2025',
    description: 'Join our upcoming hackathon.',
    date: '2025-02-01',
  };

  try {
    const response = await axios.post('http://localhost:4000/send-notification', {
      fcmToken,
      eventDetails,
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

export default sendEventNotification;