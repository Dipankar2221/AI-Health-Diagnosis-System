import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="min-h-[80vh] bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="font-medium">{user?.name || "N/A"}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium">{user?.email || "N/A"}</p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Role</label>
            <p className="font-medium">{user?.role || "Patient"}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;