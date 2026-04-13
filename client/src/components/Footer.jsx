import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 grid md:grid-cols-3 gap-6">
        
        {/* Logo / About */}
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FavoriteIcon />
            AI Health
          </h2>
          <p className="text-sm mt-2">
            Smart AI-based health diagnosis system for early disease detection
            and better healthcare decisions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            <li><Link to="/reports" className="hover:underline">Reports</Link></li>
            <li><Link to="/predict/heart" className="hover:underline">Predict</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm">Dipankar Mandal</p>
          <p className="text-sm">Email: dipankar@example.com</p>
          <p className="text-sm">India</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-blue-700 text-center py-2 text-sm">
        © {new Date().getFullYear()} AI Health Diagnosis System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;