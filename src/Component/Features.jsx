import { useState } from "react";

const ConnectButton = ({ platform }) => {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    let authUrl = "";

    if (platform === "Google Calendar") {
      authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=${encodeURIComponent(
        "http://localhost:3000"
      )}&response_type=token&scope=https://www.googleapis.com/auth/calendar.events.readonly&access_type=offline`;
    } else if (platform === "Outlook Calendar" || platform === "Exchange Calendar") {
      authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=YOUR_MICROSOFT_CLIENT_ID&response_type=token&redirect_uri=${encodeURIComponent(
        "http://localhost:3000"
      )}&scope=calendars.read`;
    }

    // Open authentication window
    window.open(authUrl, "_self");
  };

  return (
    <button
      className={`text-sm font-semibold transition-colors duration-300 ${
        connected ? "text-green-500" : "text-blue-500"
      }`}
      onClick={handleConnect}
    >
      {connected ? "Connected ✅" : "Connect →"}
    </button>
  );
};

export default function AppointmentPlatform() {
  return (
    <div className="flex flex-col items-center w-full p-4 md:p-12">
      {/* Header Section */}
      <div className="text-center max-w-2xl mb-8 md:mb-12">
        <h2 className="text-xl md:text-3xl font-bold">
          The all-in-one platform for seamless appointment scheduling.
          <span className="font-semibold block">Book, manage, and stay on track</span>
        </h2>
        <p className="text-gray-500 mt-3 text-base md:text-lg">while we make life simple for you.</p>
      </div>

      {/* Features & Calendar Section */}
      <div className="flex flex-col md:flex-row mt-8 md:mt-16 w-full max-w-6xl gap-6">
        {/* Left Side - Features List */}
        <div className="w-full md:w-1/2 space-y-6 p-4 md:p-8">
          {[
            "Connect your calendar",
            "Add your availability",
            "Connect conferencing tools",
            "Customize your event type",
            "Share your scheduling link",
          ].map((title) => (
            <div key={title}>
              <h3 className="text-blue-500 font-semibold text-lg md:text-xl">{title}</h3>
              <p className="text-gray-600 text-sm md:text-base">
                {title === "Connect your calendar"
                  ? "Integrate with Google, Outlook, and Exchange for real-time availability."
                  : "Easily manage your appointments with automated scheduling."}
              </p>
            </div>
          ))}
        </div>

        {/* Right Side - Calendar Connection Box */}
        <div className="w-full md:w-1/2 flex justify-center p-4">
          <div className="border border-blue-500 rounded-2xl p-6 md:p-10 shadow-lg w-full max-w-md bg-white flex flex-col items-center">
            <div className="space-y-4 w-full">
              {[
                { platform: "Google Calendar", icon: "📅" },
                { platform: "Outlook Calendar", icon: "📧" },
                { platform: "Exchange Calendar", icon: "📩" },
              ].map(({ platform, icon }) => (
                <div
                  key={platform}
                  className="flex items-center justify-between p-4 md:p-5 bg-white rounded-xl shadow-md border"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{icon}</span>
                    <span className="text-gray-700 font-medium text-base md:text-lg">{platform}</span>
                  </div>
                  <ConnectButton platform={platform} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
