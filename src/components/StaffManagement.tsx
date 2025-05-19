
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, UserPlus, FileText, Mail, Phone } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { toast } from "sonner";

// Sample staff data
const staffData = [
  { 
    id: "EMP-001", 
    name: "Dr. Elizabeth Chen", 
    position: "Professor", 
    department: "Computer Science", 
    email: "elizabeth.c@ccas.edu", 
    phone: "555-101-2345", 
    status: "active",
    joinDate: "2020-01-15"
  },
  { 
    id: "EMP-002", 
    name: "Dr. James Wilson", 
    position: "Associate Professor", 
    department: "Information Technology", 
    email: "james.w@ccas.edu", 
    phone: "555-102-3456", 
    status: "active",
    joinDate: "2018-08-10"
  },
  { 
    id: "EMP-003", 
    name: "Prof. Sophia Rodriguez", 
    position: "Assistant Professor", 
    department: "Computer Science", 
    email: "sophia.r@ccas.edu", 
    phone: "555-103-4567", 
    status: "active",
    joinDate: "2021-06-05"
  },
  { 
    id: "EMP-004", 
    name: "Prof. Michael Johnson", 
    position: "Lecturer", 
    department: "Information Systems", 
    email: "michael.j@ccas.edu", 
    phone: "555-104-5678", 
    status: "on_leave",
    joinDate: "2019-03-22"
  },
  { 
    id: "EMP-005", 
    name: "Dr. Emma Davis", 
    position: "Professor", 
    department: "Information Technology", 
    email: "emma.d@ccas.edu", 
    phone: "555-105-6789", 
    status: "active",
    joinDate: "2017-11-08"
  },
  { 
    id: "EMP-006", 
    name: "Prof. Daniel Martinez", 
    position: "Lecturer", 
    department: "Computer Engineering", 
    email: "daniel.m@ccas.edu", 
    phone: "555-106-7890", 
    status: "active",
    joinDate: "2022-01-10"
  },
  { 
    id: "EMP-007", 
    name: "Dr. Olivia Thompson", 
    position: "Associate Professor", 
    department: "Computer Science", 
    email: "olivia.t@ccas.edu", 
    phone: "555-107-8901", 
    status: "sabbatical",
    joinDate: "2016-09-15"
  },
  { 
    id: "EMP-008", 
    name: "Prof. William Brown", 
    position: "Assistant Professor", 
    department: "Information Systems", 
    email: "william.b@ccas.edu", 
    phone: "555-108-9012", 
    status: "active",
    joinDate: "2020-07-20"
  },
];

// Sample departments
const departments = [
  "Computer Science",
  "Information Technology",
  "Information Systems",
  "Computer Engineering",
  "Software Engineering"
];

// Sample positions
const positions = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "Adjunct Faculty",
  "Department Chair"
];

const StaffManagement = () => {
  const { role } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("faculty");
  const [filterDepartment, setFilterDepartment] = useState("all");
  
  // Only admin can manage staff
  const canManageStaff = role === "admin";
  
  // Filter staff based on search query and department
  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = 
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.department.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesDepartment = filterDepartment === "all" || staff.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>;
      case "on_leave":
        return <Badge className="bg-yellow-500">On Leave</Badge>;
      case "sabbatical":
        return <Badge className="bg-blue-500">Sabbatical</Badge>;
      case "retired":
        return <Badge className="bg-gray-500">Retired</Badge>;
      case "terminated":
        return <Badge className="bg-red-500">Terminated</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Staff Management</h2>
        <p className="text-gray-600">Manage faculty and administrative staff</p>
      </div>
      
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{staffData.length}</div>
            <p className="text-xs text-muted-foreground">Active and on-leave</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Faculty</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">Teaching staff</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Administrative</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Administrative staff</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Academic departments</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search staff..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {canManageStaff && (
          <div className="flex gap-2">
            <Button onClick={() => toast.info("Add staff member feature coming soon")}>
              <UserPlus className="h-4 w-4 mr-2" /> Add Staff Member
            </Button>
            <Button variant="outline" onClick={() => toast.info("Generate report feature coming soon")}>
              <FileText className="h-4 w-4 mr-2" /> Generate Report
            </Button>
          </div>
        )}
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="administrative">Administrative Staff</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faculty">
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  {canManageStaff && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.length > 0 ? (
                  filteredStaff.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell>{staff.id}</TableCell>
                      <TableCell>{staff.name}</TableCell>
                      <TableCell>{staff.position}</TableCell>
                      <TableCell>{staff.department}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span className="text-xs">{staff.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span className="text-xs">{staff.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(staff.status)}</TableCell>
                      {canManageStaff && (
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => toast.info("View staff profile feature coming soon")}>
                              View
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => toast.info("Edit staff details feature coming soon")}>
                              Edit
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={canManageStaff ? 7 : 6} className="text-center py-10 text-muted-foreground">
                      No staff members found matching your search
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="administrative">
          <div className="p-8 text-center border rounded-md">
            <h3 className="text-xl font-medium text-gray-600 mb-2">Administrative Staff Management</h3>
            <p className="text-gray-500 mb-6">This module is under development and will be available soon.</p>
            <Button onClick={() => toast.info("Administrative staff management coming soon")}>
              Notify Me When Available
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="departments">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{dept}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Total Staff:</span>
                      <span className="font-medium">
                        {staffData.filter(staff => staff.department === dept).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Professors:</span>
                      <span className="font-medium">
                        {staffData.filter(staff => 
                          staff.department === dept && 
                          staff.position === "Professor"
                        ).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Other Faculty:</span>
                      <span className="font-medium">
                        {staffData.filter(staff => 
                          staff.department === dept && 
                          staff.position !== "Professor"
                        ).length}
                      </span>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => toast.info("Department details feature coming soon")}>
                        View Department Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {canManageStaff && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="text-lg font-medium text-blue-800">Staff Management Tips</h3>
          <ul className="mt-2 space-y-2 text-blue-700 text-sm">
            <li>Regularly update staff contact information and status</li>
            <li>Use the Generate Report feature to create staff directories</li>
            <li>Manage teaching assignments through the Department section</li>
            <li>Schedule faculty evaluations and reviews through the system</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
