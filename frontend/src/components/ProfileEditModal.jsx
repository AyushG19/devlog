import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";

const ProfileEditModal = () => {
  //   const [userInfo, setuserInfo] = useState({
  //     displayName: "JaneDoe",
  //     username: "jane_doe123",
  //     bio: "Software developer by day, book lover by night. Sharing thoughts on tech and literature.",
  //     location: "San Francisco, CA",
  //     website: "https://janedoe.dev",
  //     birthday: "1990-05-15",
  //     profileColor: "#FF4500", // Reddit-inspired orange as default
  //   });

  const { userInfo, setProfileEditModal } = useContext(UserContext);
  const handleModalClose = () => {
    console.log("closing edit modal");
    setProfileEditModal(false);
  };

  const [avatarPreview, setAvatarPreview] = useState(
    "/api/placeholder/120/120"
  );
  const [bannerPreview, setBannerPreview] = useState(
    "/api/placeholder/600/200"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="fixed z-10 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-screen overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleModalClose()}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold">Edit profile</h2>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full font-medium">
            Save
          </button>
        </div>

        {/* Banner and Avatar */}
        <div className="relative">
          <div className="h-40 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
            <img
              src={bannerPreview}
              alt="Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <button className="bg-black bg-opacity-60 text-white p-2 rounded-full">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="absolute -bottom-16 left-4">
            <div className="relative">
              <img
                src={avatarPreview}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button className="bg-black bg-opacity-60 text-white p-2 rounded-full">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-16 px-4">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 font-medium ${
                activeTab === "profile"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("appearance")}
              className={`px-4 py-2 font-medium ${
                activeTab === "appearance"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              Appearance
            </button>
            {/* <button
              onClick={() => setActiveTab("privacy")}
              className={`px-4 py-2 font-medium ${
                activeTab === "privacy"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500"
              }`}
            >
              Privacy
            </button> */}
          </div>
        </div>

        {/* Form Content - Profile Tab */}
        {activeTab === "profile" && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                value={userInfo.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                maxLength={50}
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-500">
                  {userInfo.name?.length}/50
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                  @
                </span>
                <input
                  type="text"
                  name="username"
                  value={userInfo.username}
                  onChange={handleChange}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={userInfo.bio}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                maxLength={160}
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-500">
                  {userInfo?.bio?.length}/160
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={userInfo?.location}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={userInfo?.website}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                placeholder="https://"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Birthday
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  name="birthday"
                  value={userInfo?.birthday}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                />
                <div className="text-gray-500 dark:text-gray-400">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                This will not be shown publicly
              </p>
            </div>
          </div>
        )}

        {/* Form Content - Appearance Tab */}
        {activeTab === "appearance" && (
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Theme Color
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "#FF4500",
                  "#0079D3",
                  "#1DA1F2",
                  "#FF3C1F",
                  "#9146FF",
                  "#25D366",
                ].map((color) => (
                  <div
                    key={color}
                    className={`w-10 h-10 rounded-full cursor-pointer ${
                      userInfo.profileColor === color
                        ? "ring-2 ring-offset-2 ring-blue-500"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() =>
                      setuserInfo((prev) => ({ ...prev, profileColor: color }))
                    }
                  />
                ))}
                <label className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer">
                  <input
                    type="color"
                    className="opacity-0 absolute"
                    value={userInfo?.profileColor}
                    onChange={(e) =>
                      setuserInfo((prev) => ({
                        ...prev,
                        profileColor: e.target.value,
                      }))
                    }
                  />
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Interface Style
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded-lg p-3 flex items-center space-x-3 cursor-pointer bg-white dark:bg-gray-800">
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  </div>
                  <div>
                    <p className="font-medium">Light</p>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 flex items-center space-x-3 cursor-pointer">
                  <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium">Dark</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium">Badge Display</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Select which badges to display on your profile
              </p>

              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 rounded"
                    defaultChecked
                  />
                  <span className="flex items-center">
                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded">
                      Premium
                    </span>
                    <span className="ml-2">Premium Subscriber</span>
                  </span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 rounded"
                    defaultChecked
                  />
                  <span className="flex items-center">
                    <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                      Verified
                    </span>
                    <span className="ml-2">Verified Email</span>
                  </span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 rounded"
                  />
                  <span className="flex items-center">
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                      Top
                    </span>
                    <span className="ml-2">Top Contributor</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Form Content - Privacy Tab */}
        {activeTab === "privacy" && (
          <div className="p-4 space-y-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium">Profile Visibility</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Control who can see your profile
              </p>

              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span>Allow people to follow you</span>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                    <input type="checkbox" className="hidden" defaultChecked />
                    <span className="absolute inset-0 bg-blue-500 rounded-full"></span>
                    <span className="absolute inset-y-0 right-0 w-6 h-6 bg-white rounded-full shadow transform transition duration-200 ease-in-out"></span>
                  </div>
                </label>

                <label className="flex items-center justify-between">
                  <span>Show my online status</span>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                    <input type="checkbox" className="hidden" defaultChecked />
                    <span className="absolute inset-0 bg-blue-500 rounded-full"></span>
                    <span className="absolute inset-y-0 right-0 w-6 h-6 bg-white rounded-full shadow transform transition duration-200 ease-in-out"></span>
                  </div>
                </label>

                <label className="flex items-center justify-between">
                  <span>Content visibility</span>
                  <select className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700">
                    <option>Everyone</option>
                    <option>Followers only</option>
                    <option>Only me</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium">Account Privacy</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Manage account privacy settings
              </p>

              <div className="space-y-2">
                <label className="flex items-center justify-between">
                  <span>Two-factor authentication</span>
                  <button className="text-blue-500 font-medium">Set up</button>
                </label>

                <label className="flex items-center justify-between">
                  <span>Remember login devices</span>
                  <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                    <input type="checkbox" className="hidden" />
                    <span className="absolute inset-0 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                    <span className="absolute inset-y-0 left-0 w-6 h-6 bg-white rounded-full shadow transform transition duration-200 ease-in-out"></span>
                  </div>
                </label>

                <label className="flex items-center justify-between">
                  <span>Active sessions</span>
                  <button className="text-blue-500 font-medium">Manage</button>
                </label>
              </div>
            </div>

            <div className="border border-red-100 dark:border-red-900 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
              <h3 className="font-medium text-red-600 dark:text-red-400">
                Delete Account
              </h3>
              <p className="text-sm text-red-500 dark:text-red-400 mb-3">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>

              <button className="text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 px-3 py-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30">
                Delete account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileEditModal;
