
import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, Users, Clock, Home } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 w-full text-left rounded-md transition-colors",
        active 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-gray-100 text-gray-700"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { icon: Home, label: "Dashboard", value: "dashboard" },
    { icon: Users, label: "Student Management", value: "students" },
    { icon: Clock, label: "Attendance Management", value: "attendance" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">CCAS SMS</h2>
        <p className="text-sm text-gray-500">Admin Portal</p>
      </div>
      
      <div className="space-y-1">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.value}
            icon={item.icon}
            label={item.label}
            value={item.value}
            active={activeTab === item.value}
            onClick={() => setActiveTab(item.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
