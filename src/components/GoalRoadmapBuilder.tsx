import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ChevronRight,
  Clock,
  Edit,
  Loader2,
  Plus,
  Sparkles,
} from "lucide-react";
import KanbanBoard from "./KanbanBoard";

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  status: "not-started" | "in-progress" | "completed";
}

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  steps: RoadmapStep[];
}

// Mock CalendarView component to use until the real one is implemented
const CalendarView = ({
  goalId,
  steps,
}: {
  goalId: string;
  steps: RoadmapStep[];
}) => {
  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <h3 className="text-lg font-medium mb-4">Calendar View</h3>
      <p className="text-gray-500">
        Calendar integration will display your roadmap milestones here.
      </p>
      <div className="mt-4 grid grid-cols-7 gap-1">
        {Array.from({ length: 31 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square border rounded-md flex items-center justify-center bg-white"
          >
            <span className="text-sm">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const GoalRoadmapBuilder = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [isGenerating, setIsGenerating] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalDescription, setGoalDescription] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");
  const [generatedRoadmap, setGeneratedRoadmap] = useState<
    RoadmapStep[] | null
  >(null);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Become a Full Stack Developer",
      description:
        "Learn the necessary skills to become a proficient full stack developer within 6 months",
      deadline: "2023-12-31",
      steps: [
        {
          id: "1-1",
          title: "Learn HTML, CSS and JavaScript fundamentals",
          description:
            "Master the core web technologies through online courses and practice projects",
          timeframe: "4 weeks",
          status: "completed",
        },
        {
          id: "1-2",
          title: "Build frontend skills with React",
          description:
            "Complete React course and build 3 small projects to demonstrate proficiency",
          timeframe: "6 weeks",
          status: "in-progress",
        },
        {
          id: "1-3",
          title: "Learn backend development with Node.js",
          description:
            "Master Express.js, API development, and database integration",
          timeframe: "6 weeks",
          status: "not-started",
        },
        {
          id: "1-4",
          title: "Build a full stack project portfolio",
          description:
            "Create 2-3 complete applications that demonstrate your full stack abilities",
          timeframe: "8 weeks",
          status: "not-started",
        },
      ],
    },
  ]);

  const handleGenerateRoadmap = () => {
    if (!goalTitle) return;

    setIsGenerating(true);

    // Simulate AI generation with timeout
    setTimeout(() => {
      const mockRoadmap: RoadmapStep[] = [
        {
          id: Date.now().toString() + "-1",
          title: "Research and planning phase",
          description: `Initial research on ${goalTitle} requirements and create a learning plan`,
          timeframe: "2 weeks",
          status: "not-started",
        },
        {
          id: Date.now().toString() + "-2",
          title: "Acquire fundamental knowledge",
          description:
            "Learn the core concepts and principles through courses or books",
          timeframe: "4 weeks",
          status: "not-started",
        },
        {
          id: Date.now().toString() + "-3",
          title: "Practice with small projects",
          description:
            "Apply knowledge by completing 2-3 small practice projects",
          timeframe: "6 weeks",
          status: "not-started",
        },
        {
          id: Date.now().toString() + "-4",
          title: "Advanced skills development",
          description:
            "Deepen knowledge with more complex concepts and techniques",
          timeframe: "8 weeks",
          status: "not-started",
        },
        {
          id: Date.now().toString() + "-5",
          title: "Build portfolio project",
          description:
            "Create a comprehensive project that demonstrates your abilities",
          timeframe: "6 weeks",
          status: "not-started",
        },
      ];

      setGeneratedRoadmap(mockRoadmap);
      setIsGenerating(false);
    }, 2000);
  };

  const handleAcceptRoadmap = () => {
    if (!generatedRoadmap) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: goalTitle,
      description: goalDescription,
      deadline: goalDeadline,
      steps: generatedRoadmap,
    };

    setGoals([...goals, newGoal]);
    setActiveTab("view");

    // Reset form
    setGoalTitle("");
    setGoalDescription("");
    setGoalDeadline("");
    setGeneratedRoadmap(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "not-started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Goal Roadmap Builder
        </h1>
        <p className="text-gray-600 mt-2">
          Set your goals, generate step-by-step roadmaps, and track your
          progress
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="create">Create New Goal</TabsTrigger>
          <TabsTrigger value="view">View My Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Define Your Goal</CardTitle>
              <CardDescription>
                Enter the details of your goal and we'll help you create a
                roadmap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="goal-title" className="text-sm font-medium">
                  Goal Title
                </label>
                <Input
                  id="goal-title"
                  placeholder="e.g., Become a software engineer"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="goal-description"
                  className="text-sm font-medium"
                >
                  Description
                </label>
                <Textarea
                  id="goal-description"
                  placeholder="Describe your goal in more detail..."
                  value={goalDescription}
                  onChange={(e) => setGoalDescription(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="goal-deadline" className="text-sm font-medium">
                  Target Completion Date
                </label>
                <Input
                  id="goal-deadline"
                  type="date"
                  value={goalDeadline}
                  onChange={(e) => setGoalDeadline(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGenerateRoadmap}
                disabled={!goalTitle || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Roadmap...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Roadmap
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {generatedRoadmap && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-primary" />
                    AI-Generated Roadmap
                  </CardTitle>
                  <CardDescription>
                    Here's your personalized roadmap for:{" "}
                    <span className="font-medium">{goalTitle}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {generatedRoadmap.map((step, index) => (
                      <div key={step.id} className="relative pl-8 pb-6">
                        {index < generatedRoadmap.length - 1 && (
                          <div className="absolute left-4 top-8 h-full w-0.5 bg-gray-200" />
                        )}
                        <div className="flex items-start">
                          <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                            {index + 1}
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-medium">
                              {step.title}
                            </h3>
                            <p className="text-gray-600">{step.description}</p>
                            <div className="flex items-center space-x-3">
                              <Badge
                                variant="outline"
                                className="flex items-center"
                              >
                                <Clock className="mr-1 h-3 w-3" />
                                {step.timeframe}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setGeneratedRoadmap(null)}
                  >
                    Regenerate
                  </Button>
                  <Button onClick={handleAcceptRoadmap}>
                    Accept and Create Goal
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="view">
          {goals.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No goals created yet</h3>
              <p className="text-gray-500 mt-2">
                Create your first goal to get started
              </p>
              <Button className="mt-4" onClick={() => setActiveTab("create")}>
                <Plus className="mr-2 h-4 w-4" />
                Create Goal
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Goals</h2>
                <Button onClick={() => setActiveTab("create")}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Goal
                </Button>
              </div>

              {goals.map((goal) => (
                <Card key={goal.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{goal.title}</CardTitle>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription>{goal.description}</CardDescription>
                    <div className="flex items-center mt-2">
                      <Badge variant="outline" className="text-xs">
                        Due: {new Date(goal.deadline).toLocaleDateString()}
                      </Badge>
                      <div className="ml-auto flex items-center space-x-1">
                        <span className="text-xs text-gray-500">
                          {
                            goal.steps.filter((s) => s.status === "completed")
                              .length
                          }{" "}
                          of {goal.steps.length} steps completed
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Roadmap Steps</h3>
                      <div className="space-y-3">
                        {goal.steps.map((step) => (
                          <div
                            key={step.id}
                            className="flex items-center p-3 rounded-lg border"
                          >
                            <div className="mr-4">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${step.status === "completed" ? "bg-green-100" : "bg-gray-100"}`}
                              >
                                {step.status === "completed" ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <span className="text-sm font-medium text-gray-600">
                                    {goal.steps.indexOf(step) + 1}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{step.title}</h4>
                              <p className="text-sm text-gray-600">
                                {step.timeframe}
                              </p>
                            </div>
                            <Badge className={getStatusColor(step.status)}>
                              {step.status === "not-started"
                                ? "Not Started"
                                : step.status === "in-progress"
                                  ? "In Progress"
                                  : "Completed"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <Separator />
                  <div className="p-6">
                    <Tabs defaultValue="kanban">
                      <TabsList>
                        <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
                        <TabsTrigger value="calendar">Calendar</TabsTrigger>
                      </TabsList>
                      <TabsContent value="kanban" className="mt-4">
                        <KanbanBoard goalId={goal.id} steps={goal.steps} />
                      </TabsContent>
                      <TabsContent value="calendar" className="mt-4">
                        <CalendarView goalId={goal.id} steps={goal.steps} />
                      </TabsContent>
                    </Tabs>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoalRoadmapBuilder;
