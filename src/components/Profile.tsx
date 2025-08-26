import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Edit,
  Save,
  Trophy,
  Target,
  Calendar,
  BookOpen,
  Users,
  Star,
  Award,
  TrendingUp,
  Settings,
  Palette,
  Code,
  Camera,
  Flame,
  Heart,
  Sparkles,
} from "lucide-react";
import EnergyMeter from "./EnergyMeter";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  joinDate: string;
  streakDays: number;
  totalGoals: number;
  completedGoals: number;
  journalEntries: number;
  collaborations: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  earnedDate?: string;
  color: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  progress: number;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "streak" | "offline";
  streakDays?: number;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    bio: "Aspiring software engineer passionate about web development and continuous learning. Currently focusing on React and full-stack development.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    joinDate: "2023-10-15",
    streakDays: 7,
    totalGoals: 5,
    completedGoals: 2,
    journalEntries: 12,
    collaborations: 3,
  });

  const [editForm, setEditForm] = useState(profile);

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "First Steps",
      description: "Created your first goal roadmap",
      icon: <Target className="h-5 w-5" />,
      earned: true,
      earnedDate: "2023-10-16",
      color: "bg-gradient-to-br from-pink-200 to-pink-300",
    },
    {
      id: "2",
      title: "Week Warrior",
      description: "Maintained a 7-day streak",
      icon: <Trophy className="h-5 w-5" />,
      earned: true,
      earnedDate: "2023-12-01",
      color: "bg-gradient-to-br from-yellow-200 to-orange-300",
    },
    {
      id: "3",
      title: "Mindful Soul",
      description: "Wrote 10 journal entries",
      icon: <BookOpen className="h-5 w-5" />,
      earned: true,
      earnedDate: "2023-11-28",
      color: "bg-gradient-to-br from-purple-200 to-purple-300",
    },
    {
      id: "4",
      title: "Community Lover",
      description: "Joined 3 collaboration rooms",
      icon: <Users className="h-5 w-5" />,
      earned: true,
      earnedDate: "2023-11-20",
      color: "bg-gradient-to-br from-blue-200 to-blue-300",
    },
    {
      id: "5",
      title: "Goal Crusher",
      description: "Complete 5 goals",
      icon: <Award className="h-5 w-5" />,
      earned: false,
      color: "bg-gradient-to-br from-green-200 to-green-300",
    },
    {
      id: "6",
      title: "Consistency Queen",
      description: "Maintain a 30-day streak",
      icon: <Star className="h-5 w-5" />,
      earned: false,
      color: "bg-gradient-to-br from-indigo-200 to-indigo-300",
    },
  ];

  const projects: Project[] = [
    {
      id: "1",
      title: "Learn React",
      description: "Master the fundamentals of React development",
      icon: <Code className="h-5 w-5" />,
      color: "bg-gradient-to-br from-cyan-100 to-cyan-200",
      progress: 75,
    },
    {
      id: "2",
      title: "Photography Portfolio",
      description: "Build a stunning visual portfolio",
      icon: <Camera className="h-5 w-5" />,
      color: "bg-gradient-to-br from-rose-100 to-rose-200",
      progress: 40,
    },
    {
      id: "3",
      title: "Design System",
      description: "Create a cohesive design language",
      icon: <Palette className="h-5 w-5" />,
      color: "bg-gradient-to-br from-violet-100 to-violet-200",
      progress: 60,
    },
  ];

  const friends: Friend[] = [
    {
      id: "1",
      name: "Alex Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      status: "online",
    },
    {
      id: "2",
      name: "Maya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      status: "streak",
      streakDays: 12,
    },
    {
      id: "3",
      name: "Jordan Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
      status: "offline",
    },
    {
      id: "4",
      name: "Sam Rivera",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      status: "online",
    },
  ];

  const handleSaveProfile = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const completionRate = (profile.completedGoals / profile.totalGoals) * 100;

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-sora rem-text-gradient">
          Your Growth Garden ✨
        </h1>
        <p className="text-stone-600 mt-2 text-lg font-plus-jakarta">
          Where your growth story unfolds — you're doing amazing! 🌸
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-2xl ring-4 ring-purple-200">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-3xl bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-2 shadow-lg">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    placeholder="Full Name"
                    className="rounded-full border-2 border-purple-200 focus:border-purple-400"
                  />
                  <Input
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    placeholder="Email"
                    type="email"
                    className="rounded-full border-2 border-purple-200 focus:border-purple-400"
                  />
                  <Textarea
                    value={editForm.bio}
                    onChange={(e) =>
                      setEditForm({ ...editForm, bio: e.target.value })
                    }
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className="rounded-2xl border-2 border-purple-200 focus:border-purple-400"
                  />
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleSaveProfile}
                      size="sm"
                      className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      size="sm"
                      className="rounded-full border-2 border-purple-200 hover:bg-purple-50"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {profile.name}
                  </CardTitle>
                  <CardDescription className="text-purple-600 font-medium">
                    {profile.email}
                  </CardDescription>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    {profile.bio}
                  </p>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="mt-4 rounded-full border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Profile
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
                  <span className="text-sm font-medium text-gray-700">
                    Member since
                  </span>
                  <span className="text-sm font-bold text-purple-700">
                    {new Date(profile.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl">
                  <span className="text-sm font-medium text-gray-700">
                    Current streak
                  </span>
                  <div className="flex items-center space-x-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <Badge className="bg-gradient-to-r from-orange-400 to-yellow-400 text-white border-0 rounded-full">
                      {profile.streakDays} days
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full rounded-full text-gray-500 hover:bg-gray-100 mt-4"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg">
              <TabsTrigger
                value="achievements"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                Badges
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="friends"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                Friends
              </TabsTrigger>
              <TabsTrigger
                value="stats"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                Stats
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-6">
              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Overview</CardTitle>
                  <CardDescription>Your journey at a glance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {profile.totalGoals}
                      </div>
                      <div className="text-sm text-gray-600">Total Goals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {profile.completedGoals}
                      </div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {profile.journalEntries}
                      </div>
                      <div className="text-sm text-gray-600">
                        Journal Entries
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {profile.collaborations}
                      </div>
                      <div className="text-sm text-gray-600">
                        Collaborations
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Goal Completion Rate */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Goal Completion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(completionRate)}%</span>
                    </div>
                    <Progress value={completionRate} className="h-2" />
                    <p className="text-sm text-gray-600">
                      You've completed {profile.completedGoals} out of{" "}
                      {profile.totalGoals} goals
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Completed "Learn React basics" goal
                        </p>
                        <p className="text-xs text-gray-500">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Added new journal entry
                        </p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Joined "Web Dev Study Group" room
                        </p>
                        <p className="text-xs text-gray-500">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Your Badge Collection 🎖️
                </h2>
                <p className="text-gray-600">
                  Look at all these amazing milestones you've unlocked!
                </p>
              </div>
              
              {/* Energy Meter */}
              <div className="mb-8">
                <EnergyMeter energyLevel="medium" />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`relative transform transition-all duration-300 hover:scale-105 ${
                      achievement.earned
                        ? "cursor-pointer"
                        : "opacity-50 grayscale"
                    }`}
                  >
                    <div
                      className={`${achievement.color} p-6 rounded-3xl shadow-lg border-4 border-white relative overflow-hidden`}
                    >
                      {achievement.earned && (
                        <div className="absolute top-2 right-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                        </div>
                      )}
                      <div className="text-center">
                        <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 w-fit mx-auto mb-3 shadow-md">
                          {achievement.icon}
                        </div>
                        <h3 className="font-bold text-gray-800 text-sm mb-1">
                          {achievement.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-tight">
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.earnedDate && (
                          <p className="text-xs text-gray-500 mt-2 font-medium">
                            {new Date(
                              achievement.earnedDate,
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      {!achievement.earned && (
                        <div className="absolute inset-0 bg-gray-200/50 rounded-3xl flex items-center justify-center">
                          <div className="text-gray-400 text-xs font-medium bg-white/80 px-2 py-1 rounded-full">
                            Locked
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Your Creative Projects 🎨
                </h2>
                <p className="text-gray-600">
                  Keep building, keep growing — you've got this!
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className={`${project.color} border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md">
                          {project.icon}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg text-gray-800">
                            {project.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        {project.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-bold text-gray-800">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-white/60 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="friends" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Your Creative Squad 👥
                </h2>
                <p className="text-gray-600">
                  Amazing people on similar journeys — you inspire each other!
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {friends.map((friend) => (
                  <div key={friend.id} className="group cursor-pointer">
                    <div className="bg-white rounded-3xl p-4 shadow-xl border-4 border-white transform transition-all duration-300 hover:scale-105 hover:rotate-1 relative">
                      {/* Polaroid-style tape */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-yellow-200 rounded-sm opacity-80 shadow-sm"></div>

                      <div className="relative">
                        <Avatar className="h-20 w-20 mx-auto mb-3 border-2 border-gray-200">
                          <AvatarImage src={friend.avatar} alt={friend.name} />
                          <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                            {friend.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        {/* Status indicator */}
                        <div className="absolute top-0 right-0">
                          {friend.status === "online" && (
                            <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                          )}
                          {friend.status === "streak" && (
                            <div className="flex items-center bg-orange-400 rounded-full px-2 py-1 border-2 border-white shadow-sm">
                              <Flame className="h-3 w-3 text-white" />
                              <span className="text-xs text-white font-bold ml-1">
                                {friend.streakDays}
                              </span>
                            </div>
                          )}
                          {friend.status === "offline" && (
                            <div className="w-4 h-4 bg-gray-300 rounded-full border-2 border-white shadow-sm"></div>
                          )}
                        </div>
                      </div>

                      <div className="text-center">
                        <h3 className="font-bold text-gray-800 text-sm">
                          {friend.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {friend.status === "online" && "Online now"}
                          {friend.status === "streak" &&
                            `${friend.streakDays} day streak!`}
                          {friend.status === "offline" && "Offline"}
                        </p>
                      </div>

                      {/* Heart reaction on hover */}
                      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Heart className="h-4 w-4 text-pink-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
