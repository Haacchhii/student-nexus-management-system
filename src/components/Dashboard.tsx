
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Users, Clock, Book, Graduation, FileText, Calendar, 
  BarChart2, CheckCircle, AlertTriangle, UserPlus 
} from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const { role } = useRole();
  
  // Role-based dashboard content
  const renderRoleBasedStats = () => {
    switch (role) {
      case "admin":
        return <AdminDashboard />;
      case "teacher":
        return <TeacherDashboard />;
      case "student":
        return <StudentDashboard />;
      case "parent":
        return <ParentDashboard />;
      default:
        return <AdminDashboard />;
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {renderRoleBasedStats()}
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <>
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">256</div>
            <p className="text-xs text-muted-foreground">+12% from last semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Applications</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Fee Collection</CardTitle>
            <CardDescription>Academic Year 2024-2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Tuition Fees</span>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Laboratory Fees</span>
                  <span className="text-sm text-muted-foreground">87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Miscellaneous Fees</span>
                  <span className="text-sm text-muted-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm font-medium">New student registered</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm font-medium">Attendance updated for CS101</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm font-medium">Student profile updated</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm font-medium">New exam scheduled</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm font-medium">Grades submitted for CS201</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Final Examination</p>
                  <p className="text-xs text-muted-foreground">CS15 - Software Engineering</p>
                </div>
                <p className="text-xs text-muted-foreground">May 19, 2025</p>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Enrollment Period</p>
                  <p className="text-xs text-muted-foreground">First Semester AY 2025-2026</p>
                </div>
                <p className="text-xs text-muted-foreground">June 1-15, 2025</p>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Graduation Ceremony</p>
                  <p className="text-xs text-muted-foreground">Batch 2025</p>
                </div>
                <p className="text-xs text-muted-foreground">July 5, 2025</p>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Faculty Meeting</p>
                  <p className="text-xs text-muted-foreground">All Departments</p>
                </div>
                <p className="text-xs text-muted-foreground">May 22, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Overview</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Present</span>
                </div>
                <span className="text-sm font-medium">82%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Late</span>
                </div>
                <span className="text-sm font-medium">10%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Absent</span>
                </div>
                <span className="text-sm font-medium">8%</span>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  View Attendance Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 border-l-4 border-yellow-500 pl-4">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">15 students with attendance below 75%</p>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l-4 border-yellow-500 pl-4">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">8 pending fee payments past due date</p>
                  <p className="text-xs text-muted-foreground">Follow up needed</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l-4 border-green-500 pl-4">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">All grades submitted for current term</p>
                  <p className="text-xs text-muted-foreground">Complete</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-l-4 border-yellow-500 pl-4">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">10 new applications awaiting review</p>
                  <p className="text-xs text-muted-foreground">Pending review</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const TeacherDashboard = () => {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Classes</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">178</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next 7 days</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start p-3 bg-blue-50 rounded-md">
                <div>
                  <p className="text-sm font-medium">CS15 - Software Engineering</p>
                  <p className="text-xs text-muted-foreground">Room 301, 9:00 AM - 11:00 AM</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
              
              <div className="flex justify-between items-start p-3 bg-blue-50 rounded-md">
                <div>
                  <p className="text-sm font-medium">CS10 - Computer Programming</p>
                  <p className="text-xs text-muted-foreground">Lab 201, 1:00 PM - 3:00 PM</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
              
              <div className="flex justify-between items-start p-3 bg-blue-50 rounded-md">
                <div>
                  <p className="text-sm font-medium">CS12 - Data Structures</p>
                  <p className="text-xs text-muted-foreground">Room 302, 3:30 PM - 5:30 PM</p>
                </div>
                <Button size="sm" variant="outline">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-l-4 border-yellow-500 pl-4 py-2">
                <div>
                  <p className="text-sm font-medium">Grade CS12 Quiz #3</p>
                  <p className="text-xs text-muted-foreground">Due: May 21, 2025</p>
                </div>
                <Button size="sm">Grade</Button>
              </div>
              
              <div className="flex items-center justify-between border-l-4 border-red-500 pl-4 py-2">
                <div>
                  <p className="text-sm font-medium">Update CS15 Attendance</p>
                  <p className="text-xs text-muted-foreground">Due: May 19, 2025</p>
                </div>
                <Button size="sm">Update</Button>
              </div>
              
              <div className="flex items-center justify-between border-l-4 border-yellow-500 pl-4 py-2">
                <div>
                  <p className="text-sm font-medium">Prepare CS10 Final Exam</p>
                  <p className="text-xs text-muted-foreground">Due: May 23, 2025</p>
                </div>
                <Button size="sm">Prepare</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const StudentDashboard = () => {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">My Courses</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">GPA</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.7</div>
            <p className="text-xs text-muted-foreground">Out of 4.0</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start p-3 bg-red-50 border border-red-100 rounded-md">
                <div className="flex gap-3">
                  <Calendar className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="text-sm font-medium">CS15 Project Submission</p>
                    <p className="text-xs text-red-700">Due: Tomorrow, 11:59 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                <div className="flex gap-3">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium">CS12 Quiz #4</p>
                    <p className="text-xs text-yellow-700">Due: May 22, 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-start p-3 bg-blue-50 border border-blue-100 rounded-md">
                <div className="flex gap-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">CS10 Practical Exam</p>
                    <p className="text-xs text-blue-700">Due: May 24, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Tuition Fee</span>
                  <span className="text-sm text-green-600 font-medium">Paid</span>
                </div>
                <Progress value={100} className="h-2 bg-gray-100" />
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Laboratory Fee</span>
                  <span className="text-sm text-green-600 font-medium">Paid</span>
                </div>
                <Progress value={100} className="h-2 bg-gray-100" />
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Miscellaneous Fee</span>
                  <span className="text-sm text-yellow-600 font-medium">Partial</span>
                </div>
                <Progress value={75} className="h-2 bg-gray-100" />
              </div>
              
              <div className="pt-2">
                <Button className="w-full" size="sm">
                  View Fee Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center border-l-4 border-green-500 pl-4 py-2">
                <div>
                  <p className="text-sm font-medium">CS15 - Mid-Term Exam</p>
                  <p className="text-xs text-muted-foreground">Software Engineering</p>
                </div>
                <div className="text-lg font-bold text-green-600">93%</div>
              </div>
              
              <div className="flex justify-between items-center border-l-4 border-green-500 pl-4 py-2">
                <div>
                  <p className="text-sm font-medium">CS12 - Quiz #3</p>
                  <p className="text-xs text-muted-foreground">Data Structures</p>
                </div>
                <div className="text-lg font-bold text-green-600">88%</div>
              </div>
              
              <div className="flex justify-between items-center border-l-4 border-yellow-500 pl-4 py-2">
                <div>
                  <p className="text-sm font-medium">CS20 - Project 1</p>
                  <p className="text-xs text-muted-foreground">Database Management</p>
                </div>
                <div className="text-lg font-bold text-yellow-600">78%</div>
              </div>
              
              <div className="flex justify-between items-center border-l-4 border-green-500 pl-4 py-2">
                <div>
                  <p className="text-sm font-medium">CS10 - Lab Exercise</p>
                  <p className="text-xs text-muted-foreground">Computer Programming</p>
                </div>
                <div className="text-lg font-bold text-green-600">95%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const ParentDashboard = () => {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Student's Courses</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
            <Graduation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">B+</div>
            <p className="text-xs text-muted-foreground">Current average</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-l-4 border-green-500 pl-4 py-2">
                <div>
                  <p className="text-sm font-medium">Tuition Fee</p>
                  <p className="text-xs text-muted-foreground">Due: April 30, 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600 font-medium">Paid</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
              
              <div className="flex items-center justify-between border-l-4 border-green-500 pl-4 py-2">
                <div>
                  <p className="text-sm font-medium">Laboratory Fee</p>
                  <p className="text-xs text-muted-foreground">Due: April 30, 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-green-600 font-medium">Paid</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
              
              <div className="flex items-center justify-between border-l-4 border-yellow-500 pl-4 py-2">
                <div>
                  <p className="text-sm font-medium">Miscellaneous Fee</p>
                  <p className="text-xs text-muted-foreground">Due: May 15, 2025</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm">Pay Now</Button>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" className="w-full" size="sm">
                  View Payment History
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Communications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <p className="text-sm font-medium">Parent-Teacher Meeting Schedule</p>
                <p className="text-xs text-muted-foreground">From: Academic Affairs</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <p className="text-sm font-medium">CS15 Progress Report</p>
                <p className="text-xs text-muted-foreground">From: Prof. Martinez</p>
                <p className="text-xs text-muted-foreground">4 days ago</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-1">
                <p className="text-sm font-medium">Reminder: Fee Payment</p>
                <p className="text-xs text-muted-foreground">From: Finance Department</p>
                <p className="text-xs text-muted-foreground">1 week ago</p>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" className="w-full" size="sm">
                  View All Messages
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-md">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Final Examination Week</p>
                  <p className="text-xs text-blue-700">May 19-24, 2025</p>
                  <p className="text-xs text-muted-foreground mt-1">Please ensure your child is prepared for all scheduled exams</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-md">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Parent-Teacher Conference</p>
                  <p className="text-xs text-blue-700">June 5, 2025</p>
                  <p className="text-xs text-muted-foreground mt-1">Discuss your child's academic performance with their professors</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-md">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Enrollment Period for Next Semester</p>
                  <p className="text-xs text-blue-700">June 1-15, 2025</p>
                  <p className="text-xs text-muted-foreground mt-1">Don't forget to enroll your child for the upcoming semester</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
