
import React from "react";
import { cn } from "@/lib/utils";
import { 
  LucideIcon, Home, Users, Clock, Book, GraduationCap, 
  BookOpen, FileText, PieChart, UserPlus 
} from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import RoleSelector from "./RoleSelector";

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
  const { role } = useRole();
  
  // Define menu items based on role
  const getMenuItems = () => {
    const commonItems = [
      { icon: Home, label: "Dashboard", value: "dashboard" },
    ];
    
    const adminItems = [
      { icon: UserPlus, label: "Admission & Registration", value: "admission" },
      { icon: Users, label: "Student Management", value: "students" },
      { icon: Users, label: "Staff Management", value: "staff" },
      { icon: Clock, label: "Attendance Management", value: "attendance" },
      { icon: Book, label: "Grades Management", value: "grades" },
      { icon: FileText, label: "Fee Management", value: "fees" },
      { icon: GraduationCap, label: "Exam Management", value: "exams" },
      { icon: PieChart, label: "Collective Information", value: "info" },
    ];
    
    const teacherItems = [
      { icon: Users, label: "Student Management", value: "students" },
      { icon: Clock, label: "Attendance Management", value: "attendance" },
      { icon: Book, label: "Grades Management", value: "grades" },
      { icon: GraduationCap, label: "Exam Management", value: "exams" },
      { icon: PieChart, label: "Collective Information", value: "info" },
    ];
    
    const studentItems = [
      { icon: Clock, label: "Attendance Records", value: "attendance" },
      { icon: Book, label: "My Grades", value: "grades" },
      { icon: FileText, label: "Fee Information", value: "fees" },
      { icon: GraduationCap, label: "Exam Schedule", value: "exams" },
    ];
    
    const parentItems = [
      { icon: Users, label: "Student Information", value: "students" },
      { icon: Clock, label: "Attendance Records", value: "attendance" },
      { icon: Book, label: "Grades", value: "grades" },
      { icon: FileText, label: "Fee Information", value: "fees" },
      { icon: GraduationCap, label: "Exam Schedule", value: "exams" },
    ];
    
    switch (role) {
      case "admin":
        return [...commonItems, ...adminItems];
      case "teacher":
        return [...commonItems, ...teacherItems];
      case "student":
        return [...commonItems, ...studentItems];
      case "parent":
        return [...commonItems, ...parentItems];
      default:
        return commonItems;
    }
  };
  
  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">CCAS SMS</h2>
        <p className="text-sm text-gray-500 mb-4">
          {role === "admin" ? "Admin Portal" :
           role === "teacher" ? "Teacher Portal" :
           role === "student" ? "Student Portal" :
           "Parent Portal"}
        </p>
        <RoleSelector />
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
