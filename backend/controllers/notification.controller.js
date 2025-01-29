import { supabase } from '../db/supadb.js';
import admin from '../firebase-admin-config.js'; 

export const sendNotification = async (req, res) => {
    const { title, body, eventDetails, eventLocation, startDate, endDate } = req.body;

    if (!title || !body || !eventLocation || !startDate || !endDate) {
        return res.status(400).json({ error: 'Missing required fields (title, body, eventLocation, startDate, endDate).' });
    }

    const message = {
        notification: {
            title: title,
            body: body,
        },
        data: {
            eventLocation: JSON.stringify(eventLocation),
            eventDetails: JSON.stringify(eventDetails),
            startDate: startDate,
            endDate: endDate,
        },
        topic: 'all_users',
    };

    try {
        const response = await admin.messaging().send(message);

        const { data, error } = await supabase
            .from('eventdetails')
            .insert([
                {
                    title: title,
                    body: body,
                    event_details: eventDetails,
                    event_location: eventLocation,
                    start_date: startDate,
                    end_date: endDate,
                },
            ]);

        if (error) throw error;

        res.status(200).json({
            success: true,
            message: 'Notification sent & event stored successfully!',
            firebaseResponse: response,
            supabaseResponse: data,
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to send notification or store event in database.' });
    }
};
