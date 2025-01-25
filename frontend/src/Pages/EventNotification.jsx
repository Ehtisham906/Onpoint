import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';

const EventNotification = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
    });

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Event Data:', eventData);
        // Add logic to handle form submission (e.g., API call)
    };

    return (
        <div className="mt-16 h-screen flex">
            <Sidebar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
            <div
                className={`${
                    isSidebarOpen ? 'ml-[150px] lg:ml-[250px]' : 'ml-[50px]'
                } flex flex-col items-center w-full p-6`}
            >
                <h1 className="text-4xl font-bold mb-6">Create Event Notification</h1>
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md  bg-white p-6 rounded-lg shadow-2xl border"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={eventData.title}
                            onChange={handleChange}
                            placeholder="Enter Event Name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={eventData.description}
                            onChange={handleChange}
                            placeholder="Enter Event Description"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="date"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Date
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={eventData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="time"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Time
                        </label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={eventData.time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventNotification;
