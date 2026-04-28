import { useContext, useEffect, useState, useRef } from "react";
import {
  FaBars,
  FaBuilding,
  FaChartLine,
  FaHome,
  FaInfoCircle,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink } from "react-router";
import { AuthProvider } from "../../../AuthProvider/CreateContext";
import { LogIn, ShieldCheck, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, role, logOut } = useContext(AuthProvider);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Properties", path: "/properties", icon: <FaBuilding /> },
    {
      name: "Rent Prediction",
      path: "/rent-prediction",
      icon: <FaChartLine />,
    },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-blue-600 backdrop-blur-md shadow-lg py-2"
          : "bg-[#0f172a] py-4"
      }`}
    >
      <div className="container px-6 mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-blue-200 shadow">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span
              className={`text-2xl font-extrabold tracking-tight ${
                scrolled ? "text-white" : "text-blue-700"
              }`}
            >
              Rent<span className="text-blue-500">Ease</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2
                  ${
                    isActive
                      ? "bg-white text-blue-600 shadow shadow-blue-200"
                      : "text-white hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                {role === "MANAGER" && (
                  <NavLink to="/manager-dashboard">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-105 transition-all duration-300 border border-blue-400/20">
                      <User className="w-4 h-4" />
                      Manager Profile
                    </button>
                  </NavLink>
                )}

                {role === "ADMIN" && (
                  <NavLink to="/admin-dashboard">
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-300 hover:shadow-slate-400 hover:scale-105 transition-all duration-300 border border-slate-700">
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      Admin Panel
                    </button>
                  </NavLink>
                )}

                {role === "USER" && (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-bold rounded-full shadow-md hover:bg-blue-50 transition-all duration-300 border border-blue-100"
                    >
                      <FaUserCircle className="w-6 h-6" />
                      <span>Profile</span>
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                        <NavLink
                          to="/my-profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          My Profile
                        </NavLink>
                        <hr className="border-gray-50 mx-2" />
                        <button
                          onClick={() => {
                            logOut();
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <NavLink to="/login">
                <button className="flex items-center gap-2 px-8 py-2.5 bg-white text-blue-600 font-bold rounded-xl border-2 border-blue-600 hover:bg-blue-50 hover:shadow-md transition-all duration-300">
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              </NavLink>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isOpen ? "bg-blue-100 text-blue-600" : "text-white"
              }`}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="px-6 py-8 space-y-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-4 p-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-semibold">{item.name}</span>
            </NavLink>
          ))}
          <hr className="border-gray-100" />
          {user ? (
            <div className="space-y-3">
              <NavLink
                to="/my-profile"
                onClick={() => setIsOpen(false)}
                className="block py-3 text-center font-bold text-blue-600 border border-blue-100 rounded-xl"
              >
                My Profile
              </NavLink>
              <button
                onClick={() => {
                  logOut();
                  setIsOpen(false);
                }}
                className="w-full py-3 text-center font-bold bg-red-600 text-white rounded-xl shadow-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 pt-2">
              <NavLink to="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full py-3 text-center font-bold text-gray-700 border border-gray-200 rounded-xl">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                <button className="w-full py-3 text-center font-bold bg-blue-600 text-white rounded-xl">
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
