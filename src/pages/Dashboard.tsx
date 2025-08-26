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
  Sun,
  Moon,
  Star,
  Leaf,
  Flower,
} from "lucide-react";
import EnergyMeter from "../components/EnergyMeter";

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
    color = "#5a6b5a",
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
      <div className="relative bloom">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e7e5e4"
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
          <span className="text-lg font-bold text-sage-700">{value}%</span>
        </div>
      </div>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Star className="h-4 w-4 text-peach-500" />;
      case "reflection":
        return <Heart className="h-4 w-4 text-lavender-500" />;
      case "learning":
        return <BookOpen className="h-4 w-4 text-sky-500" />;
      default:
        return <Sparkles className="h-4 w-4 text-sage-500" />;
    }
  };

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return <Sun className="h-6 w-6 text-peach-500" />;
    if (hour < 17) return <Sun className="h-6 w-6 text-sky-500" />;
    return <Moon className="h-6 w-6 text-lavender-500" />;
  };

  return (
    <Layout>
      <div className="space-y-8 relative animate-fade-in">
        {/* Confetti Animation */}
        {confettiElements.map((_, index) => (
          <div
            key={index}
            className="confetti absolute w-2 h-2 bg-gradient-to-r from-peach-400 to-lavender-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: "20%",
              animationDelay: `${Math.random() * 0.5}s`,
            }}
          />
        ))}

        {/* Welcome Section */}
        <div className="rem-card bg-gradient-to-br from-cream-50 via-sage-50 to-lavender-50 p-8 border-sage-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                {getTimeIcon()}
                <h1 className="text-4xl font-bold font-sora rem-text-gradient">
                  {getGreeting()}, {user?.name?.split(" ")[0] || "friend"} 🌱
              </h1>
              </div>
              <p className="text-xl text-stone-600 font-plus-jakarta">
                Ready to nurture your next big bloom? ✨
              </p>
              <p className="text-lg text-stone-500 mt-2">
                You're growing beautifully! Let's see what magic you'll create today
              </p>
            </div>
            <div className="flex items-center bg-white/80 p-6 rounded-2xl shadow-soft backdrop-blur-sm border border-sage-100">
              <div className="pulse-glow bg-gradient-to-r from-sage-400 to-lavender-400 text-white px-6 py-3 rounded-full font-bold flex items-center">
                <Leaf className="h-5 w-5 mr-2" />
                {stats.streakDays} day growth streak! 🌱
              </div>
            </div>
          </div>
        </div>

        {/* Growth Rings Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rem-card hover:scale-105 transition-all duration-300 border-sage-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sage-700">
                Growth Progress
              </CardTitle>
              <Target className="h-4 w-4 text-sage-600" />
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <CircularProgress value={completionRate} color="#5a6b5a" />
              <p className="text-xs text-stone-500 mt-2 text-center">
                {stats.tasksCompleted} of {stats.tasksTotal} seeds planted
              </p>
            </CardContent>
          </Card>

          <Card className="rem-card hover:scale-105 transition-all duration-300 border-lavender-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-lavender-700">
                Reflection Pool
              </CardTitle>
              <BookOpen className="h-4 w-4 text-lavender-600" />
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <CircularProgress
                value={Math.min((stats.journalEntries / 7) * 100, 100)}
                color="#8b5cf6"
              />
              <p className="text-xs text-stone-500 mt-2 text-center">
                {stats.journalEntries} reflections this week
              </p>
            </CardContent>
          </Card>

          <Card className="rem-card hover:scale-105 transition-all duration-300 border-sky-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-sky-700">
                Upcoming Blooms
              </CardTitle>
              <Clock className="h-4 w-4 text-sky-600" />
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <div className="text-3xl font-bold text-sky-600 mb-2">
                {stats.upcomingDeadlines}
              </div>
              <p className="text-xs text-stone-500 text-center">
                Ready to flourish soon
              </p>
            </CardContent>
          </Card>

          <Card className="rem-card hover:scale-105 transition-all duration-300 border-peach-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-peach-700">
                Garden Rooms
              </CardTitle>
              <Users className="h-4 w-4 text-peach-600" />
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-4">
              <div className="text-3xl font-bold text-peach-600 mb-2">
                {stats.activeRooms}
              </div>
              <p className="text-xs text-stone-500 text-center">
                Growing together
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Energy Meter Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EnergyMeter variant="preview" energyLevel="medium" />
          <div className="hidden lg:block" /> {/* Spacer for 3-column layout */}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="rem-card hover:scale-105 transition-all duration-300 bg-gradient-to-br from-sage-50 to-emerald-50 border-sage-200">
            <CardHeader>
              <CardTitle className="flex items-center text-sage-700">
                <Kanban className="mr-2 h-5 w-5" />
                Task Garden
              </CardTitle>
              <CardDescription className="text-sage-600">Tend to your growing projects</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-sage-500 to-emerald-500 hover:from-sage-600 hover:to-emerald-600 text-white rounded-2xl"
              >
                <Link to="/kanban">Nurture Tasks</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rem-card hover:scale-105 transition-all duration-300 bg-gradient-to-br from-lavender-50 to-pink-50 border-lavender-200">
            <CardHeader>
              <CardTitle className="flex items-center text-lavender-700">
                <Calendar className="mr-2 h-5 w-5" />
                Time Blossoms
              </CardTitle>
              <CardDescription className="text-lavender-600">See when your dreams will bloom</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-lavender-200 hover:bg-lavender-50 text-lavender-700 rounded-2xl"
              >
                <Link to="/calendar">View Timeline</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="rem-card hover:scale-105 transition-all duration-300 bg-gradient-to-br from-sky-50 to-indigo-50 border-sky-200">
            <CardHeader>
              <CardTitle className="flex items-center text-sky-700">
                <BookOpen className="mr-2 h-5 w-5" />
                Reflection Pool
              </CardTitle>
              <CardDescription className="text-sky-600">Capture your growth moments</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                asChild
                variant="outline"
                className="w-full border-sky-200 hover:bg-sky-50 text-sky-700 rounded-2xl"
              >
                <Link to="/journal">Write Reflection</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Social Feed Preview */}
        <Card className="rem-card bg-gradient-to-br from-white to-stone-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-stone-800">Community Garden 🌸</CardTitle>
                <CardDescription className="text-stone-600">
                  See how your friends are blooming
                </CardDescription>
              </div>
              <Button asChild variant="outline" className="rounded-2xl border-sage-200 hover:bg-sage-50 text-sage-700">
                <Link to="/rooms">Join the Garden</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {feedUpdates.map((update) => (
                <div
                  key={update.id}
                  className="bg-white rounded-2xl p-4 shadow-gentle hover:shadow-soft transition-all duration-300 border border-stone-100"
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10 ring-2 ring-sage-100">
                      <AvatarImage
                        src={update.user.avatar}
                        alt={update.user.name}
                      />
                      <AvatarFallback className="bg-sage-100 text-sage-700">
                        {update.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-semibold text-sm text-stone-800">
                          {update.user.name}
                        </p>
                        <p className="text-xs text-stone-500">
                          {update.user.handle}
                        </p>
                        <span className="text-xs text-stone-400">•</span>
                        <p className="text-xs text-stone-500">
                          {update.timestamp}
                        </p>
                        {getTypeIcon(update.type)}
                      </div>
                      <p className="text-sm leading-relaxed mb-3 text-stone-700">
                        {update.content}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-stone-500">
                        <button className="flex items-center space-x-1 hover:text-peach-500 transition-colors">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{update.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-sky-500 transition-colors">
                          <MessageCircle className="h-3 w-3" />
                          <span>{update.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-sage-500 transition-colors">
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
        <Card className="rem-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-stone-800">Your Growing Seeds 🌱</CardTitle>
                <CardDescription className="text-stone-600">
                  Tasks blooming into achievements
                </CardDescription>
              </div>
              <Button
                onClick={triggerConfetti}
                variant="outline"
                size="sm"
                className="rounded-2xl border-sage-200 hover:bg-sage-50 text-sage-700"
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
                  className="flex items-center justify-between p-4 border border-stone-100 rounded-2xl hover:bg-sage-50/50 transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        task.status === "completed"
                          ? "bg-sage-500 animate-pulse"
                          : task.status === "in-progress"
                            ? "bg-sky-500"
                            : "bg-stone-300"
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
                            ? "line-through text-stone-400"
                            : "text-stone-700"
                        }`}
                      >
                        {task.title}
                      </span>
                      <p className="text-xs text-stone-500">
                        by {task.user}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        task.status === "completed" ? "default" : "secondary"
                      }
                      className={`rounded-full ${
                        task.status === "completed" 
                          ? "bg-sage-100 text-sage-700 border-sage-200" 
                          : "bg-stone-100 text-stone-600 border-stone-200"
                      }`}
                    >
                      {task.status === "completed"
                        ? "🌸 Bloomed"
                        : task.status === "in-progress"
                          ? "🌱 Growing"
                          : "🌰 Seed"}
                    </Badge>
                    <div className="text-sm text-stone-500">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full rounded-2xl border-sage-200 hover:bg-sage-50 text-sage-700">
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
