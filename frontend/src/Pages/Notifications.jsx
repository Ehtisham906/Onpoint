import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const defaultPosition = [33.6844, 73.0479]; // Default location (Islamabad, Pakistan)

const Notifications = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [latLng, setLatLng] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const sendNotification = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5001/send-notification', {
                title,
                body,
                eventDetails,
                eventLocation,
                latitude: latLng?.[0],
                longitude: latLng?.[1]
            });

            alert('Notification sent successfully to all users!');
        } catch (error) {
            console.error('Error sending notification:', error);
            alert('Failed to send notification.');
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
                    <h1 className='text-5xl'>Send Notification to All Users</h1>
                    <p>Fill the below form to send a notification to all users.</p>
                    <form onSubmit={sendNotification} className='mt-10'>
                        <div className='w-[60%] mx-auto flex flex-col gap-8 text-primary'>
                            <div className='flex flex-col gap-2 items-start'>
                                <label className="font-bold text-2xl">Title:</label>
                                <input
                                    type="text"
                                    className="border rounded-md w-full p-2"
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
                                    className="border rounded-md w-full p-2"
                                    placeholder='Event body'
                                    onChange={(e) => setBody(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-2 items-start'>
                                <label className="font-bold text-2xl">Select Event dEtails:</label>

                                <input
                                    type="text"
                                    className="border rounded-md w-full p-2 mt-2"
                                    placeholder="Event details"
                                    value={eventDetails}
                                    onChange={(e) => setEventDetails(e.target.value)}
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
                                    className="border rounded-md w-full p-2 mt-2"
                                    placeholder="Selected location"
                                    value={eventLocation}
                                    readOnly
                                />
                            </div>
                            <button type="submit" className="bg-primary mx-auto text-white hover:scale-105 ease-in-out duration-300 w-fit p-2 rounded-xl">
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

