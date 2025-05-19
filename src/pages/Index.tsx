
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import StudentManagement from "@/components/StudentManagement";
import AttendanceManagement from "@/components/AttendanceManagement";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

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
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          
          <TabsContent value="students">
            <StudentManagement />
          </TabsContent>
          
          <TabsContent value="attendance">
            <AttendanceManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
