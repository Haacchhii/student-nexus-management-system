
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, Calendar, PieChart } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { toast } from "sonner";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { PieChart as RechartsChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Sample grade data with detailed breakdowns for each course
const gradesData = [
  { 
    id: "1", 
    studentId: "2023-0001", 
    studentName: "John Doe", 
    courseId: "CS15", 
    courseName: "Software Engineering", 
    midterm: 92, 
    finals: 88, 
    quizzes: 90, 
    attendance: 95,
    classPerformance: 88,
    projects: 94,
    average: 90,
    breakdown: {
      quizzes: { weight: 20, score: 90 },
      attendance: { weight: 10, score: 95 },
      classPerformance: { weight: 20, score: 88 },
      midterm: { weight: 20, score: 92 },
      finals: { weight: 30, score: 88 },
    }
  },
  { 
    id: "2", 
    studentId: "2023-0002", 
    studentName: "Jane Smith", 
    courseId: "CS15", 
    courseName: "Software Engineering", 
    midterm: 85, 
    finals: 89, 
    quizzes: 87, 
    attendance: 90,
    classPerformance: 92,
    projects: 88,
    average: 87,
    breakdown: {
      quizzes: { weight: 20, score: 87 },
      attendance: { weight: 10, score: 90 },
      classPerformance: { weight: 20, score: 92 },
      midterm: { weight: 20, score: 85 },
      finals: { weight: 30, score: 89 },
    }
  },
  { 
    id: "3", 
    studentId: "2022-0003", 
    studentName: "Michael Johnson", 
    courseId: "CS15", 
    courseName: "Software Engineering", 
    midterm: 78, 
    finals: 82, 
    quizzes: 75, 
    attendance: 85,
    classPerformance: 80,
    projects: 83,
    average: 80,
    breakdown: {
      quizzes: { weight: 20, score: 75 },
      attendance: { weight: 10, score: 85 },
      classPerformance: { weight: 20, score: 80 },
      midterm: { weight: 20, score: 78 },
      finals: { weight: 30, score: 82 },
    }
  },
  { 
    id: "4", 
    studentId: "2024-0004", 
    studentName: "Emily Davis", 
    courseId: "CS15", 
    courseName: "Software Engineering", 
    midterm: 95, 
    finals: 91, 
    quizzes: 94, 
    attendance: 98,
    classPerformance: 92,
    projects: 89,
    average: 93,
    breakdown: {
      quizzes: { weight: 20, score: 94 },
      attendance: { weight: 10, score: 98 },
      classPerformance: { weight: 20, score: 92 },
      midterm: { weight: 20, score: 95 },
      finals: { weight: 30, score: 91 },
    }
  },
  { 
    id: "5", 
    studentId: "2023-0005", 
    studentName: "Robert Wilson", 
    courseId: "CS15", 
    courseName: "Software Engineering", 
    midterm: 89, 
    finals: 85, 
    quizzes: 87, 
    attendance: 92,
    classPerformance: 85,
    projects: 90,
    average: 87,
    breakdown: {
      quizzes: { weight: 20, score: 87 },
      attendance: { weight: 10, score: 92 },
      classPerformance: { weight: 20, score: 85 },
      midterm: { weight: 20, score: 89 },
      finals: { weight: 30, score: 85 },
    }
  },
  // Additional data for different courses
  { 
    id: "6", 
    studentId: "2023-0001", 
    studentName: "John Doe", 
    courseId: "CS12", 
    courseName: "Data Structures and Algorithms", 
    midterm: 88, 
    finals: 91, 
    quizzes: 85, 
    attendance: 97,
    classPerformance: 90,
    projects: 92,
    average: 89,
    breakdown: {
      quizzes: { weight: 15, score: 85 },
      attendance: { weight: 5, score: 97 },
      classPerformance: { weight: 15, score: 90 },
      projects: { weight: 25, score: 92 },
      midterm: { weight: 20, score: 88 },
      finals: { weight: 20, score: 91 },
    }
  },
  { 
    id: "7", 
    studentId: "2023-0001", 
    studentName: "John Doe", 
    courseId: "MATH14", 
    courseName: "Calculus I", 
    midterm: 80, 
    finals: 85, 
    quizzes: 82, 
    attendance: 90,
    classPerformance: 78,
    projects: null,
    average: 83,
    breakdown: {
      quizzes: { weight: 25, score: 82 },
      attendance: { weight: 5, score: 90 },
      classPerformance: { weight: 10, score: 78 },
      midterm: { weight: 30, score: 80 },
      finals: { weight: 30, score: 85 },
    }
  },
  { 
    id: "8", 
    studentId: "2023-0001", 
    studentName: "John Doe", 
    courseId: "CS10", 
    courseName: "Computer Programming", 
    midterm: 95, 
    finals: 92, 
    quizzes: 90, 
    attendance: 95,
    classPerformance: 93,
    projects: 96,
    average: 94,
    breakdown: {
      quizzes: { weight: 20, score: 90 },
      attendance: { weight: 10, score: 95 },
      classPerformance: { weight: 10, score: 93 },
      projects: { weight: 20, score: 96 },
      midterm: { weight: 20, score: 95 },
      finals: { weight: 20, score: 92 },
    }
  },
];

// Course grade calculation policies
const courseGradingPolicies = {
  "CS15": [
    { name: "Quizzes", weight: 20 },
    { name: "Attendance", weight: 10 },
    { name: "Class Performance", weight: 20 },
    { name: "Midterm Exam", weight: 20 },
    { name: "Final Exam", weight: 30 },
  ],
  "CS12": [
    { name: "Quizzes", weight: 15 },
    { name: "Attendance", weight: 5 },
    { name: "Class Performance", weight: 15 },
    { name: "Projects", weight: 25 },
    { name: "Midterm Exam", weight: 20 },
    { name: "Final Exam", weight: 20 },
  ],
  "MATH14": [
    { name: "Quizzes", weight: 25 },
    { name: "Attendance", weight: 5 },
    { name: "Class Performance", weight: 10 },
    { name: "Midterm Exam", weight: 30 },
    { name: "Final Exam", weight: 30 },
  ],
  "CS10": [
    { name: "Quizzes", weight: 20 },
    { name: "Attendance", weight: 10 },
    { name: "Class Performance", weight: 10 },
    { name: "Projects", weight: 20 },
    { name: "Midterm Exam", weight: 20 },
    { name: "Final Exam", weight: 20 },
  ],
};

const GradesManagement = () => {
  const { role } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [studentIdFilter, setStudentIdFilter] = useState("2023-0001"); // Default for student/parent view
  
  const isStudentOrParent = role === "student" || role === "parent";
  const canEditGrades = role === "admin" || role === "teacher";
  
  // Filter grades based on role and search query
  const filteredGrades = gradesData.filter((grade) => {
    // For student/parent roles, only show their own grades
    if (isStudentOrParent && grade.studentId !== studentIdFilter) {
      return false;
    }
    
    return (
      grade.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.courseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.courseName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  const getLetterGrade = (score: number) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };
  
  const handleRowClick = (grade: any) => {
    setSelectedGrade(grade);
    setSelectedTab("breakdown");
  };

  // Create chart data from grade breakdown
  const createChartData = (grade: any) => {
    if (!grade || !grade.breakdown) return [];

    return Object.entries(grade.breakdown).map(([key, value]: [string, any]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: value.weight,
      score: value.score,
    }));
  };

  const chartData = selectedGrade ? createChartData(selectedGrade) : [];

  // Define colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Grades Management</h2>
        <p className="text-gray-600">View and manage student grades</p>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breakdown" disabled={!selectedGrade}>
              Grade Breakdown
            </TabsTrigger>
            {canEditGrades && (
              <TabsTrigger value="grading-policy">Grading Policy</TabsTrigger>
            )}
          </TabsList>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search grades..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {canEditGrades && (
              <Button onClick={() => toast.info("Grade export feature coming soon")}>
                Export Grades
              </Button>
            )}
          </div>
        </div>

        <TabsContent value="overview">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Midterm</TableHead>
                  <TableHead>Finals</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Letter Grade</TableHead>
                  {canEditGrades && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.length > 0 ? (
                  filteredGrades.map((grade) => (
                    <TableRow 
                      key={grade.id} 
                      className="cursor-pointer hover:bg-gray-50" 
                      onClick={() => handleRowClick(grade)}
                    >
                      <TableCell>{grade.studentId}</TableCell>
                      <TableCell>{grade.studentName}</TableCell>
                      <TableCell>{grade.courseId} - {grade.courseName}</TableCell>
                      <TableCell>{grade.midterm}</TableCell>
                      <TableCell>{grade.finals}</TableCell>
                      <TableCell>{grade.average}</TableCell>
                      <TableCell>{getLetterGrade(grade.average)}</TableCell>
                      {canEditGrades && (
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              toast.info("Edit grades feature coming soon");
                            }}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={canEditGrades ? 8 : 7} className="text-center py-10 text-muted-foreground">
                      No grades found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <p className="mt-3 text-sm text-muted-foreground">
            Click on any row to view the detailed grade breakdown
          </p>
        </TabsContent>
      
        <TabsContent value="breakdown">
          {selectedGrade ? (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Breakdown</CardTitle>
                  <CardDescription>
                    {selectedGrade.courseId} - {selectedGrade.courseName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(selectedGrade.breakdown).map(([key, value]: [string, any]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {key.charAt(0).toUpperCase() + key.slice(1)} ({value.weight}%)
                          </span>
                          <span className="text-sm font-medium">{value.score}/100</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              value.score >= 90 ? 'bg-green-500' : 
                              value.score >= 80 ? 'bg-blue-500' : 
                              value.score >= 70 ? 'bg-yellow-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${value.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-between font-medium">
                        <span>Final Grade:</span>
                        <span>{selectedGrade.average}/100 ({getLetterGrade(selectedGrade.average)})</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                  <CardDescription>
                    Breakdown by category weight
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer config={{
                      quizzes: { color: "#0088FE" },
                      attendance: { color: "#00C49F" },
                      classPerformance: { color: "#FFBB28" },
                      midterm: { color: "#FF8042" },
                      finals: { color: "#8884D8" },
                      projects: { color: "#82CA9D" },
                    }}>
                      <RechartsChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          labelLine={false}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                        />
                      </RechartsChart>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="md:col-span-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedGrade(null);
                    setSelectedTab("overview");
                  }}
                >
                  Back to Grades Overview
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium">No grade selected</h3>
              <p className="text-sm text-gray-500 mt-1">
                Select a grade from the overview to see detailed breakdown
              </p>
            </div>
          )}
        </TabsContent>
      
        {canEditGrades && (
          <TabsContent value="grading-policy">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Grading Policies</CardTitle>
                  <CardDescription>
                    Review and manage grading policies for each course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(courseGradingPolicies).map(([courseId, policies]) => (
                      <div key={courseId} className="border rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-4">
                          {courseId} - {gradesData.find(g => g.courseId === courseId)?.courseName}
                        </h3>
                        <div className="grid gap-3">
                          {policies.map((policy, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span>{policy.name}</span>
                              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                                {policy.weight}%
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-end mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toast.info("Edit policy feature coming soon")}
                          >
                            Edit Policy
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default GradesManagement;
