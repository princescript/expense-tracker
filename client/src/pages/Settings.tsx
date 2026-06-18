import { useState } from "react";
import AboutSettings from "../components/AboutSettings";
import DeveloperSettings from "../components/DeveloperSettings";
import ProfileSettings from "../components/ProfileSettings";
import SecuritySettings from "../components/SecuritySettings";

const Settings = () => {
  const tabs = ["Profile", "Security", "Developer", "About"];
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold">Settings</h2>

        <div className="flex border-b border-[rgb(var(--border))]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-[rgb(var(--primary))] text-[rgb(var(--primary))]"
                  : "border-transparent text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div>
        {activeTab === "Profile" && <ProfileSettings />}
        {activeTab === "Security" && <SecuritySettings />}
        {activeTab === "Developer" && <DeveloperSettings />}
        {activeTab === "About" && <AboutSettings />}
      </div>
    </div>
  );
};

export default Settings;