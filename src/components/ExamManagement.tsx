
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { toast } from "sonner";

const examsData = [
  { id: "1", courseId: "CS15", courseName: "Software Engineering", examTitle: "Midterm Exam", scheduleDate: "2025-05-20", time: "9:00 AM - 11:00 AM", location: "Room 301", status: "upcoming" },
  { id: "2", courseId: "CS12", courseName: "Data Structures and Algorithms", examTitle: "Final Exam", scheduleDate: "2025-05-25", time: "1:00 PM - 3:00 PM", location: "Room 302", status: "upcoming" },
  { id: "3", courseId: "CS10", courseName: "Computer Programming", examTitle: "Quiz #3", scheduleDate: "2025-05-15", time: "10:00 AM - 11:00 AM", location: "Lab 201", status: "completed" },
  { id: "4", courseId: "CS20", courseName: "Database Management", examTitle: "Practical Exam", scheduleDate: "2025-05-22", time: "3:00 PM - 5:00 PM", location: "Lab 202", status: "upcoming" },
];

const ExamManagement = () => {
  const { role } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredExams = examsData.filter((exam) => 
    exam.courseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.examTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>;
      case "ongoing":
        return <Badge className="bg-green-500">Ongoing</Badge>;
      case "completed":
        return <Badge className="bg-gray-500">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const canManageExams = role === "admin" || role === "teacher";
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Exam Management</h2>
        <p className="text-gray-600">Schedule and manage exams and assessments</p>
      </div>
      
      <div className="mb-6 flex justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search exams..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {canManageExams && (
          <Button onClick={() => toast.info("Schedule exam feature coming soon")}>
            Schedule Exam
          </Button>
        )}
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Exam Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              {canManageExams && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExams.length > 0 ? (
              filteredExams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell>{exam.courseId} - {exam.courseName}</TableCell>
                  <TableCell>{exam.examTitle}</TableCell>
                  <TableCell>{exam.scheduleDate}</TableCell>
                  <TableCell>{exam.time}</TableCell>
                  <TableCell>{exam.location}</TableCell>
                  <TableCell>{getStatusBadge(exam.status)}</TableCell>
                  {canManageExams && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => toast.info("Edit exam feature coming soon")}>
                          Edit
                        </Button>
                        {exam.status !== "completed" && (
                          <Button variant="outline" size="sm" onClick={() => toast.info("Exam results feature coming soon")}>
                            Results
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={canManageExams ? 7 : 6} className="text-center py-10 text-muted-foreground">
                  No exams found matching your search
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {(role === "student" || role === "parent") && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Upcoming Exams</h3>
          <p className="text-blue-700">
            You have {filteredExams.filter(exam => exam.status === "upcoming").length} upcoming exams scheduled.
            {role === "student" && " Make sure to prepare accordingly."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ExamManagement;
