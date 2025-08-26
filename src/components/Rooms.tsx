import React, { useState } from "react";
import { motion } from "framer-motion";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  Plus,
  MessageSquare,
  Calendar,
  Settings,
  UserPlus,
  Crown,
  Clock,
} from "lucide-react";
import KanbanBoard from "./KanbanBoard";

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: "owner" | "admin" | "member";
  joinedDate: string;
  isOnline: boolean;
}

interface Room {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  isPrivate: boolean;
  createdDate: string;
  lastActivity: string;
  members: Member[];
  owner: string;
  bannerColor: string;
  bannerEmoji: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
}

interface FeedUpdate {
  id: string;
  type: "journal" | "streak" | "goal" | "milestone" | "community";
  user: string;
  avatar: string;
  content: string;
  emoji: string;
  timestamp: string;
}

interface CommunityPrompt {
  id: string;
  question: string;
  emoji: string;
  responses: number;
}

const Rooms = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    description: "",
    category: "study",
    isPrivate: false,
  });
  const [newMessage, setNewMessage] = useState("");

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: "1",
      name: "Creative Bloom Garden",
      description:
        "A nurturing space for creative souls to grow and flourish together 🌸",
      category: "study",
      memberCount: 12,
      isPrivate: false,
      createdDate: "2023-11-15",
      lastActivity: "2023-12-05",
      owner: "sarah-johnson",
      bannerColor:
        "bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200",
      bannerEmoji: "🌸",
      members: [
        {
          id: "1",
          name: "Sarah Johnson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          role: "owner",
          joinedDate: "2023-11-15",
          isOnline: true,
        },
        {
          id: "2",
          name: "Mike Chen",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
          role: "member",
          joinedDate: "2023-11-16",
          isOnline: false,
        },
        {
          id: "3",
          name: "Emma Davis",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
          role: "admin",
          joinedDate: "2023-11-17",
          isOnline: true,
        },
      ],
    },
    {
      id: "2",
      name: "Code & Coffee Collective",
      description:
        "Where developers gather to share knowledge and grow together ☕",
      category: "programming",
      memberCount: 8,
      isPrivate: false,
      createdDate: "2023-11-20",
      lastActivity: "2023-12-04",
      owner: "emma-davis",
      bannerColor: "bg-gradient-to-r from-green-200 via-teal-200 to-blue-200",
      bannerEmoji: "☕",
      members: [
        {
          id: "3",
          name: "Emma Davis",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
          role: "owner",
          joinedDate: "2023-11-20",
          isOnline: true,
        },
      ],
    },
    {
      id: "3",
      name: "Dream Builders Hub",
      description:
        "Supporting each other's career journeys and celebrating wins 🚀",
      category: "career",
      memberCount: 15,
      isPrivate: false,
      createdDate: "2023-10-30",
      lastActivity: "2023-12-05",
      owner: "alex-kim",
      bannerColor: "bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200",
      bannerEmoji: "🚀",
      members: [],
    },
  ]);

  const [feedUpdates] = useState<FeedUpdate[]>([
    {
      id: "1",
      type: "journal",
      user: "Maya",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
      content: "just journaled",
      emoji: "🌸",
      timestamp: "2 min ago",
    },
    {
      id: "2",
      type: "streak",
      user: "Alex",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      content: "hit a 7-day streak",
      emoji: "🔥",
      timestamp: "5 min ago",
    },
    {
      id: "3",
      type: "goal",
      user: "Jordan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
      content: "completed their morning routine",
      emoji: "✨",
      timestamp: "12 min ago",
    },
    {
      id: "4",
      type: "milestone",
      user: "Sam",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
      content: "reached 30 days of meditation",
      emoji: "🧘‍♀️",
      timestamp: "1 hour ago",
    },
  ]);

  const [communityPrompts] = useState<CommunityPrompt[]>([
    {
      id: "1",
      question: "What's one small win you had today?",
      emoji: "🌟",
      responses: 23,
    },
    {
      id: "2",
      question: "Share a moment that made you smile recently",
      emoji: "😊",
      responses: 18,
    },
    {
      id: "3",
      question: "What's something you're grateful for right now?",
      emoji: "🙏",
      responses: 31,
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Emma Davis",
      content:
        "Hey everyone! Just finished the React hooks tutorial. Anyone want to pair program on a small project?",
      timestamp: "2023-12-05T10:30:00Z",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    {
      id: "2",
      sender: "Mike Chen",
      content:
        "That sounds great! I'm working on a todo app with React. Would love some feedback.",
      timestamp: "2023-12-05T10:35:00Z",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    },
    {
      id: "3",
      sender: "Sarah Johnson",
      content: "Count me in! Let's schedule a session for this weekend.",
      timestamp: "2023-12-05T10:40:00Z",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  ]);

  const handleCreateRoom = () => {
    if (!newRoom.name) return;

    const bannerColors = [
      "bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200",
      "bg-gradient-to-r from-green-200 via-teal-200 to-blue-200",
      "bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200",
      "bg-gradient-to-r from-purple-200 via-pink-200 to-rose-200",
    ];

    const bannerEmojis = ["🌸", "🌱", "🌻", "🌺", "🌿", "🌷", "🌼", "🌹"];

    const room: Room = {
      id: Date.now().toString(),
      name: newRoom.name,
      description: newRoom.description,
      category: newRoom.category,
      memberCount: 1,
      isPrivate: newRoom.isPrivate,
      createdDate: new Date().toISOString().split("T")[0],
      lastActivity: new Date().toISOString().split("T")[0],
      owner: "sarah-johnson",
      bannerColor:
        bannerColors[Math.floor(Math.random() * bannerColors.length)],
      bannerEmoji:
        bannerEmojis[Math.floor(Math.random() * bannerEmojis.length)],
      members: [
        {
          id: "1",
          name: "Sarah Johnson",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          role: "owner",
          joinedDate: new Date().toISOString().split("T")[0],
          isOnline: true,
        },
      ],
    };

    setRooms([room, ...rooms]);
    setNewRoom({
      name: "",
      description: "",
      category: "study",
      isPrivate: false,
    });
    setIsCreateDialogOpen(false);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "Sarah Johnson",
      content: newMessage,
      timestamp: new Date().toISOString(),
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "study":
        return "bg-pink-100 text-pink-700 border-pink-200";
      case "programming":
        return "bg-green-100 text-green-700 border-green-200";
      case "career":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "project":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getFeedUpdateColor = (type: string) => {
    switch (type) {
      case "journal":
        return "bg-pink-50 border-pink-200";
      case "streak":
        return "bg-orange-50 border-orange-200";
      case "goal":
        return "bg-purple-50 border-purple-200";
      case "milestone":
        return "bg-green-50 border-green-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case "admin":
        return <Settings className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Community Gardens 🌸
        </h1>
        <p className="text-gray-600 mt-2">
          Nurturing spaces where you can grow, connect, and bloom together
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="browse">Browse Rooms</TabsTrigger>
          <TabsTrigger value="my-rooms">My Rooms</TabsTrigger>
          <TabsTrigger value="room-view" disabled={!selectedRoom}>
            {selectedRoom ? selectedRoom.name : "Select Room"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Community Feed */}
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Community Vibes ✨
                </h3>
              </div>

              {/* Feed Updates */}
              <div className="space-y-3">
                {feedUpdates.map((update) => (
                  <motion.div
                    key={update.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-3 rounded-2xl border ${getFeedUpdateColor(update.type)} backdrop-blur-sm`}
                  >
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={update.avatar} alt={update.user} />
                        <AvatarFallback className="text-xs">
                          {update.user[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium text-gray-800">
                            {update.user}
                          </span>
                          <span className="text-gray-600 ml-1">
                            {update.content}
                          </span>
                          <span className="ml-1">{update.emoji}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {update.timestamp}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Community Prompts */}
              <div className="space-y-3">
                <h4 className="text-md font-medium text-gray-800">
                  Daily Prompts 💭
                </h4>
                {communityPrompts.map((prompt) => (
                  <Card
                    key={prompt.id}
                    className="p-4 bg-gradient-to-br from-white to-purple-50 border-purple-200 rounded-2xl"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{prompt.emoji}</span>
                        <p className="text-sm font-medium text-gray-800">
                          {prompt.question}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {prompt.responses} responses
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs h-6 px-2 rounded-full"
                        >
                          Share
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Rooms Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Discover Gardens
                </h2>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Plant a Garden
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.map((room) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer rounded-3xl overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
                      {/* Header Banner */}
                      <div
                        className={`h-20 ${room.bannerColor} flex items-center justify-center relative`}
                      >
                        <span className="text-4xl">{room.bannerEmoji}</span>
                        <div className="absolute top-2 right-2">
                          <Badge
                            className={`${getCategoryColor(room.category)} rounded-full border`}
                          >
                            {room.category}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl font-bold text-gray-800">
                          {room.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {room.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1 text-gray-500" />
                                <span className="text-gray-600">
                                  {room.memberCount} blooming
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                <span className="text-gray-600">
                                  {new Date(
                                    room.lastActivity,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {room.members.slice(0, 4).map((member) => (
                                <Avatar
                                  key={member.id}
                                  className="h-7 w-7 border-2 border-white"
                                >
                                  <AvatarImage
                                    src={member.avatar}
                                    alt={member.name}
                                  />
                                  <AvatarFallback className="text-xs">
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {room.memberCount > 4 && (
                                <div className="h-7 w-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                                  <span className="text-xs text-gray-600 font-medium">
                                    +{room.memberCount - 4}
                                  </span>
                                </div>
                              )}
                            </div>

                            <Button
                              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6"
                              onClick={() => {
                                setSelectedRoom(room);
                                setActiveTab("room-view");
                              }}
                            >
                              Join Garden
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="my-rooms" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Rooms</h2>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Room
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.slice(0, 2).map((room) => (
              <Card key={room.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{room.name}</CardTitle>
                    <Badge className={getCategoryColor(room.category)}>
                      {room.category}
                    </Badge>
                  </div>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>{room.memberCount} members</span>
                      <span>
                        Last active:{" "}
                        {new Date(room.lastActivity).toLocaleDateString()}
                      </span>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedRoom(room);
                        setActiveTab("room-view");
                      }}
                    >
                      Enter Room
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="room-view" className="space-y-6">
          {selectedRoom && (
            <div>
              {/* Room Header Banner */}
              <div
                className={`${selectedRoom.bannerColor} rounded-3xl p-8 mb-6 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-6xl">
                        {selectedRoom.bannerEmoji}
                      </span>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                          {selectedRoom.name}
                        </h2>
                        <p className="text-gray-700 mt-1">
                          {selectedRoom.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        className={`${getCategoryColor(selectedRoom.category)} rounded-full border`}
                      >
                        {selectedRoom.category}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full bg-white/80 backdrop-blur-sm border-white/50"
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Invite Friends
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Members Sidebar */}
                <div className="lg:col-span-1">
                  <Card className="rounded-3xl bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg text-gray-800">
                        Garden Members ({selectedRoom.memberCount}) 🌱
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedRoom.members.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-purple-50 transition-colors"
                          >
                            <div className="relative">
                              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                <AvatarImage
                                  src={member.avatar}
                                  alt={member.name}
                                />
                                <AvatarFallback className="text-sm bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              {member.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <p className="text-sm font-medium truncate text-gray-800">
                                  {member.name}
                                </p>
                                {getRoleIcon(member.role)}
                              </div>
                              <p className="text-xs text-gray-500 capitalize">
                                {member.role === "owner"
                                  ? "Garden Keeper"
                                  : member.role === "admin"
                                    ? "Garden Helper"
                                    : "Blooming"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                  <Tabs defaultValue="kanban">
                    <TabsList className="rounded-full bg-white/80 backdrop-blur-sm border-0 shadow-sm">
                      <TabsTrigger value="kanban" className="rounded-full">
                        Growth Board 🌱
                      </TabsTrigger>
                      <TabsTrigger value="chat" className="rounded-full">
                        Garden Chat 💬
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="kanban" className="mt-4">
                      <KanbanBoard />
                    </TabsContent>

                    <TabsContent value="chat" className="mt-4">
                      <Card className="rounded-3xl bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center text-gray-800">
                            <MessageSquare className="h-5 w-5 mr-2 text-purple-500" />
                            Garden Chat 💬
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4 max-h-96 overflow-y-auto mb-4 pr-2">
                            {messages.map((message) => (
                              <div
                                key={message.id}
                                className="flex items-start space-x-3"
                              >
                                <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                                  <AvatarImage
                                    src={message.avatar}
                                    alt={message.sender}
                                  />
                                  <AvatarFallback className="text-xs bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                                    {message.sender
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <p className="text-sm font-medium text-gray-800">
                                      {message.sender}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {new Date(
                                        message.timestamp,
                                      ).toLocaleTimeString()}
                                    </p>
                                  </div>
                                  <div className="mt-1 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl rounded-tl-sm p-3 border border-purple-100">
                                    <p className="text-sm text-gray-700">
                                      {message.content}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex space-x-3">
                            <Input
                              placeholder="Share your thoughts... 🌸"
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSendMessage()
                              }
                              className="rounded-full border-purple-200 focus:border-purple-400 bg-white/80"
                            />
                            <Button
                              onClick={handleSendMessage}
                              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-6"
                            >
                              Send
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create Room Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="rounded-3xl bg-gradient-to-br from-white to-purple-50 border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Plant a New Garden 🌱
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Create a nurturing space where your community can grow and
              flourish together
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <label
                htmlFor="room-name"
                className="text-sm font-medium text-gray-700"
              >
                Garden Name
              </label>
              <Input
                id="room-name"
                placeholder="e.g., Creative Bloom Collective"
                value={newRoom.name}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, name: e.target.value })
                }
                className="rounded-2xl border-purple-200 focus:border-purple-400 bg-white/80"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="room-description"
                className="text-sm font-medium text-gray-700"
              >
                Garden Description
              </label>
              <Textarea
                id="room-description"
                placeholder="Share what makes this garden special and welcoming..."
                value={newRoom.description}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, description: e.target.value })
                }
                rows={3}
                className="rounded-2xl border-purple-200 focus:border-purple-400 bg-white/80"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="room-category"
                className="text-sm font-medium text-gray-700"
              >
                Garden Type
              </label>
              <select
                id="room-category"
                className="w-full p-3 border border-purple-200 rounded-2xl bg-white/80 focus:border-purple-400 focus:outline-none"
                value={newRoom.category}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, category: e.target.value })
                }
              >
                <option value="study">Learning Garden 📚</option>
                <option value="programming">Code Garden 💻</option>
                <option value="career">Growth Garden 🚀</option>
                <option value="project">Creation Garden 🎨</option>
              </select>
            </div>
          </div>
          <DialogFooter className="space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
              className="rounded-full border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              Maybe Later
            </Button>
            <Button
              onClick={handleCreateRoom}
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8"
            >
              Plant Garden 🌱
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Rooms;
