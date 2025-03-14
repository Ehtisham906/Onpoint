import { Link } from 'react-router-dom';
import { BellDot, EyeOff, FileVideo2, UsersRound, ChevronRight, ChevronLeft, Calendar1 } from 'lucide-react'; 

const Sidebar = ({ isOpen, onToggle }) => {
    return (
        <aside
            className={`bg-primary rounded-2xl text-white fixed h-[100vh] border-base-300 flex flex-col transition-all duration-300 ${
                isOpen ? 'w-[150px] lg:w-[250px]' : 'w-[50px] bg-white'
            }`}
        >
            <button
                onClick={onToggle}
                className="p-2 text-white bg-primary rounded-full self-end m-4"
            >
                {isOpen ? <ChevronLeft /> :  <ChevronRight />}
               
            </button>
            <div className={`py-12 ${isOpen ? '' : 'hidden'}`}>
                <div className="flex flex-col gap-4">
                    <Link to="/" className="flex items-center gap-2 lg:ml-14">
                        <FileVideo2 className="size-4" />
                        <span className="text-sm">Video Posts</span>
                    </Link>
                    <Link to="/users" className="flex items-center gap-2 lg:ml-14">
                        <UsersRound className="size-4" />
                        <span className="text-sm">Users</span>
                    </Link>
                    <Link to="/hidden-posts" className="flex items-center gap-2 lg:ml-14">
                        <EyeOff className="size-4" />
                        <span className="text-sm">Hidden Posts</span>
                    </Link>
                    <Link to="/stories-page" className="flex items-center gap-2 lg:ml-14">
                        <BellDot className="size-4" />
                        <span className="text-sm">Stories</span>
                    </Link>
                    <Link to="/event-notification" className="flex items-center gap-2 lg:ml-14">
                        <Calendar1 className="size-4" />
                        <span className="text-sm">Create an Event</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
