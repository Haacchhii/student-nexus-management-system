
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { toast } from "sonner";

const feesData = [
  { id: "1", studentId: "2023-0001", studentName: "John Doe", type: "Tuition", amount: 45000, status: "paid", dueDate: "2025-05-15", paymentDate: "2025-05-10" },
  { id: "2", studentId: "2023-0002", studentName: "Jane Smith", type: "Tuition", amount: 45000, status: "partial", dueDate: "2025-05-15", paymentDate: "2025-05-12" },
  { id: "3", studentId: "2022-0003", studentName: "Michael Johnson", type: "Tuition", amount: 45000, status: "unpaid", dueDate: "2025-05-15", paymentDate: null },
  { id: "4", studentId: "2024-0004", studentName: "Emily Davis", type: "Laboratory", amount: 5000, status: "paid", dueDate: "2025-05-20", paymentDate: "2025-05-18" },
  { id: "5", studentId: "2023-0005", studentName: "Robert Wilson", type: "Miscellaneous", amount: 7500, status: "unpaid", dueDate: "2025-05-25", paymentDate: null },
];

const FeeManagement = () => {
  const { role } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredFees = feesData.filter((fee) => 
    fee.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fee.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fee.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "partial":
        return <Badge className="bg-yellow-500">Partial</Badge>;
      case "unpaid":
        return <Badge className="bg-red-500">Unpaid</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const canManageFees = role === "admin";
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Fee Management</h2>
        <p className="text-gray-600">Track and manage student fees and payments</p>
      </div>
      
      <div className="mb-6 flex justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search fees..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {canManageFees && (
          <div className="flex gap-2">
            <Button onClick={() => toast.info("Payment record feature coming soon")}>
              Record Payment
            </Button>
            <Button variant="outline" onClick={() => toast.info("Fee report feature coming soon")}>
              Generate Report
            </Button>
          </div>
        )}
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Fee Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Payment Date</TableHead>
              {canManageFees && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFees.length > 0 ? (
              filteredFees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell>{fee.studentId}</TableCell>
                  <TableCell>{fee.studentName}</TableCell>
                  <TableCell>{fee.type}</TableCell>
                  <TableCell>₱{fee.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(fee.status)}</TableCell>
                  <TableCell>{fee.dueDate}</TableCell>
                  <TableCell>{fee.paymentDate || "N/A"}</TableCell>
                  {canManageFees && (
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => toast.info("Payment management feature coming soon")}>
                        Manage
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={canManageFees ? 8 : 7} className="text-center py-10 text-muted-foreground">
                  No fees found matching your search
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FeeManagement;
