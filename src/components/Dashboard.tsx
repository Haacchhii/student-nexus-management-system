
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, Book } from "lucide-react";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250</div>
            <p className="text-xs text-muted-foreground">+12% from last semester</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm font-medium">New student registered</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm font-medium">Attendance updated for CS101</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm font-medium">Student profile updated</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Final Examination</p>
                  <p className="text-xs text-muted-foreground">CS15 - Software Engineering</p>
                </div>
                <p className="text-xs text-muted-foreground">May 19, 2025</p>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Enrollment Period</p>
                  <p className="text-xs text-muted-foreground">First Semester AY 2025-2026</p>
                </div>
                <p className="text-xs text-muted-foreground">June 1-15, 2025</p>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">Graduation Ceremony</p>
                  <p className="text-xs text-muted-foreground">Batch 2025</p>
                </div>
                <p className="text-xs text-muted-foreground">July 5, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
