import Sidebar from '../Components/Sidebar'
import React, { useEffect } from 'react'
import { useVideoStore } from '../store/useVideoStore'

const Stories = () => {
    const { storiesPosts, fetchStories, loading, error } = useVideoStore();
    useEffect(() => {
        fetchStories();
    }, [fetchStories])
    return (
        <div className='mt-16 flex gap-8'>
            <Sidebar />
            <div className='ml-[150px] lg:ml-[250px] flex flex-col items-center w-full'>
                <h1 className='text-4xl'>Stories</h1>
                <div className='flex  flex-wrap gap-10 justify-center'>
                    {storiesPosts.map((post) => {
                        const userDetails = JSON.parse(post.userdetails || "{}");
                        return (
                            <div key={post.postid} className='border  w-[250px] items-center border-black p-2'>
                                <div className='text-sm'>
                                    <p><strong>Location: </strong>{post.location} </p> 

                                    <p><strong>Posted by:</strong>  {userDetails.name.toUpperCase()}</p>
                                    <p><strong>User Name:</strong>  {userDetails.username}</p>
                                </div>
                                <img src={post.mediaurl} width="200px" height="200px" alt={post.description === null ? post.description : "ahsdkhaskd"} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Stories