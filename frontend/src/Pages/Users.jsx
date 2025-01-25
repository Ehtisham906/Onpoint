import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import { useUserStore } from '../store/useUserStore.js';

const Users = () => {
    const { fetchUsers, usersinDb, isLoading, error } = useUserStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="mt-16 h-screen flex">
            <Sidebar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
            <div
                className={`gap-2 flex flex-col items-center flex-wrap ${
                    isSidebarOpen ? 'ml-[150px] lg:ml-[250px]' : 'ml-[50px]'
                } w-full p-4`}
            >
                <h1 className="text-4xl">Users</h1>
                {isLoading ? (
                    <p className="text-white">Loading users...</p>
                ) : error ? (
                    <p className="text-white">{error}</p>
                ) : usersinDb.length > 0 ? (
                    <div className="flex flex-wrap gap-4 justify-center">
                        {usersinDb.map((user) => (
                            <div
                                key={user.id}
                                className="flex gap-2 text-white bg-[#B0B2EF] items-center p-4 rounded shadow-2xl text-center"
                            >
                                <div className="text-start">
                                    <h2 className="font-bold">{user.name.toUpperCase()}</h2>
                                    <p className="text-sm">{user.email}</p>
                                </div>
                                {user.image_url ? (
                                    <img
                                        src={user.image_url}
                                        alt={`${user.name}'s profile`}
                                        className="w-16 h-16 rounded-full mx-auto mt-2"
                                    />
                                ) : (
                                    <div className="w-16 h-16 flex justify-center items-center bg-primary rounded-full text-white text-2xl">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-white">No users found.</p>
                )}
            </div>
        </div>
    );
};

export default Users;
