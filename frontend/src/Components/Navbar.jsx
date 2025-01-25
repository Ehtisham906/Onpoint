import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, User } from "lucide-react";
import logo from '../assets/logo.png'

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const user = authUser;

  return (
    <header
      className="bg-base-100 bg-primary border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 bg-primary/10 flex items-center justify-center">
                <img src={logo} alt="" />
              </div>
              <h1 className="text-lg font-bold">Onpoint</h1>
            </Link>
          </div>

          <div className="flex items-center gap-6">


            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <div className="size-8 flex items-center justify-center bg-white rounded-full ">
                    {authUser.fullName[0].toUpperCase()}
                  </div>

                </Link>

                <button className="flex gap-2 items-center hover:scale-105 duration-300 ease-in-out" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
