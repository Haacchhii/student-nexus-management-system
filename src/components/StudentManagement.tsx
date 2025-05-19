
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  program: string;
  yearLevel: string;
}

const initialStudents: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    studentId: "2023-0001",
    program: "BSCS",
    yearLevel: "3"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    studentId: "2023-0002",
    program: "BSIT",
    yearLevel: "2"
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    studentId: "2022-0003",
    program: "BSCS",
    yearLevel: "4"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    studentId: "2024-0004",
    program: "BSCS",
    yearLevel: "1"
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.w@example.com",
    studentId: "2023-0005",
    program: "BSIT",
    yearLevel: "3"
  },
];

const StudentManagement = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id'>>({
    name: "",
    email: "",
    studentId: "",
    program: "BSCS",
    yearLevel: "1"
  });
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.studentId) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const id = (students.length + 1).toString();
    setStudents([...students, { id, ...newStudent }]);
    setNewStudent({
      name: "",
      email: "",
      studentId: "",
      program: "BSCS",
      yearLevel: "1"
    });
    setIsAddDialogOpen(false);
    toast.success("Student added successfully");
  };

  const handleEditStudent = () => {
    if (!editingStudent) return;
    
    setStudents(students.map(student => 
      student.id === editingStudent.id ? editingStudent : student
    ));
    
    setEditingStudent(null);
    setIsEditDialogOpen(false);
    toast.success("Student updated successfully");
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
    toast.success("Student removed successfully");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Student Management</h2>
        <div className="flex items-center gap-4">
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
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter the student's information below.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    placeholder="john.doe@example.com"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={newStudent.studentId}
                    onChange={(e) => setNewStudent({...newStudent, studentId: e.target.value})}
                    placeholder="2023-0001"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="program">Program</Label>
                    <Select
                      value={newStudent.program}
                      onValueChange={(value) => setNewStudent({...newStudent, program: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BSCS">BS Computer Science</SelectItem>
                        <SelectItem value="BSIT">BS Information Technology</SelectItem>
                        <SelectItem value="BSIS">BS Information Systems</SelectItem>
                        <SelectItem value="BSAI">BS Artificial Intelligence</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="yearLevel">Year Level</Label>
                    <Select
                      value={newStudent.yearLevel}
                      onValueChange={(value) => setNewStudent({...newStudent, yearLevel: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1st Year</SelectItem>
                        <SelectItem value="2">2nd Year</SelectItem>
                        <SelectItem value="3">3rd Year</SelectItem>
                        <SelectItem value="4">4th Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddStudent}>Add Student</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Year Level</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.studentId}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.program}</TableCell>
                  <TableCell>{student.yearLevel}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={isEditDialogOpen && editingStudent?.id === student.id} onOpenChange={(open) => {
                        setIsEditDialogOpen(open);
                        if (open) setEditingStudent(student);
                      }}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Student</DialogTitle>
                            <DialogDescription>
                              Update the student's information.
                            </DialogDescription>
                          </DialogHeader>
                          
                          {editingStudent && (
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="edit-name">Full Name</Label>
                                <Input
                                  id="edit-name"
                                  value={editingStudent.name}
                                  onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                                />
                              </div>
                              
                              <div className="grid gap-2">
                                <Label htmlFor="edit-email">Email Address</Label>
                                <Input
                                  id="edit-email"
                                  type="email"
                                  value={editingStudent.email}
                                  onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
                                />
                              </div>
                              
                              <div className="grid gap-2">
                                <Label htmlFor="edit-studentId">Student ID</Label>
                                <Input
                                  id="edit-studentId"
                                  value={editingStudent.studentId}
                                  onChange={(e) => setEditingStudent({...editingStudent, studentId: e.target.value})}
                                />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-program">Program</Label>
                                  <Select
                                    value={editingStudent.program}
                                    onValueChange={(value) => setEditingStudent({...editingStudent, program: value})}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="BSCS">BS Computer Science</SelectItem>
                                      <SelectItem value="BSIT">BS Information Technology</SelectItem>
                                      <SelectItem value="BSIS">BS Information Systems</SelectItem>
                                      <SelectItem value="BSAI">BS Artificial Intelligence</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-yearLevel">Year Level</Label>
                                  <Select
                                    value={editingStudent.yearLevel}
                                    onValueChange={(value) => setEditingStudent({...editingStudent, yearLevel: value})}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1st Year</SelectItem>
                                      <SelectItem value="2">2nd Year</SelectItem>
                                      <SelectItem value="3">3rd Year</SelectItem>
                                      <SelectItem value="4">4th Year</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleEditStudent}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteStudent(student.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentManagement;
