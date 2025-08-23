import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Calendar,
  CheckCircle,
  ChevronRight,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import GoalRoadmapBuilder from "./GoalRoadmapBuilder";
import KanbanBoard from "./KanbanBoard";
import CalendarView from "./CalendarView";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("roadmap");

  // Mock user data
  const user = {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    streakDays: 7,
    upcomingTasks: 3,
  };

  // Mock goals data
  const goals = [
    { id: 1, title: "Become a software engineer", progress: 35 },
    { id: 2, title: "Learn French", progress: 20 },
    { id: 3, title: "Start a tech blog", progress: 10 },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card p-4 flex flex-col">
        <div className="flex items-center mb-8">
          <h1 className="text-2xl font-bold text-primary">REM</h1>
        </div>

        <nav className="space-y-2 flex-1">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveTab("roadmap")}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Goals
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <MessageSquare className="mr-2 h-4 w-4" />
            Journal
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Rooms
          </Button>
        </nav>

        <div className="mt-auto pt-4 border-t">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <div className="flex items-center mt-4 p-2 rounded-lg bg-muted">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <div className="ml-2 text-sm">
              <p className="font-medium">{user.name}</p>
              <p className="text-muted-foreground text-xs">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b bg-card p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {user.upcomingTasks}
                </span>
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Welcome Card */}
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-none">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">
                    Welcome back, {user.name.split(" ")[0]}!
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    You're on a {user.streakDays}-day streak. Keep it up!
                  </p>
                </div>
                <div className="flex items-center bg-white p-2 rounded-lg shadow-sm">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">
                    {user.streakDays} day streak
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goals Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {goals.map((goal) => (
              <Card key={goal.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <CardDescription>{goal.progress}% complete</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                  <Button variant="ghost" size="sm" className="mt-4 w-full">
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Feature Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="roadmap">Goal Roadmap</TabsTrigger>
              <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>

            <TabsContent value="roadmap" className="mt-0">
              <GoalRoadmapBuilder />
            </TabsContent>

            <TabsContent value="kanban" className="mt-0">
              <KanbanBoard />
            </TabsContent>

            <TabsContent value="calendar" className="mt-0">
              <CalendarView />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
