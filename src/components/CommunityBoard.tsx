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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Plus,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  ExternalLink,
  Filter,
  Search,
  Clock,
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  isLiked: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  isVirtual: boolean;
  attendees: number;
  maxAttendees?: number;
  category: string;
  isAttending: boolean;
}

const CommunityBoard = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "discussion",
    tags: "",
  });

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    isVirtual: false,
    maxAttendees: "",
    category: "networking",
  });

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Tips for Landing Your First Tech Job",
      content:
        "After 6 months of job searching, I finally landed my first developer role! Here are the key things that helped me: 1) Build a strong portfolio with real projects, 2) Practice coding interviews daily, 3) Network with other developers, 4) Don't give up after rejections. Happy to answer any questions!",
      author: {
        name: "Alex Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        title: "Junior Developer at StartupCo",
      },
      category: "career",
      tags: ["job-search", "career-advice", "portfolio"],
      likes: 24,
      comments: 8,
      shares: 5,
      createdAt: "2023-12-05T10:00:00Z",
      isLiked: false,
    },
    {
      id: "2",
      title: "React vs Vue: My Experience After Using Both",
      content:
        "I've been working with React for 2 years and recently started a Vue project. Here's my honest comparison: React has a larger ecosystem and job market, but Vue has a gentler learning curve and better documentation. Both are excellent choices depending on your needs and team preferences.",
      author: {
        name: "Sarah Kim",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        title: "Full Stack Developer",
      },
      category: "technical",
      tags: ["react", "vue", "frontend", "comparison"],
      likes: 18,
      comments: 12,
      shares: 3,
      createdAt: "2023-12-04T14:30:00Z",
      isLiked: true,
    },
    {
      id: "3",
      title: "Free Resources for Learning Data Science",
      content:
        "Compiled a list of free resources that helped me transition into data science: Kaggle Learn, freeCodeCamp's data analysis course, Python for Data Science Handbook (free online), and Coursera's audit option for university courses. Also recommend joining r/MachineLearning and following industry blogs.",
      author: {
        name: "Maria Rodriguez",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        title: "Data Scientist at TechCorp",
      },
      category: "resources",
      tags: ["data-science", "learning", "free-resources", "python"],
      likes: 31,
      comments: 6,
      shares: 12,
      createdAt: "2023-12-03T09:15:00Z",
      isLiked: false,
    },
  ]);

  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "React Meetup: Advanced Patterns",
      description:
        "Join us for an in-depth discussion on advanced React patterns including render props, higher-order components, and custom hooks. Perfect for intermediate to advanced developers.",
      organizer: "React SF Community",
      date: "2023-12-15",
      time: "18:00",
      location: "TechHub San Francisco",
      isVirtual: false,
      attendees: 45,
      maxAttendees: 60,
      category: "technical",
      isAttending: true,
    },
    {
      id: "2",
      title: "Virtual Career Fair - Tech Startups",
      description:
        "Connect with hiring managers from 20+ tech startups. Bring your resume and be ready to network! Companies include early-stage startups to Series B companies.",
      organizer: "TechCareers Network",
      date: "2023-12-20",
      time: "10:00",
      location: "Online Event",
      isVirtual: true,
      attendees: 234,
      maxAttendees: 500,
      category: "career",
      isAttending: false,
    },
    {
      id: "3",
      title: "Women in Tech Networking Brunch",
      description:
        "Monthly networking event for women in technology. Share experiences, build connections, and support each other's career growth in a welcoming environment.",
      organizer: "Women in Tech SF",
      date: "2023-12-17",
      time: "11:00",
      location: "The Breakfast Club, Downtown",
      isVirtual: false,
      attendees: 28,
      maxAttendees: 40,
      category: "networking",
      isAttending: true,
    },
  ]);

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return;

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        title: "Aspiring Developer",
      },
      category: newPost.category,
      tags: newPost.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
      isLiked: false,
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "", category: "discussion", tags: "" });
    setIsCreatePostOpen(false);
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      description: newEvent.description,
      organizer: "Sarah Johnson",
      date: newEvent.date,
      time: newEvent.time,
      location: newEvent.location,
      isVirtual: newEvent.isVirtual,
      attendees: 1,
      maxAttendees: newEvent.maxAttendees
        ? parseInt(newEvent.maxAttendees)
        : undefined,
      category: newEvent.category,
      isAttending: true,
    };

    setEvents([event, ...events]);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      isVirtual: false,
      maxAttendees: "",
      category: "networking",
    });
    setIsCreateEventOpen(false);
  };

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  const toggleAttending = (eventId: string) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              isAttending: !event.isAttending,
              attendees: event.isAttending
                ? event.attendees - 1
                : event.attendees + 1,
            }
          : event,
      ),
    );
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "career":
        return "bg-blue-100 text-blue-800";
      case "technical":
        return "bg-green-100 text-green-800";
      case "resources":
        return "bg-purple-100 text-purple-800";
      case "discussion":
        return "bg-orange-100 text-orange-800";
      case "networking":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community Board</h1>
        <p className="text-gray-600 mt-2">
          Connect with peers, share knowledge, and discover events
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search posts and events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="resources">Resources</SelectItem>
                  <SelectItem value="discussion">Discussion</SelectItem>
                  <SelectItem value="networking">Networking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="posts">Community Posts</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Community Posts</h2>
            <Button onClick={() => setIsCreatePostOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </div>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={post.author.avatar}
                          alt={post.author.name}
                        />
                        <AvatarFallback>
                          {post.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{post.author.name}</h3>
                            <p className="text-sm text-gray-500">
                              {post.author.title}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getCategoryColor(post.category)}>
                              {post.category}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <CardTitle className="mt-2 text-lg">
                          {post.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{post.content}</p>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(post.id)}
                          className={
                            post.isLiked ? "text-red-500" : "text-gray-500"
                          }
                        >
                          <ThumbsUp
                            className={`h-4 w-4 mr-1 ${post.isLiked ? "fill-current" : ""}`}
                          />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          {post.shares}
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Button onClick={() => setIsCreateEventOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                    </div>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()} at{" "}
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                        {event.isVirtual && (
                          <Badge variant="outline" className="ml-2">
                            Virtual
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees} attending
                        {event.maxAttendees && ` / ${event.maxAttendees} max`}
                      </div>
                      <div className="text-sm text-gray-600">
                        Organized by {event.organizer}
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button
                          className="flex-1"
                          variant={event.isAttending ? "outline" : "default"}
                          onClick={() => toggleAttending(event.id)}
                        >
                          {event.isAttending ? "Attending" : "Attend"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Post Dialog */}
      <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Share your knowledge, ask questions, or start a discussion
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="post-title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="post-title"
                placeholder="What's your post about?"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="post-category" className="text-sm font-medium">
                Category
              </label>
              <Select
                value={newPost.category}
                onValueChange={(value) =>
                  setNewPost({ ...newPost, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discussion">Discussion</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="resources">Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="post-content" className="text-sm font-medium">
                Content
              </label>
              <Textarea
                id="post-content"
                placeholder="Share your thoughts, experiences, or questions..."
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                rows={6}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="post-tags" className="text-sm font-medium">
                Tags (comma-separated)
              </label>
              <Input
                id="post-tags"
                placeholder="e.g., react, javascript, career-advice"
                value={newPost.tags}
                onChange={(e) =>
                  setNewPost({ ...newPost, tags: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreatePostOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreatePost}>Create Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Event Dialog */}
      <Dialog open={isCreateEventOpen} onOpenChange={setIsCreateEventOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogDescription>
              Organize a meetup, workshop, or networking event
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="event-title" className="text-sm font-medium">
                  Event Title
                </label>
                <Input
                  id="event-title"
                  placeholder="What's your event called?"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="event-category" className="text-sm font-medium">
                  Category
                </label>
                <Select
                  value={newEvent.category}
                  onValueChange={(value) =>
                    setNewEvent({ ...newEvent, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="career">Career</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="event-description"
                className="text-sm font-medium"
              >
                Description
              </label>
              <Textarea
                id="event-description"
                placeholder="Describe your event..."
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="event-date" className="text-sm font-medium">
                  Date
                </label>
                <Input
                  id="event-date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="event-time" className="text-sm font-medium">
                  Time
                </label>
                <Input
                  id="event-time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, time: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="event-location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="event-location"
                placeholder="Where will this event take place?"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="event-max-attendees"
                  className="text-sm font-medium"
                >
                  Max Attendees (optional)
                </label>
                <Input
                  id="event-max-attendees"
                  type="number"
                  placeholder="Leave empty for unlimited"
                  value={newEvent.maxAttendees}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, maxAttendees: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Type</label>
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="virtual-event"
                    checked={newEvent.isVirtual}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, isVirtual: e.target.checked })
                    }
                  />
                  <label htmlFor="virtual-event" className="text-sm">
                    Virtual Event
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateEventOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateEvent}>Create Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityBoard;
