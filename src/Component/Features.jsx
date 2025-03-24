import { useState } from "react";

// ConnectButton Component
const ConnectButton = () => {
  const [connected, setConnected] = useState(false);

  return (
    <button
      className={`text-sm font-semibold transition-colors duration-300 ${
        connected ? "text-green-500" : "text-blue-500"
      }`}
      onClick={() => setConnected(!connected)}
    >
      {connected ? "Connected ✅" : "Connect →"}
    </button>
  );
};

// AppointmentPlatform Component
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
            {
              title: "Connect your calendar",
              description:
                "Calendly connects up to six calendars to automate scheduling with real-time availability.",
            },
            {
              title: "Add your availability",
              description:
                "Calendly connects up to six calendars to automate scheduling with real-time availability.",
            },
            {
              title: "Connect conferencing tools",
              description:
                "Sync your video conferencing tools and set preferences for in-person meetings or calls.",
            },
            {
              title: "Customize your event type",
              description:
                "Choose from pre-built templates or quickly create custom event types for any meeting you need to schedule.",
            },
            {
              title: "Share your scheduling link",
              description:
                "Easily book meetings by embedding scheduling links on your website, landing pages, or emails.",
            },
          ].map(({ title, description }) => (
            <div key={title}>
              <h3 className="text-blue-500 font-semibold text-lg md:text-xl">{title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{description}</p>
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
                  <ConnectButton />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
