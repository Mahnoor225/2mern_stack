import { VscAccount } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { SlBasket } from "react-icons/sl";
import { TbPhone } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdAccountCircle } from "react-icons/md";
import { logoutUser } from "../redux/userslice";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import { toast } from "react-toastify";
import Role from "../Common/Role";
const Navbar = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);

  // dak mode state
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled in localStorage
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    // Toggle dark mode state
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); // Save preference to localStorage
      return newMode;
    });
  };

  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/registeruser/userlogout",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log("Logout successful:", data);

      dispatch(logoutUser()); // Update Redux state on logout
      toast.success("Successfully logged out");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again."); // Show error toast
    }
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <nav className={`bg-[#62a403] ${isDarkMode ? "dark:bg-gray-800" : ""}`}>
        <div className="hidden sm:block">
          <div className="flex flex-wrap justify-between border-b border-white px-4">
            <div className="flex items-center gap-3">
              <TbPhone
                className={`${isDarkMode ? "text-gray-800" : "text-white"}`}
              />
              <h6 className={`${isDarkMode ? "text-gray-800" : "text-white"}`}>
                You can contact us 24/7
              </h6>
              <h6
                className={`text-[#fcc313] ${
                  isDarkMode ? "text-yellow-400" : ""
                }`}
              >
                0 800 300-353
              </h6>
            </div>
            <div className="flex gap-7 items-center">
              <div className="group relative">
                <div className="flex items-center gap-2">
                  <h6
                    className={`${isDarkMode ? "text-gray-800" : "text-white"}`}
                  >
                    English
                  </h6>
                  <IoIosArrowDown
                    className={` ${
                      isDarkMode ? "text-gray-800" : "text-white"
                    }`}
                  />
                </div>
                <div className="hidden absolute z-10 cursor-default group-hover:block bg-white mt-1 w-24 pt-2 rounded-md text-center">
                  <h1>Spanish</h1>
                  <h1>French</h1>
                  <h1>German</h1>
                </div>
              </div>
              <div className="group relative">
                <div className="flex items-center gap-2">
                  <h6
                    className={` ${
                      isDarkMode ? "text-gray-800" : "text-white"
                    }`}
                  >
                    USD
                  </h6>
                  <IoIosArrowDown
                    className={`${isDarkMode ? "text-gray-800" : "text-white"}`}
                  />
                </div>
                <div className="hidden absolute z-10 group-hover:block bg-white w-16 pt-1 rounded-md text-center cursor-default">
                  <h1>EUR</h1>
                  <h1>INR</h1>
                  <h1>GBP</h1>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={toggleDarkMode}
                  className="w-12 rounded-lg p-3"
                >
                  <svg
                    className={`text-white block ${isDarkMode ? "hidden" : ""}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                  <svg
                    className={`fill-yellow-500 ${isDarkMode ? "" : "hidden"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 p-3 mx-auto overflow-x-hidden">
          <a href="#" className="flex items-center">
            <img
              src="https://klbtheme.com/blonwe/organic/wp-content/uploads/sites/18/2023/10/logo-organic.png"
              className="h-6 mr-3 sm:h-9"
              alt="Landwind Logo"
            />
          </a>
          <div className="flex items-center lg:order-2 gap-6">
            <div className="hidden mt-2 mr-4 sm:inline-block">
              <span />
            </div>

            <div
              className=" flex justify-center"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              <div
                className={`relative text-[23px] right-10 top-1 ${
                  isDarkMode ? "text-gray-800" : "text-white"
                } sm:block hidden`}
              >
                {user?.profilepic ? (
                  <img
                    src={user?.profilepic}
                    alt="user.name"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <MdAccountCircle className="text-[30px]" />
                )}
              </div>
              {menuDisplay && (
                <div className="absolute bottom-0 top-28 mr-20 p-1 h-fit shadow-lg rounded">
                  <nav>
                    {
                      // {/* {console.log("User object:", user, "Role.ADMIN:", Role.ADMIN)}
                      user?.isAdmin && (
                        <Link
                          to="/admin-panel"
                          className="hover:bg-slate-100 p-1"
                        >
                          Admin panel
                        </Link>
                      )
                    }
                  </nav>
                </div>
              )}
            </div>
            <div
              className={`relative right-10 top-1 ${
                isDarkMode ? "text-gray-800" : "text-white"
              } sm:block hidden`}
            >
              {user?._id ? (
                <button
                  onClick={handleLogout}
                  className={`px-3 bg-white text-black py-1 rounded-full ${
                    isDarkMode ? "text-gray-800" : "text-black"
                  }`}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`px-3 py-1 rounded-full ${
                    isDarkMode ? "text-gray-800" : "text-white"
                  }`}
                >
                  Account
                </Link>
              )}
            </div>
            <div
              className={`heart relative right-12 top-[4px] ${
                isDarkMode ? "text-gray-800" : "text-white"
              } text-[24px] sm:block hidden`}
            >
              <IoMdHeartEmpty />
            </div>
            <div
              className={`money relative right-10 top-[4px] ${
                isDarkMode ? "text-gray-800" : "text-white"
              } text-[24px] sm:block hidden`}
            >
              <SlBasket className="relative" />
            </div>
            <div
              className={`relative right-7 ${
                isDarkMode ? "text-gray-800" : "text-white"
              } sm:block hidden`}
            >
              <h2 className="opacity-[0.4]">Total</h2>
              <h2>$0.00</h2>
            </div>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 ml-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          <div
            className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
              isOpen ? "block" : "hidden"
            }`}
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  className={`block py-2 pl-3 pr-4 rounded lg:bg-transparent lg:p-0 ${
                    isDarkMode ? "text-gray-800" : "text-white"
                  } dark:text-white`}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 ${
                    isDarkMode
                      ? "text-gray-800"
                      : "text-white dark:text-gray-400 lg:dark:hover:text-white lg:dark:hover:bg-transparent"
                  } dark:border-gray-700`}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 ${
                    isDarkMode
                      ? "text-gray-800"
                      : "text-white dark:text-gray-400 lg:dark:hover:text-white lg:dark:hover:bg-transparent"
                  } dark:border-gray-700`}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 ${
                    isDarkMode
                      ? "text-gray-800"
                      : "text-white dark:text-gray-400 lg:dark:hover:text-white lg:dark:hover:bg-transparent"
                  } dark:border-gray-700`}
                >
                  Breakfast
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 ${
                    isDarkMode
                      ? "text-gray-800"
                      : "text-white dark:text-gray-400 lg:dark:hover:text-white lg:dark:hover:bg-transparent"
                  } dark:border-gray-700`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`block py-2 pl-3 pr-4 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 ${
                    isDarkMode
                      ? "text-gray-800"
                      : "text-white dark:text-gray-400 lg:dark:hover:text-white lg:dark:hover:bg-transparent"
                  } dark:border-gray-700`}
                >
                  Best Discount
                </Link>
              </li>
            </ul>
            <div className="lg:hidden mt-4">
              <div className="sign flex gap-4 mb-4">
                <VscAccount
                  className={`relative top-[5px] ${
                    isDarkMode ? "text-gray-800" : "text-white"
                  }`}
                />
                <div>
                  <Link
                    to="/register"
                    className={`text-white ${
                      isDarkMode ? "text-gray-800" : ""
                    }`}
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className={`text-white px-6 ${
                      isDarkMode ? "text-gray-800" : ""
                    }`}
                  >
                    Login
                  </Link>
                </div>
              </div>
              <div className="heart flex gap-8 mb-4">
                <IoMdHeartEmpty
                  className={`text-[28px] ${
                    isDarkMode ? "text-gray-800" : "text-white"
                  }`}
                />
                <div className="money flex gap-5 mb-4">
                  <SlBasket
                    className={`text-[25px] ${
                      isDarkMode ? "text-gray-800" : "text-white"
                    }`}
                  />
                  <div>
                    <h2
                      className={`opacity-[0.4] ${
                        isDarkMode ? "text-gray-800" : "text-white"
                      }`}
                    >
                      Total
                    </h2>
                    <h2
                      className={`${
                        isDarkMode ? "text-gray-800" : "text-white"
                      }`}
                    >
                      $0.00
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
