import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { axiosInstance } from '../lib/axios.js';

const defaultPosition = [33.6844, 73.0479]; // Default location (Islamabad, Pakistan)

const Notifications = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [latLng, setLatLng] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    const [loading, setLoading] = useState(false);
    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const sendNotification = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post('/send-notification/', {
                title,
                body,
                eventDetails,
                eventLocation,
                latitude: latLng?.[0],
                longitude: latLng?.[1],
                startDate,
                endDate
            });

            alert('Notification sent successfully to all users!');
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification.');
            setLoading(false);
        }
    };

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setLatLng([lat, lng]);
                setEventLocation(`Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`);
            }
        });

        return latLng ? (
            <Marker position={latLng} icon={L.icon({ iconUrl: markerIconPng, shadowUrl: markerShadowPng })} />
        ) : null;
    };

    return (
        <div className="text-center mt-16 h-full">
            <div className="flex rounded-lg overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
                <div className={`w-full mt-4 ${isSidebarOpen ? 'ml-[150px] lg:ml-[250px]' : 'ml-[50px]'}`}>
                    <h1 className='text-3xl md:text-5xl'>Send Notification to All Users</h1>
                    <p>Fill the below form to send a notification to all users.</p>
                    <form onSubmit={sendNotification} className='mt-10 pb-12'>
                        <div className='p-2 md:p-0 md:w-[60%] mx-auto flex flex-col gap-8 text-primary 
                        '>
                            <div className='flex flex-col gap-2 items-start'>
                                <label className="font-bold text-2xl">Title:</label>
                                <input
                                    type="text"
                                    className="border rounded-md w-full p-2 text-black"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    placeholder='Event title'
                                />
                            </div>
                            <div className='flex flex-col gap-2 items-start'>
                                <label className="font-bold text-2xl">Body:</label>
                                <textarea
                                    value={body}
                                    className="border rounded-md w-full p-2 text-black"
                                    placeholder='Event body'
                                    onChange={(e) => setBody(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-2 items-start'>
                                <label className="font-bold text-2xl">Select Event Category:</label>

                                <select
                                    className="border rounded-md w-full p-2 mt-2 text-black"
                                    value={eventDetails}
                                    onChange={(e) => setEventDetails(e.target.value)}
                                >
                                    <option value="">
                                    </option>
                                    <option value="workshops and Seminars">Workshops and Seminars
                                    </option>
                                    <option value="entertainment and Leisure">Entertainment and Leisure
                                    </option>
                                    <option value="Corporate and Networking Events">Corporate and Networking Events</option>
                                    <option value="Community and Cultural Events">Community and Cultural Events</option>
                                    <option value="Sports and Fitness">Sports and Fitness</option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-2 items-start'>
                                <label className="font-bold text-2xl">Start Date & Time:</label>
                                <input
                                    type="datetime-local"
                                    className="border rounded-md w-full p-2 text-black"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className='flex flex-col gap-2 items-start'>
                                <label className="font-bold text-2xl">End Date & Time:</label>
                                <input
                                    type="datetime-local"
                                    className="border rounded-md w-full p-2 text-black"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>


                            <div className='flex flex-col gap-2 items-start'>
                                <label className="font-bold text-2xl">Select Event Location:</label>
                                <MapContainer center={defaultPosition} zoom={10} style={{ height: "400px", width: "100%" }}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <LocationMarker />
                                </MapContainer>
                                <input
                                    type="text"
                                    className="border rounded-md w-full p-2 mt-2 text-black"
                                    placeholder="Selected location"
                                    value={eventLocation}
                                    readOnly
                                />
                            </div>
                            <button type="submit" disabled={loading} className={`mx-auto w-fit p-2 rounded-xl text-white ease-in-out duration-300 ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-primary hover:scale-105"}`}>
                                Send Notification
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Notifications;

