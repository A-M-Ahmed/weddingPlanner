import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

const Header = () => {
  const [isDropdonwOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoading,setIsloading] = useState(false)

  const { isLoggedIn, profile, isLoading, logout } = useAuth();
  const handleLogOut = () => {
    setIsDropdownOpen(false);
    logout();
    toast.success("log out.");
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin w-10 h-10 rounded-full border-t-2 border-b-2 border-t-purple-500 border-b-blue-500"></div>
      </div>
    );
  }
  return (
    <header className="bg-white py-4 px-3 shadow">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-6">
          {/* left //* , right div and hamburger */}
        <div className="flex justify-between">
          {/* //* left */}
          <div className="flex items-center sm:space-x-5">
            {/* //* Left div */}

            <div className="flex-shrink-0">
              <Link
                to="/"
                className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-xl leading-none font-bold text-transparent md:text-2xl"
              >
                wedding planner
              </Link>
            </div>
            <nav className="hidden items-center justify-center space-x-8 sm:flex">
              <div className="group ">
                <Link
                  to="/"
                  className="group leading-relaxed font-medium capitalize "
                >
                  home
                </Link>
                <div className="mx-2  group-hover:border-b-2 group-hover:border-blue-500"></div>
              </div>
              <div className="group ">
                <Link
                  to="/about"
                  className="group leading-relaxed font-medium capitalize"
                >
                  about us
                </Link>
                <div className="mx-2  group-hover:border-b-2 group-hover:border-blue-500"></div>
              </div>
              <div className="group ">
                <Link
                  to="/about"
                  className="group leading-relaxed font-medium capitalize"
                >
                  Contact us
                </Link>
                <div className="mx-2  group-hover:border-b-2 group-hover:border-blue-500"></div>
              </div>

              {isLoggedIn && (
                <>
                  <div className="group ">
                    <Link
                      to="/create-event"
                      className="group leading-relaxed font-medium capitalize"
                    >
                      create event
                    </Link>
                    <div className="mx-2  group-hover:border-b-2 group-hover:border-blue-500"></div>
                  </div>
                  <div className="group ">
                    <Link
                      to="/articles"
                      className="group leading-relaxed font-medium capitalize"
                    >
                      articles
                    </Link>
                    <div className="mx-2  group-hover:border-b-2 group-hover:border-blue-500"></div>
                  </div>
                  <div className="group ">
                    <Link
                      to="/manage-articles"
                      className="group leading-relaxed font-medium capitalize"
                    >
manage events                    </Link>
                    <div className="mx-2  group-hover:border-b-2 group-hover:border-blue-500"></div>
                  </div>
                </>
              )}
            </nav>
          </div>

          {/* //* Right side */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <div className="text-base leading-relaxed font-medium text-gray-500">
                  <span>
                    {profile?.username ? profile?.username : "Hello User"}
                  </span>
                </div>
                <div className="relative">
                  <button
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onClick={() => setIsDropdownOpen(!isDropdonwOpen)}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-200 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
                  >
                    {profile?.avatar_url ? (
                      <img
                        src={profile?.avatar_url}
                        alt="user"
                        className="h-7 w-7 rounded-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-blue-500" />
                    )}
                  </button>
                  {isDropdonwOpen && (
                    <div
                      onMouseLeave={() => setIsDropdownOpen(false)}
                      className="absolute right-0 w-48 rounded-md bg-gray-300 z-10"
                    >
                      <Link
                        to="/profile"
                        className="my-1 block px-3 py-2 text-sm capitalize hover:bg-white"
                      >
                        your profile
                      </Link>
                      <Link
                        to="#"
                        className="my-1 block px-3 py-2 text-sm capitalize hover:bg-white"
                      >
                        mangae articles
                      </Link>
                      <button
                        onClick={handleLogOut}
                        className="my-1 block px-3 py-2 text-sm capitalize w-full text-start cursor-pointer hover:bg-white"
                      >
                        sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="signin"
                  className="rounded-lg bg-blue-500 p-1 px-3 py-2  text-sm font-semibold text-white capitalize focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:outline-none md:px-3 md:py-2 md:text-base"
                >
                  sign in
                </Link>
                <Link
                  to="signup"
                  className="hidden rounded-lg p-1 text-sm font-semibold text-blue-500 capitalize hover:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:inline md:px-3 md:py-2 md:text-base"
                >
                  sign up
                </Link>
              </div>
            )}
          </div>
          {/* //* Hamburger menu */}
          <div className="flex items-center justify-center px-3 sm:hidden">
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex cursor-pointer text-2xl"
              >
                {isMenuOpen ? (
                  <IoMdClose className="font-semibold text-gray-500" />
                ) : (
                  <CiMenuBurger className="font-semibold text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* //?! menu links */}
        {isMenuOpen && (
          <div className="my-3 sm:hidden">
            <nav className="flex flex-col items-start space-y-2">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "w-full rounded-md border-l-3 border-rose-700 bg-blue-100 px-3 py-2 leading-relaxed font-medium capitalize"
                    : "w-full rounded-md px-3 py-2 leading-relaxed font-medium capitalize hover:bg-blue-50"
                }
                to="/"
              >
                home
              </NavLink>
              <NavLink
                to="/articles"
                className={({ isActive }) =>
                  isActive
                    ? "w-full rounded-md border-l-3 border-rose-700 bg-blue-100 px-3 py-2 leading-relaxed font-medium capitalize"
                    : "w-full rounded-md px-3 py-2 leading-relaxed font-medium capitalize hover:bg-blue-50"
                }
              >
                articles
              </NavLink>
              {isLoggedIn ? (
                <>
                  <NavLink
                    to="/write"
                    className={({ isActive }) =>
                      isActive
                        ? "w-full rounded-md border-l-3 border-rose-700 bg-blue-100 px-3 py-2 leading-relaxed font-medium capitalize"
                        : "w-full rounded-md px-3 py-2 leading-relaxed font-medium capitalize hover:bg-blue-50"
                    }
                  >
                    write
                  </NavLink>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      isActive
                        ? "w-full rounded-md border-l-3 border-rose-700 bg-blue-100 px-3 py-2 leading-relaxed font-medium capitalize"
                        : "w-full rounded-md px-3 py-2 leading-relaxed font-medium capitalize hover:bg-blue-50"
                    }
                  >
                    profile
                  </NavLink>
                  <NavLink
                    to="/myArticles"
                    className={({ isActive }) =>
                      isActive
                        ? "w-full rounded-md border-l-3 border-rose-700 bg-blue-100 px-3 py-2 leading-relaxed font-medium capitalize"
                        : "w-full rounded-md px-3 py-2 leading-relaxed font-medium capitalize hover:bg-blue-50"
                    }
                  >
                    my article
                  </NavLink>
                </>
              ) : (
                <NavLink
                  to="signup"
                  className={({ isActive }) =>
                    isActive
                      ? "w-full rounded-md border-l-3 border-rose-700 bg-blue-100 px-3 py-2 leading-relaxed font-medium capitalize text-blue-500"
                      : "w-full rounded-md px-3 py-2 leading-relaxed font-medium capitalize hover:bg-blue-50 text-blue-500"
                  }
                >
                  sign up
                </NavLink>
              )}
            </nav>
            {isLoggedIn && (
              <button
                to="/myArticles"
                className="w-full cursor-pointer rounded-md my-2 text-center px-3 py-2 leading-relaxed font-medium capitalize hover:bg-blue-50"
              >
                sign out
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
