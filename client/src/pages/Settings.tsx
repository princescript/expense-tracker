import { useState } from "react";
import AboutSettings from "../components/AboutSettings";
import DeveloperSettings from "../components/DeveloperSettings";
import ProfileSettings from "../components/ProfileSettings";
import SecuritySettings from "../components/SecuritySettings";

const Settings = () => {
  const tabs = ["Profile", "Security", "Developer", "About"];
  const [activeTab, setActiveTab] = useState("Profile");

  const [startX, setStartX] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);

  const currentIndex = tabs.indexOf(activeTab);

  const handleSwipe = (
    startX: number,
    endX: number,
    startY: number,
    endY: number
  ) => {
    const diffX = startX - endX;
    const diffY = startY - endY;

    const threshold = 60;

    // ignore vertical scroll
    if (Math.abs(diffY) > Math.abs(diffX)) return;

    if (diffX > threshold && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }

    if (diffX < -threshold && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
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

      {/* SWIPE AREA */}
      <div
        className="relative overflow-hidden"
        onTouchStart={(e) => {
          setStartX(e.touches[0].clientX);
          setStartY(e.touches[0].clientY);
        }}
        onTouchEnd={(e) => {
          if (startX === null || startY === null) return;

          handleSwipe(
            startX,
            e.changedTouches[0].clientX,
            startY,
            e.changedTouches[0].clientY
          );

          setStartX(null);
          setStartY(null);
        }}
      >

        {/* SLIDER */}
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >

          <div className="w-full shrink-0">
            <ProfileSettings />
          </div>

          <div className="w-full shrink-0">
            <SecuritySettings />
          </div>

          <div className="w-full shrink-0">
            <DeveloperSettings />
          </div>

          <div className="w-full shrink-0">
            <AboutSettings />
          </div>

        </div>

      </div>

    </div>
  );
};

export default Settings;