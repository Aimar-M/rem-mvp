import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  Edit,
  Plus,
  Save,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "daily" | "weekly" | "reflection";
  mood?: "great" | "good" | "okay" | "challenging";
  aiSummary?: string;
}

const Journal = () => {
  const [activeTab, setActiveTab] = useState("write");
  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    type: "daily" as "daily" | "weekly" | "reflection",
    mood: "good" as "great" | "good" | "okay" | "challenging",
  });
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      title: "First Week Progress",
      content:
        "Started learning React fundamentals. Completed the first three modules of the course. Feeling confident about the basics but need more practice with hooks.",
      date: "2023-12-01",
      type: "weekly",
      mood: "good",
      aiSummary:
        "Making steady progress on React learning goals. Focus on hooks practice recommended.",
    },
    {
      id: "2",
      title: "Daily Reflection",
      content:
        "Today I worked on a small project using React. Built a simple todo app. Struggled with state management but eventually figured it out. Feeling more confident.",
      date: "2023-12-05",
      type: "daily",
      mood: "great",
      aiSummary:
        "Breakthrough moment with state management. Confidence building through hands-on practice.",
    },
  ]);

  const handleSaveEntry = () => {
    if (!newEntry.title || !newEntry.content) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newEntry.title,
      content: newEntry.content,
      date: new Date().toISOString().split("T")[0],
      type: newEntry.type,
      mood: newEntry.mood,
      aiSummary: "AI analysis will be generated based on your reflection...",
    };

    setEntries([entry, ...entries]);
    setNewEntry({
      title: "",
      content: "",
      type: "daily",
      mood: "good",
    });
    setActiveTab("entries");
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "great":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "okay":
        return "bg-yellow-100 text-yellow-800";
      case "challenging":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "daily":
        return <Calendar className="h-4 w-4" />;
      case "weekly":
        return <TrendingUp className="h-4 w-4" />;
      case "reflection":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reflection Journal</h1>
        <p className="text-gray-600 mt-2">
          Document your journey, reflect on progress, and gain AI-powered
          insights
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="write">Write Entry</TabsTrigger>
          <TabsTrigger value="entries">My Entries</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="write" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>New Journal Entry</CardTitle>
              <CardDescription>
                Take a moment to reflect on your progress and experiences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="entry-title" className="text-sm font-medium">
                    Entry Title
                  </label>
                  <Input
                    id="entry-title"
                    placeholder="What's on your mind today?"
                    value={newEntry.title}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="entry-type" className="text-sm font-medium">
                    Entry Type
                  </label>
                  <select
                    id="entry-type"
                    className="w-full p-2 border rounded-md"
                    value={newEntry.type}
                    onChange={(e) =>
                      setNewEntry({
                        ...newEntry,
                        type: e.target.value as
                          | "daily"
                          | "weekly"
                          | "reflection",
                      })
                    }
                  >
                    <option value="daily">Daily Reflection</option>
                    <option value="weekly">Weekly Review</option>
                    <option value="reflection">General Reflection</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="mood" className="text-sm font-medium">
                  How are you feeling?
                </label>
                <select
                  id="mood"
                  className="w-full p-2 border rounded-md"
                  value={newEntry.mood}
                  onChange={(e) =>
                    setNewEntry({
                      ...newEntry,
                      mood: e.target.value as
                        | "great"
                        | "good"
                        | "okay"
                        | "challenging",
                    })
                  }
                >
                  <option value="great">Great - Feeling accomplished</option>
                  <option value="good">Good - Making progress</option>
                  <option value="okay">Okay - Steady pace</option>
                  <option value="challenging">
                    Challenging - Need support
                  </option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="entry-content" className="text-sm font-medium">
                  Your Reflection
                </label>
                <Textarea
                  id="entry-content"
                  placeholder="Share your thoughts, progress, challenges, and wins..."
                  value={newEntry.content}
                  onChange={(e) =>
                    setNewEntry({ ...newEntry, content: e.target.value })
                  }
                  rows={8}
                  className="resize-none"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveEntry} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Entry
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="entries" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Journal Entries</h2>
            <Button onClick={() => setActiveTab("write")}>
              <Plus className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </div>

          <div className="space-y-4">
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        {getTypeIcon(entry.type)}
                        <span className="ml-2">{entry.title}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={getMoodColor(entry.mood || "good")}>
                          {entry.mood}
                        </Badge>
                        <Badge variant="outline">
                          {new Date(entry.date).toLocaleDateString()}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{entry.content}</p>
                    {entry.aiSummary && (
                      <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                        <div className="flex items-center mb-2">
                          <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="text-sm font-medium text-blue-800">
                            AI Insight
                          </span>
                        </div>
                        <p className="text-sm text-blue-700">
                          {entry.aiSummary}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-primary" />
                AI-Powered Insights
              </CardTitle>
              <CardDescription>
                Discover patterns and trends in your reflection journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Progress Patterns</h3>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-800">
                      Consistent Growth
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your entries show steady progress in technical skills over
                      the past month.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800">
                      Learning Momentum
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                      You're building confidence through hands-on practice and
                      project work.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Recommendations</h3>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-medium text-yellow-800">Focus Areas</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Consider dedicating more time to advanced React concepts
                      like context and custom hooks.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-800">Next Steps</h4>
                    <p className="text-sm text-purple-700 mt-1">
                      Your progress suggests you're ready to tackle more complex
                      projects.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Journal;
