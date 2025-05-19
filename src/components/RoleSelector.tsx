
import { useRole } from "@/contexts/RoleContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { UserIcon, Users, GraduationCap, User } from "lucide-react";

const RoleSelector = () => {
  const { role, setRole } = useRole();

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="role-select" className="text-sm font-medium">Role:</Label>
      <Select value={role} onValueChange={(value) => setRole(value as any)}>
        <SelectTrigger id="role-select" className="w-[180px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <span>Admin</span>
            </div>
          </SelectItem>
          <SelectItem value="teacher">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Teacher</span>
            </div>
          </SelectItem>
          <SelectItem value="student">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>Student</span>
            </div>
          </SelectItem>
          <SelectItem value="parent">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Parent</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleSelector;
