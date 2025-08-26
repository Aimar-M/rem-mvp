import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  BookOpen,
  Briefcase,
  Users,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
  Kanban,
  Heart,
  Sparkles,
  MessageCircle,
  ThumbsUp,
  Share2,
} from "lucide-react";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [confettiElements, setConfettiElements] = useState<number[]>([]);

  // Mock data - replace with real data from your backend
  const stats = {
    tasksCompleted: 12,
    tasksTotal: 18,
    journalEntries: 5,
    upcomingDeadlines: 3,
    activeRooms: 2,
    streakDays: 7,
  };

  const recentTasks = [
    {
      id: 1,
      title: "Complete React project",
      status: "in-progress",
      dueDate: "2024-01-15",
      user: "You",
    },
    {
      id: 2,
      title: "Write journal entry",
      status: "completed",
      dueDate: "2024-01-12",
      user: "You",
    },
    {
      id: 3,
      title: "Apply to internship",
      status: "todo",
      dueDate: "2024-01-20",
      user: "You",
    },
  ];

  const feedUpdates = [
    {
      id: 1,
      user: {
        name: "Alex Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        handle: "@alexc",
      },
      content:
        "Just completed my first React project! 🎉 The feeling of seeing everything come together is incredible.",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      type: "achievement",
    },
    {
      id: 2,
      user: {
        name: "Maya Patel",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
        handle: "@mayap",
      },
      content:
        "Morning reflection: Sometimes the smallest steps forward are the most meaningful. What's one tiny win you're celebrating today? ✨",
      timestamp: "4 hours ago",
      likes: 18,
      comments: 12,
      type: "reflection",
    },
    {
      id: 3,
      user: {
        name: "Jordan Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
        handle: "@jordank",
      },
      content:
        'Week 3 of learning Python and I finally understand decorators! 🐍 Anyone else have those "aha!" moments that make everything click?',
      timestamp: "6 hours ago",
      likes: 31,
      comments: 15,
      type: "learning",
    },
  ];

  const completionRate = Math.round(
    (stats.tasksCompleted / stats.tasksTotal) * 100,
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 20 }, (_, i) => i);
    setConfettiElements(newConfetti);
    setTimeout(() => setConfettiElements([]), 1000);
  };

  const CircularProgress = ({
    value,
    size = 80,
    strokeWidth = 8,
    color = "#22c55e",
  }: {
    value: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="relative grow-ring">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{value}%</span>
        </div>
      </div>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Target className="h-4 w-4 text-green-500" />;
      case "reflection":
        return <Heart className="h-4 w-4 text-pink-500" />;
      case "learning":
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      default:
        return <Sparkles className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-6 relative">
        {/* Confetti Animation */}
        {confettiElements.map((_, index) => (
          <div
            key={index}
            className="confetti absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: "20%",
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          />
        ))}

        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border-none shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {getGreeting()}, {user?.name?.split(" ")[0] || "friend"} 🌞 —
                ready to bloom?
              </h1>
              <p className="text-lg text-muted-foreground">
                You're growing beautifully! Let's see what magic you'll create
                today ✨
              </p>
            </div>
            <div className="flex items-center bg-white/80 dark:bg-gray-800/80 p-4 rounded-2xl shadow-sm backdrop-blur-sm">
              <div
                className={`pulse-glow bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full font-bold flex items-center`}
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                {stats.streakDays} day bloom streak! 🌱
              </div>
            </div>
          </div>
        </div>

        {/* Growth Rings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                Growth Progress
              </CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <CircularProgress value={completionRate} color="#22c55e" />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {stats.tasksCompleted} of {stats.tasksTotal} seeds planted
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">
                Journal Reflections
              </CardTitle>
              <BookOpen className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <CircularProgress
                value={Math.min((stats.journalEntries / 7) * 100, 100)}
                color="#a855f7"
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {stats.journalEntries} reflections this week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                Upcoming Blooms
              </CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.upcomingDeadlines}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Ready to flourish soon
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-pink-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-pink-700">
                Garden Rooms
              </CardTitle>
              <Users className="h-4 w-4 text-pink-600" />
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <div className="text-3xl font-bold text-pink-600 mb-2">
                {stats.activeRooms}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Growing together
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Kanban className="mr-2 h-5 w-5" />
                Task Garden
              </CardTitle>
              <CardDescription>Tend to your growing projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Link to="/kanban">Nurture Tasks</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <Calendar className="mr-2 h-5 w-5" />
                Time Blossoms
              </CardTitle>
              <CardDescription>See when your dreams will bloom</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-purple-200 hover:bg-purple-50"
              >
                <Link to="/calendar">View Timeline</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <BookOpen className="mr-2 h-5 w-5" />
                Reflection Pool
              </CardTitle>
              <CardDescription>Capture your growth moments</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-blue-200 hover:bg-blue-50"
              >
                <Link to="/journal">Write Reflection</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Social Feed Preview */}
        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Community Garden 🌸</CardTitle>
                <CardDescription>
                  See how your friends are blooming
                </CardDescription>
              </div>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/rooms">Join the Garden</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {feedUpdates.map((update) => (
                <div
                  key={update.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10 ring-2 ring-pink-100">
                      <AvatarImage
                        src={update.user.avatar}
                        alt={update.user.name}
                      />
                      <AvatarFallback>
                        {update.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-semibold text-sm">
                          {update.user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {update.user.handle}
                        </p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">
                          {update.timestamp}
                        </p>
                        {getTypeIcon(update.type)}
                      </div>
                      <p className="text-sm leading-relaxed mb-3">
                        {update.content}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <button className="flex items-center space-x-1 hover:text-pink-500 transition-colors">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{update.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-3 w-3" />
                          <span>{update.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                          <Share2 className="h-3 w-3" />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Tasks with Completion Animation */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Growing Seeds 🌱</CardTitle>
                <CardDescription>
                  Tasks blooming into achievements
                </CardDescription>
              </div>
              <Button
                onClick={triggerConfetti}
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Celebrate!
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border rounded-xl hover:bg-accent/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        task.status === "completed"
                          ? "bg-green-500 animate-pulse"
                          : task.status === "in-progress"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                      }`}
                    >
                      {task.status === "completed" && (
                        <CheckCircle className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div>
                      <span
                        className={`font-medium ${
                          task.status === "completed"
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {task.title}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        by {task.user}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        task.status === "completed" ? "default" : "secondary"
                      }
                      className="rounded-full"
                    >
                      {task.status === "completed"
                        ? "🌸 Bloomed"
                        : task.status === "in-progress"
                          ? "🌱 Growing"
                          : "🌰 Seed"}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link to="/kanban">Tend to All Seeds</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
