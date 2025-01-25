import React from 'react'
import Sidebar from '../Components/Sidebar'

const EventNotification = () => {
    return (
        <div className='mt-16 h-screen flex gap-10'>
            <div className='flex h-full rounded-lg overflow-hidden'>
                <div>
                    <Sidebar />
                </div>
            </div>
            <div>
                <form action="">
                    <div className='flex gap-4'>
                        <label htmlFor="">Title</label>
                        <input type="text" placeholder='Enter Event Name' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EventNotification