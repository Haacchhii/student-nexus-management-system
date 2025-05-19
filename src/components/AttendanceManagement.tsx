
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Check, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  date: Date;
  status: 'present' | 'absent' | 'late';
}

const courses = [
  { id: "CS15", name: "Software Engineering" },
  { id: "CS12", name: "Data Structures and Algorithms" },
  { id: "CS10", name: "Computer Programming" },
  { id: "CS20", name: "Database Management" },
];

const students = [
  { id: "2023-0001", name: "John Doe" },
  { id: "2023-0002", name: "Jane Smith" },
  { id: "2022-0003", name: "Michael Johnson" },
  { id: "2024-0004", name: "Emily Davis" },
  { id: "2023-0005", name: "Robert Wilson" },
];

const initialAttendance: AttendanceRecord[] = [
  {
    id: "1",
    studentId: "2023-0001",
    studentName: "John Doe",
    course: "CS15",
    date: new Date(2025, 4, 19), // May 19, 2025
    status: "present"
  },
  {
    id: "2",
    studentId: "2023-0002",
    studentName: "Jane Smith",
    course: "CS15",
    date: new Date(2025, 4, 19),
    status: "present"
  },
  {
    id: "3",
    studentId: "2022-0003",
    studentName: "Michael Johnson",
    course: "CS15",
    date: new Date(2025, 4, 19),
    status: "absent"
  },
  {
    id: "4",
    studentId: "2024-0004",
    studentName: "Emily Davis",
    course: "CS15",
    date: new Date(2025, 4, 19),
    status: "late"
  },
  {
    id: "5",
    studentId: "2023-0005",
    studentName: "Robert Wilson",
    course: "CS15",
    date: new Date(2025, 4, 19),
    status: "present"
  },
];

const AttendanceManagement = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendance);
  const [selectedCourse, setSelectedCourse] = useState("CS15");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 4, 19));
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = attendanceRecords.filter((record) => 
    record.course === selectedCourse && 
    format(record.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd') &&
    (record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
     record.studentId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceRecords(attendanceRecords.map(record => {
      if (record.studentId === studentId && 
          record.course === selectedCourse &&
          format(record.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')) {
        return { ...record, status };
      }
      return record;
    }));
    
    toast.success(`Attendance updated for ${students.find(s => s.id === studentId)?.name}`);
  };

  const handleAddAllStudents = () => {
    // Check which students don't have records for the selected date and course
    const existingStudentIds = filteredRecords.map(record => record.studentId);
    const missingStudents = students.filter(student => !existingStudentIds.includes(student.id));
    
    if (missingStudents.length === 0) {
      toast.info("All students already have attendance records for this date and course");
      return;
    }
    
    // Create new attendance records for missing students
    const newRecords = missingStudents.map((student, index) => ({
      id: `new-${Date.now()}-${index}`,
      studentId: student.id,
      studentName: student.name,
      course: selectedCourse,
      date: new Date(selectedDate),
      status: 'present' as const
    }));
    
    setAttendanceRecords([...attendanceRecords, ...newRecords]);
    toast.success(`Added ${missingStudents.length} students to attendance records`);
  };

  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'present':
        return "bg-green-100 text-green-800 border-green-200";
      case 'absent':
        return "bg-red-100 text-red-800 border-red-200";
      case 'late':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Attendance Management</h2>
        <p className="text-gray-600">Track and manage student attendance</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <Label htmlFor="course-select">Select Course</Label>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger id="course-select" className="mt-1">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.id} - {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full mt-1 justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-end">
          <Button className="w-full" onClick={handleAddAllStudents}>
            Add All Students
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.studentId}</TableCell>
                  <TableCell>{record.studentName}</TableCell>
                  <TableCell>{record.course}</TableCell>
                  <TableCell>{format(record.date, 'PP')}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeStyles(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          record.status === 'present' && "bg-green-100 hover:bg-green-200 border-green-300"
                        )}
                        onClick={() => handleAttendanceChange(record.studentId, 'present')}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          record.status === 'absent' && "bg-red-100 hover:bg-red-200 border-red-300"
                        )}
                        onClick={() => handleAttendanceChange(record.studentId, 'absent')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          record.status === 'late' && "bg-yellow-100 hover:bg-yellow-200 border-yellow-300"
                        )}
                        onClick={() => handleAttendanceChange(record.studentId, 'late')}
                      >
                        <span className="text-xs font-bold">L</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No attendance records found for the selected criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div>
          <h4 className="font-medium text-sm">Attendance Summary</h4>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Present: {filteredRecords.filter(r => r.status === 'present').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Absent: {filteredRecords.filter(r => r.status === 'absent').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Late: {filteredRecords.filter(r => r.status === 'late').length}</span>
            </div>
          </div>
        </div>
        
        <Button
          onClick={() => {
            toast.success("Attendance records saved successfully");
          }}
        >
          Save Attendance
        </Button>
      </div>
    </div>
  );
};

export default AttendanceManagement;
