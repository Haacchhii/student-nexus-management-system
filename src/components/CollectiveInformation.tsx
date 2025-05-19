
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRole } from "@/contexts/RoleContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const attendanceData = [
  { course: "CS15", present: 85, absent: 10, late: 5 },
  { course: "CS12", present: 75, absent: 15, late: 10 },
  { course: "CS10", present: 90, absent: 5, late: 5 },
  { course: "CS20", present: 80, absent: 10, late: 10 },
];

const gradeDistributionData = [
  { name: "A (90-100)", value: 25 },
  { name: "B (80-89)", value: 35 },
  { name: "C (70-79)", value: 20 },
  { name: "D (60-69)", value: 15 },
  { name: "F (Below 60)", value: 5 },
];

const COLORS = ['#4CAF50', '#2196F3', '#FFEB3B', '#FF9800', '#F44336'];

const CollectiveInformation = () => {
  const { role } = useRole();
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [activeTab, setActiveTab] = useState("attendance");
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Collective Information</h2>
        <p className="text-gray-600">View aggregated data and reports</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Students</CardTitle>
            <CardDescription>Total registered students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">256</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Attendance Rate</CardTitle>
            <CardDescription>Average across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">85%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Grade</CardTitle>
            <CardDescription>Across all courses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">B (83.5)</div>
          </CardContent>
        </Card>
      </div>
      
      {(role === "admin" || role === "teacher") && (
        <div className="mb-6 flex gap-4">
          <div>
            <Label htmlFor="course-filter">Filter by Course</Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger id="course-filter" className="w-[200px]">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="CS15">CS15 - Software Engineering</SelectItem>
                <SelectItem value="CS12">CS12 - Data Structures</SelectItem>
                <SelectItem value="CS10">CS10 - Computer Programming</SelectItem>
                <SelectItem value="CS20">CS20 - Database Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="attendance">Attendance Statistics</TabsTrigger>
          <TabsTrigger value="grades">Grade Distribution</TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance" className="border rounded-md p-4 mt-4">
          <h3 className="text-lg font-medium mb-4">Attendance Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" name="Present" fill="#4CAF50" />
                <Bar dataKey="absent" name="Absent" fill="#F44336" />
                <Bar dataKey="late" name="Late" fill="#FFEB3B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="grades" className="border rounded-md p-4 mt-4">
          <h3 className="text-lg font-medium mb-4">Grade Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {gradeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollectiveInformation;
