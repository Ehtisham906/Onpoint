import { useEffect } from "react";
import { useVideoStore } from "../store/useVideoStore";
import { Link } from 'react-router-dom'
import Sidebar from "../Components/Sidebar";
const HomePage = () => {
    const { fetchVideoPosts, videoPosts, loading, error, hidePost } = useVideoStore();


    useEffect(() => {
        fetchVideoPosts();

    }, [fetchVideoPosts]);


    // Function to hide the post and update UI
    const handleHidePost = async (post_id) => {
        await hidePost(post_id);
        fetchVideoPosts(); // Refresh the video posts after hiding
    };

    return (
        <div className="text-center mt-16 h-full">
            <div className="flex rounded-lg overflow-hidden">

                <Sidebar />

                <div className="w-full ml-[150px] lg:ml-[250px]">
                    <div>
                        <h1 className="text-6xl">Video Posts</h1>
                        <Link to={"/hidden-posts"} className="text-blue-500">
                            View Hidden Posts
                        </Link>
                    </div>
                    {loading && <p>Loading...</p>}

                    {error && <p style={{ color: "red" }}>Error: {error}</p>}

                    {!loading && !error && videoPosts.length === 0 && (
                        <p>No videos available.</p>
                    )}

                    <div className="mt-10 flex flex-wrap gap-2 sm:gap-[10px] lg:justify-center ">
                        {videoPosts.map((post) => {
                            const userDetails = JSON.parse(post.user_details || "{}"); // Fallback to empty object
                            return (
                                <div
                                    key={post.post_id}
                                    className="border border-black p-[5px] w-[200px] lg:w-[300px] text-left"
                                >
                                    <div>
                                        <div className="flex justify-between p-2">
                                            <h2>
                                                Posted By: <span>{userDetails.name}</span>
                                                <br />
                                                {post.is_hidden ? (
                                                    <p className="text-green-500 font-bold">
                                                        This post is hidden

                                                    </p>
                                                ) : (
                                                    <button onClick={handleHidePost.bind(this, post.post_id)} className="bg-red-500 p-[4px] rounded-md text-white">
                                                        Hide Post
                                                    </button>
                                                )}
                                            </h2>
                                            {userDetails.image_url && (
                                                <img
                                                    src={userDetails.image_url}
                                                    alt={`${userDetails.name}'s profile`}
                                                    className="profile-pic rounded-full object-contain"
                                                    width={60}
                                                />
                                            )}
                                        </div>
                                        <p>
                                            <strong>Description:</strong> {post.description}
                                        </p>

                                        <p>
                                            <strong>Location:</strong> {post.location}
                                        </p>
                                        <p>
                                            <strong>Category:</strong> {post.category}
                                        </p>
                                        <p>
                                            <strong>Likes:</strong> {post.likes_count}
                                        </p>
                                        <p>
                                            <strong>Comments:</strong> {post.comments_count}
                                        </p>
                                        {post.media_url && (
                                            <video
                                                className="mt-[10px] w-full h-auto rounded-md"
                                                controls
                                                width="300"
                                                height="300"
                                            >
                                                <source src={post.media_url} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                    </div>
                                </div>
                            );
                        })} 
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HomePage;
