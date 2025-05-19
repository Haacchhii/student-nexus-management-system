
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentManagement from "@/components/StudentManagement";
import AttendanceManagement from "@/components/AttendanceManagement";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import GradesManagement from "@/components/GradesManagement";
import FeeManagement from "@/components/FeeManagement";
import ExamManagement from "@/components/ExamManagement";
import CollectiveInformation from "@/components/CollectiveInformation";
import AdmissionRegistration from "@/components/AdmissionRegistration";
import StaffManagement from "@/components/StaffManagement";
import { useRole } from "@/contexts/RoleContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { role } = useRole();
  
  // Define tab items based on role
  const getTabItems = () => {
    const commonTabs = [
      { label: "Dashboard", value: "dashboard" },
    ];
    
    const adminTabs = [
      { label: "Admission & Registration", value: "admission" },
      { label: "Student Management", value: "students" },
      { label: "Staff Management", value: "staff" },
      { label: "Attendance Management", value: "attendance" },
      { label: "Grades Management", value: "grades" },
      { label: "Fee Management", value: "fees" },
      { label: "Exam Management", value: "exams" },
      { label: "Collective Information", value: "info" },
    ];
    
    const teacherTabs = [
      { label: "Student Management", value: "students" },
      { label: "Attendance Management", value: "attendance" },
      { label: "Grades Management", value: "grades" },
      { label: "Exam Management", value: "exams" },
      { label: "Collective Information", value: "info" },
    ];
    
    const studentTabs = [
      { label: "Attendance Records", value: "attendance" },
      { label: "My Grades", value: "grades" },
      { label: "Fee Information", value: "fees" },
      { label: "Exam Schedule", value: "exams" },
    ];
    
    const parentTabs = [
      { label: "Student Information", value: "students" },
      { label: "Attendance Records", value: "attendance" },
      { label: "Grades", value: "grades" },
      { label: "Fee Information", value: "fees" },
      { label: "Exam Schedule", value: "exams" },
    ];
    
    switch (role) {
      case "admin":
        return [...commonTabs, ...adminTabs];
      case "teacher":
        return [...commonTabs, ...teacherTabs];
      case "student":
        return [...commonTabs, ...studentTabs];
      case "parent":
        return [...commonTabs, ...parentTabs];
      default:
        return commonTabs;
    }
  };
  
  const tabItems = getTabItems();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Student Management System</h1>
          <p className="text-gray-600">College of Computing, Arts and Sciences</p>
        </header>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            {tabItems.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="admission">
            <AdmissionRegistration />
          </TabsContent>
          
          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>
          
          <TabsContent value="staff">
            <StaffManagement />
          </TabsContent>
          
          <TabsContent value="attendance">
            <AttendanceManagement />
          </TabsContent>
          
          <TabsContent value="grades">
            <GradesManagement />
          </TabsContent>
          
          <TabsContent value="fees">
            <FeeManagement />
          </TabsContent>
          
          <TabsContent value="exams">
            <ExamManagement />
          </TabsContent>
          
          <TabsContent value="info">
            <CollectiveInformation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
