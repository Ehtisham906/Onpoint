import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import { useVideoStore } from '../store/useVideoStore';

const HiddenPosts = () => {
    const { fetchVideoPosts, videoPosts, loading, error, unhidePost } = useVideoStore();

    useEffect(() => {
        fetchVideoPosts();
    }, [fetchVideoPosts]);

    // Filter hidden posts
    const hiddenPosts = videoPosts.filter((post) => post.is_hidden === true);

    return (
        <div className='mt-16'>
            <div className='flex rounded-lg overflow-hidden'>

                <Sidebar />

                <div className='w-full ml-[150px] lg:ml-[250px] flex flex-col '>
                    <h1 className='text-2xl font-bold text-center p-2'>Hidden Posts</h1>
                    <div className='w-full'>
                        {loading ? (
                            <p>Loading posts...</p>
                        ) : error ? (
                            <p className="text-red-500">Error loading posts: {error}</p>
                        ) : (
                            <div className="mt-10 flex flex-wrap gap-2 sm:gap-[20px] justify-center">
                                {hiddenPosts.length === 0 ? (
                                    <p className='text-green-500'>No hidden posts available.</p>
                                ) : (
                                    hiddenPosts.map((post) => {
                                        const userDetails = JSON.parse(post.user_details || "{}");
                                        return (
                                            <div key={post.post_id} className="border border-black p-2 w-[250px] text-left">
                                                <div >
                                                    <div className="flex justify-between ">
                                                        <h2 className='text-sm'>
                                                            <strong>Posted By:</strong> <span>{userDetails.name}</span>
                                                            <p className="text-green-500 font-bold">This post is hidden</p>
                                                        </h2>
                                                        {userDetails.image_url && (
                                                            <img
                                                                src={userDetails.image_url}
                                                                alt={`${userDetails.name}'s profile`}
                                                                className="profile-pic rounded-full object-contain"
                                                                width={30}
                                                            />
                                                        )}
                                                    </div>
                                                    <p className='text-sm'><strong>Description:</strong> {post.description}</p>
                                                    <p className='text-sm'><strong>Location:</strong> {post.location}</p>
                                                    <p className='text-sm'><strong>Category:</strong> {post.category}</p>
                                                    <p className='text-sm'><strong>Likes:</strong> {post.likes_count}</p>
                                                    <button
                                                        onClick={() => unhidePost(post.post_id)}
                                                        className="mt-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-700 mx-auto text-sm "
                                                    >
                                                        Unhide Post
                                                    </button>
                                                    {post.media_url && (
                                                        <video
                                                            className="mt-[10px]"
                                                            controls
                                                            width="100%"
                                                            height="100px"
                                                        >
                                                            <source src={post.media_url} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    )}

                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HiddenPosts;
