import Sidebar from '../Components/Sidebar';
import React, { useEffect, useState } from 'react';
import { useVideoStore } from '../store/useVideoStore';

const Stories = () => {
    const { storiesPosts, fetchStories, loading, error } = useVideoStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        fetchStories();
    }, [fetchStories]);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="mt-16 flex gap-8">
            <Sidebar isOpen={isSidebarOpen} onToggle={handleToggleSidebar} />
            <div
                className={`${
                    isSidebarOpen ? 'ml-[150px] lg:ml-[250px]' : 'ml-[50px]'
                } flex flex-col items-center w-full`}
            >
                <h1 className="text-3xl md:text-6xl">Stories</h1>
                {loading ? (
                    <p className="text-green-500">Loading stories...</p>
                ) : error ? (
                    <p className="text-red-500">Error loading stories: {error}</p>
                ) : (
                    <div className="flex flex-wrap gap-10 justify-center mt-4">
                        {storiesPosts.length === 0 ? (
                            <p className="text-green-500">No stories available.</p>
                        ) : (
                            storiesPosts.map((post) => {
                                const userDetails = JSON.parse(post.userdetails || '{}');
                                return (
                                    <div
                                        key={post.postid}
                                        className="border w-[250px] items-center border-black p-2 rounded shadow-lg bg-white"
                                    >
                                        <div className="text-sm mb-2">
                                            <p>
                                                <strong>Location: </strong>
                                                {post.location || 'N/A'}
                                            </p>
                                            <p>
                                                <strong>Posted by: </strong>
                                                {userDetails.name?.toUpperCase() || 'Unknown'}
                                            </p>
                                            <p>
                                                <strong>Username: </strong>
                                                {userDetails.username || 'N/A'}
                                            </p>
                                        </div>
                                        <img
                                            src={post.mediaurl}
                                            width="200px"
                                            height="200px"
                                            alt={post.description || 'Story Image'}
                                            className="rounded"
                                        />
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stories;
