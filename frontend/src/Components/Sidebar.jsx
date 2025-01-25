import { Link } from 'react-router-dom';
import { BellDot, EyeOff, FileVideo2, UsersRound } from 'lucide-react';


const Sidebar = () => {
    return (
        <aside className=' bg-primary text-white w-[150px]  lg:w-[250px] fixed h-[100vh]  border-base-300 flex flex-col '>
            <div className='py-12'>
                <div className='flex flex-col gap-4'>
                    <Link to='/' className='flex items-center lg:ml-14'>
                        <FileVideo2 className='size-4' />
                        <span className='text-sm'>
                            Vedio Posts
                        </span>
                    </Link>
                    <Link to='/users' className='flex items-center lg:ml-14'>
                        <UsersRound  className='size-4' />
                        <span className='text-sm'>
                            Users
                        </span>
                    </Link>
                    <Link to='/hidden-posts' className='flex items-center lg:ml-14'>
                        <EyeOff  className='size-4' />
                        <span className='text-sm'>
                            Hidden Posts
                        </span>
                    </Link>
                    <Link to='/stories-page' className='flex items-center lg:ml-14'>
                        <BellDot  className='size-4' />
                        <span className='text-sm'>
                            Stories
                        </span>
                    </Link>
                    <Link to='/event-notification' className='flex items-center lg:ml-14'>
                        <BellDot  className='size-4' />
                        <span className='text-sm'>
                            Create an Event
                        </span>
                    </Link>
                </div>

            </div>
        </aside>
    )
}

export default Sidebar