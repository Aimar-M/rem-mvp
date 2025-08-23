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
} from "lucide-react";

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
      title: "First Goal",
      description: "Created your first goal roadmap",
      icon: <Target className="h-6 w-6" />,
      earned: true,
      earnedDate: "2023-10-16",
    },
    {
      id: "2",
      title: "Week Warrior",
      description: "Maintained a 7-day streak",
      icon: <Trophy className="h-6 w-6" />,
      earned: true,
      earnedDate: "2023-12-01",
    },
    {
      id: "3",
      title: "Reflective Mind",
      description: "Wrote 10 journal entries",
      icon: <BookOpen className="h-6 w-6" />,
      earned: true,
      earnedDate: "2023-11-28",
    },
    {
      id: "4",
      title: "Team Player",
      description: "Joined 3 collaboration rooms",
      icon: <Users className="h-6 w-6" />,
      earned: true,
      earnedDate: "2023-11-20",
    },
    {
      id: "5",
      title: "Goal Crusher",
      description: "Complete 5 goals",
      icon: <Award className="h-6 w-6" />,
      earned: false,
    },
    {
      id: "6",
      title: "Consistency King",
      description: "Maintain a 30-day streak",
      icon: <Star className="h-6 w-6" />,
      earned: false,
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
    <div className="w-full max-w-6xl mx-auto p-4 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-2">
          Track your progress, achievements, and personal growth
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-2xl">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    placeholder="Full Name"
                  />
                  <Input
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    placeholder="Email"
                    type="email"
                  />
                  <Textarea
                    value={editForm.bio}
                    onChange={(e) =>
                      setEditForm({ ...editForm, bio: e.target.value })
                    }
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveProfile} size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <CardTitle className="text-xl">{profile.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {profile.email}
                  </CardDescription>
                  <p className="text-sm text-gray-600 mt-3">{profile.bio}</p>
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    size="sm"
                    className="mt-4"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Profile
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Member since</span>
                  <span className="text-sm font-medium">
                    {new Date(profile.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Current streak</span>
                  <Badge className="bg-orange-100 text-orange-800">
                    {profile.streakDays} days
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Achievements */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
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
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>
                    Celebrate your milestones and progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          achievement.earned
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50 opacity-60"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`p-2 rounded-full ${
                              achievement.earned
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-sm text-gray-600">
                              {achievement.description}
                            </p>
                            {achievement.earned && achievement.earnedDate && (
                              <p className="text-xs text-green-600 mt-1">
                                Earned on{" "}
                                {new Date(
                                  achievement.earnedDate,
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          {achievement.earned && (
                            <Trophy className="h-5 w-5 text-yellow-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
