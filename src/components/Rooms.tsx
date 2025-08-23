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
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
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
      name: "Web Dev Study Group",
      description:
        "A collaborative space for learning web development together",
      category: "study",
      memberCount: 12,
      isPrivate: false,
      createdDate: "2023-11-15",
      lastActivity: "2023-12-05",
      owner: "sarah-johnson",
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
      name: "React Mastery",
      description: "Advanced React concepts and best practices",
      category: "programming",
      memberCount: 8,
      isPrivate: false,
      createdDate: "2023-11-20",
      lastActivity: "2023-12-04",
      owner: "emma-davis",
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
      name: "Career Prep Squad",
      description: "Preparing for tech interviews and career advancement",
      category: "career",
      memberCount: 15,
      isPrivate: false,
      createdDate: "2023-10-30",
      lastActivity: "2023-12-05",
      owner: "alex-kim",
      members: [],
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
        return "bg-blue-100 text-blue-800";
      case "programming":
        return "bg-green-100 text-green-800";
      case "career":
        return "bg-purple-100 text-purple-800";
      case "project":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    <div className="w-full max-w-7xl mx-auto p-4 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Collaboration Rooms
        </h1>
        <p className="text-gray-600 mt-2">
          Join study groups, work on projects together, and build your network
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
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Discover Rooms</h2>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Room
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                      <Badge className={getCategoryColor(room.category)}>
                        {room.category}
                      </Badge>
                    </div>
                    <CardDescription>{room.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{room.memberCount} members</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(room.lastActivity).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {room.members.slice(0, 3).map((member) => (
                          <Avatar key={member.id} className="h-6 w-6">
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
                        {room.memberCount > 3 && (
                          <span className="text-xs text-gray-500">
                            +{room.memberCount - 3} more
                          </span>
                        )}
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setSelectedRoom(room);
                          setActiveTab("room-view");
                        }}
                      >
                        Join Room
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedRoom.name}</h2>
                  <p className="text-gray-600">{selectedRoom.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getCategoryColor(selectedRoom.category)}>
                    {selectedRoom.category}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <UserPlus className="h-4 w-4 mr-1" />
                    Invite
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Members Sidebar */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Members ({selectedRoom.memberCount})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedRoom.members.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center space-x-2"
                          >
                            <div className="relative">
                              <Avatar className="h-8 w-8">
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
                              {member.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-1">
                                <p className="text-sm font-medium truncate">
                                  {member.name}
                                </p>
                                {getRoleIcon(member.role)}
                              </div>
                              <p className="text-xs text-gray-500">
                                {member.role}
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
                    <TabsList>
                      <TabsTrigger value="kanban">Project Board</TabsTrigger>
                      <TabsTrigger value="chat">Group Chat</TabsTrigger>
                    </TabsList>

                    <TabsContent value="kanban" className="mt-4">
                      <KanbanBoard />
                    </TabsContent>

                    <TabsContent value="chat" className="mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <MessageSquare className="h-5 w-5 mr-2" />
                            Group Chat
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                            {messages.map((message) => (
                              <div
                                key={message.id}
                                className="flex items-start space-x-3"
                              >
                                <Avatar className="h-8 w-8">
                                  <AvatarImage
                                    src={message.avatar}
                                    alt={message.sender}
                                  />
                                  <AvatarFallback className="text-xs">
                                    {message.sender
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <p className="text-sm font-medium">
                                      {message.sender}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {new Date(
                                        message.timestamp,
                                      ).toLocaleTimeString()}
                                    </p>
                                  </div>
                                  <p className="text-sm text-gray-700 mt-1">
                                    {message.content}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Type your message..."
                              value={newMessage}
                              onChange={(e) => setNewMessage(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === "Enter" && handleSendMessage()
                              }
                            />
                            <Button onClick={handleSendMessage}>Send</Button>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Room</DialogTitle>
            <DialogDescription>
              Set up a collaborative space for your team or study group
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="room-name" className="text-sm font-medium">
                Room Name
              </label>
              <Input
                id="room-name"
                placeholder="e.g., React Study Group"
                value={newRoom.name}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="room-description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="room-description"
                placeholder="Describe the purpose of this room..."
                value={newRoom.description}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, description: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="room-category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="room-category"
                className="w-full p-2 border rounded-md"
                value={newRoom.category}
                onChange={(e) =>
                  setNewRoom({ ...newRoom, category: e.target.value })
                }
              >
                <option value="study">Study Group</option>
                <option value="programming">Programming</option>
                <option value="career">Career Development</option>
                <option value="project">Project Collaboration</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateRoom}>Create Room</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Rooms;
