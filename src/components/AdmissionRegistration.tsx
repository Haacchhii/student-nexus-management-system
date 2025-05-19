
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, CalendarPlus, CheckCircle, Clock } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { toast } from "sonner";

// Sample data for applicants
const applicantsData = [
  { 
    id: "APP-2025-001", 
    name: "Alexander Wilson", 
    email: "alexander.w@example.com", 
    phone: "555-123-4567", 
    program: "BS Computer Science", 
    submissionDate: "2025-04-15", 
    status: "under_review" 
  },
  { 
    id: "APP-2025-002", 
    name: "Harper Johnson", 
    email: "harper.j@example.com", 
    phone: "555-234-5678", 
    program: "BA Business Administration", 
    submissionDate: "2025-04-18", 
    status: "approved" 
  },
  { 
    id: "APP-2025-003", 
    name: "Sophia Martinez", 
    email: "sophia.m@example.com", 
    phone: "555-345-6789", 
    program: "BS Information Technology", 
    submissionDate: "2025-04-20", 
    status: "pending" 
  },
  { 
    id: "APP-2025-004", 
    name: "Ethan Anderson", 
    email: "ethan.a@example.com", 
    phone: "555-456-7890", 
    program: "BS Computer Engineering", 
    submissionDate: "2025-04-22", 
    status: "approved" 
  },
  { 
    id: "APP-2025-005", 
    name: "Isabella Thomas", 
    email: "isabella.t@example.com", 
    phone: "555-567-8901", 
    program: "BS Information Systems", 
    submissionDate: "2025-04-23", 
    status: "waitlisted" 
  },
];

// Sample data for upcoming enrollment schedules
const enrollmentSchedules = [
  { 
    id: "1", 
    academicYear: "2025-2026", 
    semester: "First", 
    program: "BS Computer Science", 
    startDate: "2025-06-01", 
    endDate: "2025-06-15", 
    status: "upcoming" 
  },
  { 
    id: "2", 
    academicYear: "2025-2026", 
    semester: "First", 
    program: "BS Information Technology", 
    startDate: "2025-06-01", 
    endDate: "2025-06-15", 
    status: "upcoming" 
  },
  { 
    id: "3", 
    academicYear: "2024-2025", 
    semester: "Summer", 
    program: "All Programs", 
    startDate: "2025-05-01", 
    endDate: "2025-05-10", 
    status: "active" 
  },
  { 
    id: "4", 
    academicYear: "2024-2025", 
    semester: "Second", 
    program: "All Programs", 
    startDate: "2025-01-03", 
    endDate: "2025-01-15", 
    status: "completed" 
  },
];

// Sample data for new student registrations
const newRegistrations = [
  { 
    id: "REG-2025-001", 
    studentId: "2025-0015", 
    name: "Benjamin Clark", 
    program: "BS Computer Science", 
    registrationDate: "2025-04-28", 
    yearLevel: "1st Year", 
    status: "pending_requirements" 
  },
  { 
    id: "REG-2025-002", 
    studentId: "2025-0016", 
    name: "Amelia Wright", 
    program: "BS Information Technology", 
    registrationDate: "2025-04-27", 
    yearLevel: "1st Year", 
    status: "completed" 
  },
  { 
    id: "REG-2025-003", 
    studentId: "2025-0017", 
    name: "Lucas Rodriguez", 
    program: "BS Computer Engineering", 
    registrationDate: "2025-04-26", 
    yearLevel: "2nd Year (Transferee)", 
    status: "pending_evaluation" 
  },
  { 
    id: "REG-2025-004", 
    studentId: "2025-0018", 
    name: "Mia Thompson", 
    program: "BA Business Administration", 
    registrationDate: "2025-04-25", 
    yearLevel: "1st Year", 
    status: "completed" 
  },
];

// Available programs
const programs = [
  "BS Computer Science",
  "BS Information Technology",
  "BS Information Systems",
  "BS Computer Engineering",
  "BA Business Administration",
  "BS Accountancy",
  "BS Mathematics",
  "BS Psychology"
];

const AdmissionRegistration = () => {
  const { role } = useRole();
  const [activeTab, setActiveTab] = useState("applications");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter data based on search query
  const filteredApplicants = applicantsData.filter(applicant => 
    applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    applicant.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    applicant.program.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredSchedules = enrollmentSchedules.filter(schedule => 
    schedule.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
    schedule.academicYear.toLowerCase().includes(searchQuery.toLowerCase()) ||
    schedule.semester.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredRegistrations = newRegistrations.filter(registration => 
    registration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    registration.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    registration.program.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Status badges
  const getApplicationStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>;
      case "pending":
        return <Badge className="bg-blue-500">Pending</Badge>;
      case "under_review":
        return <Badge className="bg-purple-500">Under Review</Badge>;
      case "waitlisted":
        return <Badge className="bg-yellow-500">Waitlisted</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getScheduleStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "completed":
        return <Badge className="bg-gray-500">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getRegistrationStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Complete</Badge>;
      case "pending_requirements":
        return <Badge className="bg-yellow-500">Pending Requirements</Badge>;
      case "pending_evaluation":
        return <Badge className="bg-purple-500">Pending Evaluation</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const canManageAdmissions = role === "admin";
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Admission and Registration</h2>
        <p className="text-gray-600">Manage student applications, enrollment, and registration</p>
      </div>
      
      {/* Quick Stats Cards */}
      {canManageAdmissions && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applicantsData.length}</div>
              <p className="text-xs text-muted-foreground">Current Academic Year</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {applicantsData.filter(a => a.status === "approved").length}
              </div>
              <p className="text-xs text-muted-foreground">Ready for enrollment</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newRegistrations.length}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enrollmentSchedules.filter(s => s.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">Current enrollment periods</p>
            </CardContent>
          </Card>
        </div>
      )}
      
      <div className="mb-6 flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {canManageAdmissions && (
          <div className="flex gap-2">
            <Button onClick={() => toast.info("New application feature coming soon")}>
              <UserPlus className="h-4 w-4 mr-2" /> New Application
            </Button>
            <Button variant="outline" onClick={() => toast.info("Schedule enrollment feature coming soon")}>
              <CalendarPlus className="h-4 w-4 mr-2" /> Schedule Enrollment
            </Button>
          </div>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment Schedules</TabsTrigger>
          <TabsTrigger value="registration">New Student Registration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  {canManageAdmissions && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplicants.length > 0 ? (
                  filteredApplicants.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell>{applicant.id}</TableCell>
                      <TableCell>{applicant.name}</TableCell>
                      <TableCell>{applicant.program}</TableCell>
                      <TableCell>{applicant.submissionDate}</TableCell>
                      <TableCell>{getApplicationStatusBadge(applicant.status)}</TableCell>
                      {canManageAdmissions && (
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => toast.info("View application details feature coming soon")}>
                              View
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => toast.info("Update application status feature coming soon")}>
                              Update
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={canManageAdmissions ? 6 : 5} className="text-center py-10 text-muted-foreground">
                      No applications found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {canManageAdmissions && (
            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={() => toast.info("Export applications feature coming soon")}>
                Export Applications
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="enrollment">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Academic Year</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  {canManageAdmissions && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedules.length > 0 ? (
                  filteredSchedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell>{schedule.academicYear}</TableCell>
                      <TableCell>{schedule.semester}</TableCell>
                      <TableCell>{schedule.program}</TableCell>
                      <TableCell>{schedule.startDate}</TableCell>
                      <TableCell>{schedule.endDate}</TableCell>
                      <TableCell>{getScheduleStatusBadge(schedule.status)}</TableCell>
                      {canManageAdmissions && (
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => toast.info("Edit schedule feature coming soon")}>
                              Edit
                            </Button>
                            {schedule.status === "active" && (
                              <Button size="sm" onClick={() => toast.info("View enrollees feature coming soon")}>
                                View Enrollees
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={canManageAdmissions ? 7 : 6} className="text-center py-10 text-muted-foreground">
                      No schedules found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {canManageAdmissions && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Add New Enrollment Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="academic-year">Academic Year</Label>
                  <Select>
                    <SelectTrigger id="academic-year">
                      <SelectValue placeholder="Select Academic Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2025-2026">2025-2026</SelectItem>
                      <SelectItem value="2026-2027">2026-2027</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="semester">Semester</Label>
                  <Select>
                    <SelectTrigger id="semester">
                      <SelectValue placeholder="Select Semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="First">First</SelectItem>
                      <SelectItem value="Second">Second</SelectItem>
                      <SelectItem value="Summer">Summer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="program">Program</Label>
                  <Select>
                    <SelectTrigger id="program">
                      <SelectValue placeholder="Select Program" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Programs">All Programs</SelectItem>
                      {programs.map(program => (
                        <SelectItem key={program} value={program}>{program}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input type="date" id="start-date" />
                </div>
                
                <div>
                  <Label htmlFor="end-date">End Date</Label>
                  <Input type="date" id="end-date" />
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full" onClick={() => toast.info("Schedule added feature coming soon")}>
                    Add Schedule
                  </Button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="registration">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Registration ID</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Year Level</TableHead>
                  <TableHead>Status</TableHead>
                  {canManageAdmissions && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((registration) => (
                    <TableRow key={registration.id}>
                      <TableCell>{registration.id}</TableCell>
                      <TableCell>{registration.studentId}</TableCell>
                      <TableCell>{registration.name}</TableCell>
                      <TableCell>{registration.program}</TableCell>
                      <TableCell>{registration.yearLevel}</TableCell>
                      <TableCell>{getRegistrationStatusBadge(registration.status)}</TableCell>
                      {canManageAdmissions && (
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => toast.info("View registration details feature coming soon")}>
                              View
                            </Button>
                            <Button size="sm" onClick={() => toast.info("Process registration feature coming soon")}>
                              Process
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={canManageAdmissions ? 7 : 6} className="text-center py-10 text-muted-foreground">
                      No registrations found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {canManageAdmissions && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex gap-3">
                <div className="text-blue-500">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-800">Registration Processing Tips</h3>
                  <ul className="mt-2 space-y-2 text-blue-700 text-sm">
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 text-blue-600" />
                      <span>Registrations should be processed within 48 hours of submission</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 text-blue-600" />
                      <span>Verify all required documents before completing registration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-0.5 text-blue-600" />
                      <span>Notify students once their registration is complete</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdmissionRegistration;
