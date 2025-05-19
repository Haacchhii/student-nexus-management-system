
import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "admin" | "teacher" | "student" | "parent";

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("admin");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <RoleContext.Provider value={{ role, setRole, selectedDate, setSelectedDate }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
