
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { toast } from "sonner";

const gradesData = [
  { id: "1", studentId: "2023-0001", studentName: "John Doe", courseId: "CS15", courseName: "Software Engineering", midterm: 92, finals: 88, average: 90 },
  { id: "2", studentId: "2023-0002", studentName: "Jane Smith", courseId: "CS15", courseName: "Software Engineering", midterm: 85, finals: 89, average: 87 },
  { id: "3", studentId: "2022-0003", studentName: "Michael Johnson", courseId: "CS15", courseName: "Software Engineering", midterm: 78, finals: 82, average: 80 },
  { id: "4", studentId: "2024-0004", studentName: "Emily Davis", courseId: "CS15", courseName: "Software Engineering", midterm: 95, finals: 91, average: 93 },
  { id: "5", studentId: "2023-0005", studentName: "Robert Wilson", courseId: "CS15", courseName: "Software Engineering", midterm: 89, finals: 85, average: 87 },
];

const GradesManagement = () => {
  const { role } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredGrades = gradesData.filter((grade) => 
    grade.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grade.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    grade.courseId.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getLetterGrade = (score: number) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };
  
  const canEditGrades = role === "admin" || role === "teacher";
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Grades Management</h2>
        <p className="text-gray-600">View and manage student grades</p>
      </div>
      
      <div className="mb-6 flex justify-between">
        <div className="relative w-64">
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
                <TableRow key={grade.id}>
                  <TableCell>{grade.studentId}</TableCell>
                  <TableCell>{grade.studentName}</TableCell>
                  <TableCell>{grade.courseId} - {grade.courseName}</TableCell>
                  <TableCell>{grade.midterm}</TableCell>
                  <TableCell>{grade.finals}</TableCell>
                  <TableCell>{grade.average}</TableCell>
                  <TableCell>{getLetterGrade(grade.average)}</TableCell>
                  {canEditGrades && (
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => toast.info("Edit grades feature coming soon")}>
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
    </div>
  );
};

export default GradesManagement;
