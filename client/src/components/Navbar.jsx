import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { logout } from "../redux/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [menuOpen, setMenuOpen] = useState(false);
  const [predictOpen, setPredictOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <FavoriteIcon />
          AI Health
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link to="/" className="hover:text-gray-200">Home</Link>

          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="hover:text-gray-200 flex items-center gap-1">
                <DashboardIcon fontSize="small" />
                Dashboard
              </Link>

              <Link to="/reports" className="hover:text-gray-200">
                Reports
              </Link>
              <Link to="/chatbot" className="hover:text-gray-200">
                ChatBot
              </Link>

              {/* Predict Dropdown */}
              <div className="relative group">
                <button className="hover:text-gray-200">
                  Predict
                </button>

                <div className="absolute hidden group-hover:block bg-white text-black mt-2 rounded shadow-lg w-44 z-50">
                  <Link to="/predict/heart" className="block px-4 py-2 hover:bg-gray-100">
                    Heart
                  </Link>
                  <Link to="/predict/diabetes" className="block px-4 py-2 hover:bg-gray-100">
                    Diabetes
                  </Link>
                  <Link to="/predict/stroke" className="block px-4 py-2 hover:bg-gray-100">
                    Stroke
                  </Link>
                  <Link to="/predict/kidney" className="block px-4 py-2 hover:bg-gray-100">
                    Kidney
                  </Link>
                  <Link to="/predict/liver" className="block px-4 py-2 hover:bg-gray-100">
                    Liver
                  </Link>
                </div>
              </div>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link to="/signup" className="hover:text-gray-200">Signup</Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <AccountCircleIcon />
                {user?.name || "User"}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
              >
                <LogoutIcon fontSize="small" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-3 space-y-3">

          <Link to="/" onClick={() => setMenuOpen(false)} className="block">
            Home
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block">
                Dashboard
              </Link>

              <Link to="/reports" onClick={() => setMenuOpen(false)} className="block">
                Reports
              </Link>

              {/* Mobile Predict Dropdown */}
              <div>
                <button
                  onClick={() => setPredictOpen(!predictOpen)}
                  className="block w-full text-left"
                >
                  Predict
                </button>

                {predictOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link to="/predict/heart" onClick={() => setMenuOpen(false)} className="block">
                      Heart
                    </Link>
                    <Link to="/predict/diabetes" onClick={() => setMenuOpen(false)} className="block">
                      Diabetes
                    </Link>
                    <Link to="/predict/stroke" onClick={() => setMenuOpen(false)} className="block">
                      Stroke
                    </Link>
                    <Link to="/predict/kidney" onClick={() => setMenuOpen(false)} className="block">
                      Kidney
                    </Link>
                    <Link to="/predict/liver" onClick={() => setMenuOpen(false)} className="block">
                      Liver
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block">
                Login
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="block">
                Signup
              </Link>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <AccountCircleIcon />
                {user?.name || "User"}
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded w-full text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;