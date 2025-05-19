
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay, isAfter, isBefore, addDays, subDays } from "date-fns";
import { CalendarIcon, Check, Search, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRole } from "@/contexts/RoleContext";

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
  { id: "MATH14", name: "Calculus I" },
  { id: "CS30", name: "Web Development" },
  { id: "CS35", name: "Mobile App Development" },
  { id: "CS40", name: "Artificial Intelligence" },
];

const students = [
  { id: "2023-0001", name: "John Doe" },
  { id: "2023-0002", name: "Jane Smith" },
  { id: "2022-0003", name: "Michael Johnson" },
  { id: "2024-0004", name: "Emily Davis" },
  { id: "2023-0005", name: "Robert Wilson" },
  { id: "2022-0006", name: "Sarah Thompson" },
  { id: "2024-0007", name: "David Martinez" },
  { id: "2023-0008", name: "Olivia Rodriguez" },
  { id: "2022-0009", name: "William Brown" },
  { id: "2024-0010", name: "Sophia Lee" },
  { id: "2023-0011", name: "James Taylor" },
  { id: "2022-0012", name: "Emma Garcia" },
];

// Generate more realistic attendance data for the past 30 days
const generateAttendanceRecords = () => {
  const records: AttendanceRecord[] = [];
  const currentDate = new Date(2025, 4, 19); // May 19, 2025
  
  for (let i = 0; i < 30; i++) {
    const recordDate = subDays(currentDate, i);
    // Skip weekends (6 = Saturday, 0 = Sunday)
    const dayOfWeek = recordDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    // Add records for CS15 course
    students.forEach((student) => {
      // Generate some realistic attendance patterns
      let status: 'present' | 'absent' | 'late';
      const random = Math.random();
      
      if (random < 0.7) {
        status = 'present'; // 70% chance of present
      } else if (random < 0.9) {
        status = 'late'; // 20% chance of late
      } else {
        status = 'absent'; // 10% chance of absent
      }

      // For recent dates, add some missing records (not yet marked)
      if (i < 5 && Math.random() > 0.8) {
        continue; // Skip this record to simulate not yet marked
      }

      records.push({
        id: `${student.id}-CS15-${format(recordDate, 'yyyy-MM-dd')}`,
        studentId: student.id,
        studentName: student.name,
        course: "CS15",
        date: recordDate,
        status
      });
    });

    // Add records for CS12 course with different student subset
    students.slice(0, 8).forEach((student) => {
      let status: 'present' | 'absent' | 'late';
      const random = Math.random();
      
      if (random < 0.8) {
        status = 'present';
      } else if (random < 0.95) {
        status = 'late';
      } else {
        status = 'absent';
      }

      if (i < 5 && Math.random() > 0.8) {
        continue;
      }

      records.push({
        id: `${student.id}-CS12-${format(recordDate, 'yyyy-MM-dd')}`,
        studentId: student.id,
        studentName: student.name,
        course: "CS12",
        date: recordDate,
        status
      });
    });
  }
  
  return records;
};

const initialAttendance = generateAttendanceRecords();

const AttendanceManagement = () => {
  const { role, selectedDate, setSelectedDate } = useRole();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(initialAttendance);
  const [selectedCourse, setSelectedCourse] = useState("CS15");
  const [searchQuery, setSearchQuery] = useState("");
  const [userStudentId, setUserStudentId] = useState("2023-0001"); // Student ID for student/parent roles

  // For student/parent roles - current date's attendance
  const isCurrentStudent = (record: AttendanceRecord) => {
    return (role === "student" || role === "parent") && record.studentId === userStudentId;
  };

  // For student/parent, filter only their own records across all courses
  // For admin/teacher, filter by selected course and date
  const filteredRecords = attendanceRecords.filter((record) => {
    if (role === "student" || role === "parent") {
      const matchesStudent = record.studentId === userStudentId;
      const matchesSearch = record.course.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStudent && matchesSearch;
    } else {
      const matchesCourse = record.course === selectedCourse;
      const matchesDate = isSameDay(record.date, selectedDate);
      const matchesSearch = record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           record.studentId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCourse && matchesDate && matchesSearch;
    }
  });

  // Check if the student has already marked attendance for today
  const todaysAttendance = attendanceRecords.find(record => 
    record.studentId === userStudentId && 
    isSameDay(record.date, new Date()) && 
    record.course === selectedCourse
  );

  // Function to handle student marking their own attendance
  const markStudentAttendance = (status: 'present' | 'late') => {
    if (todaysAttendance) {
      toast.error("You've already marked your attendance for today");
      return;
    }
    
    const today = new Date();
    const newRecord: AttendanceRecord = {
      id: `${userStudentId}-${selectedCourse}-${format(today, 'yyyy-MM-dd')}`,
      studentId: userStudentId,
      studentName: students.find(s => s.id === userStudentId)?.name || "",
      course: selectedCourse,
      date: today,
      status: status
    };
    
    setAttendanceRecords([...attendanceRecords, newRecord]);
    toast.success(`Attendance marked as ${status}`);
  };

  // For admin/teacher
  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceRecords(attendanceRecords.map(record => {
      if (record.studentId === studentId && 
          record.course === selectedCourse &&
          isSameDay(record.date, selectedDate)) {
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

  // For admin/teacher - auto-mark absent for past dates
  useEffect(() => {
    const today = new Date();
    const yesterday = subDays(today, 1);
    
    // Only run for admin/teacher roles
    if (role !== "admin" && role !== "teacher") return;

    // Find records from yesterday that weren't marked
    const allStudentsYesterday = students.map(student => ({
      studentId: student.id,
      course: selectedCourse
    }));
    
    // Filter out students who already have attendance records for yesterday
    const yesterdayRecords = attendanceRecords.filter(record => 
      record.course === selectedCourse && isSameDay(record.date, yesterday)
    );
    
    const yesterdayStudentIds = yesterdayRecords.map(record => record.studentId);
    const missingYesterdayStudents = allStudentsYesterday.filter(
      student => !yesterdayStudentIds.includes(student.studentId)
    );
    
    // Auto-mark missing students as absent for yesterday
    if (missingYesterdayStudents.length > 0) {
      const newRecords = missingYesterdayStudents.map((student, index) => ({
        id: `auto-${Date.now()}-${index}`,
        studentId: student.studentId,
        studentName: students.find(s => s.id === student.studentId)?.name || "",
        course: student.course,
        date: new Date(yesterday),
        status: 'absent' as const
      }));
      
      setAttendanceRecords(prev => [...prev, ...newRecords]);
    }
  }, [selectedCourse, role]);

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

  const isAdminOrTeacher = role === "admin" || role === "teacher";
  const isStudentOrParent = role === "student" || role === "parent";

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          {isStudentOrParent ? "My Attendance Records" : "Attendance Management"}
        </h2>
        <p className="text-gray-600">
          {isStudentOrParent 
            ? "View and mark your attendance" 
            : "Track and manage student attendance"}
        </p>
      </div>
      
      {isAdminOrTeacher ? (
        // ADMIN/TEACHER VIEW
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
      ) : (
        // STUDENT/PARENT VIEW
        <div className="mb-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
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
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <div className="text-blue-500 mt-1">
              <CalendarIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium text-blue-800">Today's Attendance</h3>
              <p className="text-blue-600 text-sm mt-1">
                {todaysAttendance 
                  ? `You've already marked your attendance as ${todaysAttendance.status}`
                  : "You haven't marked your attendance for today. Please mark your attendance below."}
              </p>
              {!todaysAttendance && (
                <div className="mt-3 flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => markStudentAttendance('present')}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Check className="h-4 w-4 mr-1" /> Present
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => markStudentAttendance('late')}
                    variant="outline"
                    className="border-yellow-400 text-yellow-700 bg-yellow-50 hover:bg-yellow-100"
                  >
                    I'm Late
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder={isStudentOrParent ? "Search courses..." : "Search students..."}
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
              {isStudentOrParent && <TableHead>Course</TableHead>}
              {isAdminOrTeacher && (
                <>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Name</TableHead>
                </>
              )}
              {isAdminOrTeacher ? <TableHead>Course</TableHead> : null}
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              {isAdminOrTeacher && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  {isStudentOrParent && (
                    <TableCell>
                      {record.course} - {courses.find(c => c.id === record.course)?.name || ''}
                    </TableCell>
                  )}
                  {isAdminOrTeacher && (
                    <>
                      <TableCell>{record.studentId}</TableCell>
                      <TableCell>{record.studentName}</TableCell>
                      <TableCell>{record.course}</TableCell>
                    </>
                  )}
                  <TableCell>{format(record.date, 'PP')}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeStyles(record.status)}`}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </TableCell>
                  {isAdminOrTeacher && (
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
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isAdminOrTeacher ? 6 : 3} className="text-center py-10 text-muted-foreground">
                  {isStudentOrParent 
                    ? "No attendance records found" 
                    : "No attendance records found for the selected criteria"}
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
        
        {isAdminOrTeacher && (
          <Button
            onClick={() => {
              toast.success("Attendance records saved successfully");
            }}
          >
            Save Attendance
          </Button>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;
