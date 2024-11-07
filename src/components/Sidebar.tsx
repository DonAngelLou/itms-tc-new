// src/components/Sidebar.tsx
"use client";

import React, { useCallback, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  User2,
  HomeIcon,
  CarIcon,
  CalendarIcon,
  ClipboardListIcon,
  LogOutIcon,
  UsersIcon,
  ChartBarIcon,
  MonitorIcon,
  MailIcon,
  SettingsIcon
} from "lucide-react";
import clsx from "clsx";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = useCallback(() => setIsCollapsed((prev) => !prev), []);
  const handleLogout = useCallback(async () => {
    // Handle logout logic
    router.replace("/login"); // Redirect to login after logout
  }, [router]);

  const sidebarItems = [
    { name: "Profile", icon: <User2 size={20} />, route: "/user" },
    { name: "Dashboard", icon: <HomeIcon size={20} />, route: "/dashboard" },
    { name: "Vehicles", icon: <CarIcon size={20} />, route: "/vehicles" },
    { name: "Trips", icon: <CalendarIcon size={20} />, route: "/trips" },
    { name: "Bookings", icon: <ClipboardListIcon size={20} />, route: "/bookings" },
    { name: "Drivers", icon: <UsersIcon size={20} />, route: "/drivers" },
    { name: "Reports", icon: <ChartBarIcon size={20} />, route: "/reports" },
    { name: "Announcements", icon: <MonitorIcon size={20} />, route: "/announcements" },
    { name: "Chat", icon: <MailIcon size={20} />, route: "/chat" },
    { name: "Maintenance", icon: <SettingsIcon size={20} />, route: "/maintenance" }, // Added Settings
  ];

  return (
    <aside className={`flex flex-col h-screen bg-gray-900 text-white ${isCollapsed ? "w-20" : "w-64"} transition-width duration-300`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <span className={`text-xl font-semibold ${isCollapsed && "hidden"}`}>Transport Co.</span>
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.route)}
            className={clsx(
              "flex items-center w-full p-2 text-sm font-medium rounded-lg hover:bg-gray-700",
              { "bg-gray-800": pathname === item.route }
            )}
          >
            {item.icon}
            <span className={`ml-4 ${isCollapsed && "hidden"}`}>{item.name}</span>
          </button>
        ))}
      </nav>

      <button onClick={handleLogout} className="flex items-center p-4 text-sm font-medium text-red-400 hover:text-red-500">
        <LogOutIcon size={20} />
        <span className={`ml-4 ${isCollapsed && "hidden"}`}>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
