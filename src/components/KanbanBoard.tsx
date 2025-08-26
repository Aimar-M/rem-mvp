import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Edit, Trash2, Calendar } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface KanbanBoardProps {
  initialColumns?: Record<string, Column>;
  onTaskUpdate?: (
    taskId: string,
    columnId: string,
    newColumnId: string,
  ) => void;
  onTaskCreate?: (task: Task, columnId: string) => void;
  onTaskEdit?: (taskId: string, columnId: string, updatedTask: Task) => void;
  onTaskDelete?: (taskId: string, columnId: string) => void;
}

const KanbanBoard = ({
  initialColumns = {
    todo: {
      id: "todo",
      title: "🌰 Seeds",
      tasks: [
        {
          id: "1",
          title: "Learn React basics",
          description: "Complete React fundamentals course",
          dueDate: "2023-12-15",
          priority: "high",
        },
        {
          id: "2",
          title: "Build portfolio project",
          description: "Create a simple web app to showcase skills",
          dueDate: "2023-12-30",
          priority: "medium",
        },
      ],
    },
    inprogress: {
      id: "inprogress",
      title: "🌱 Growing",
      tasks: [
        {
          id: "3",
          title: "Practice coding challenges",
          description: "Solve at least 5 algorithm problems",
          dueDate: "2023-12-10",
          priority: "medium",
        },
      ],
    },
    done: {
      id: "done",
      title: "🌸 Bloomed",
      tasks: [
        {
          id: "4",
          title: "Set up development environment",
          description: "Install necessary tools and frameworks",
          dueDate: "2023-12-01",
          priority: "low",
        },
      ],
    },
  },
  onTaskUpdate = () => {},
  onTaskCreate = () => {},
  onTaskEdit = () => {},
  onTaskDelete = () => {},
}: KanbanBoardProps) => {
  const [columns, setColumns] =
    useState<Record<string, Column>>(initialColumns);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentColumnId, setCurrentColumnId] = useState<string>("");
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
  });

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the item was dropped back in the same place
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const task = sourceColumn.tasks.find((task) => task.id === draggableId);

    if (!task) return;

    // Create new arrays for the source and destination columns
    const newSourceTasks = [...sourceColumn.tasks];
    newSourceTasks.splice(source.index, 1);

    const newDestTasks = [...destColumn.tasks];
    newDestTasks.splice(destination.index, 0, task);

    // Update the state with the new arrays
    const newColumns = {
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: newSourceTasks,
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: newDestTasks,
      },
    };

    setColumns(newColumns);
    onTaskUpdate(draggableId, source.droppableId, destination.droppableId);
  };

  const openAddTaskDialog = (columnId: string) => {
    setCurrentColumnId(columnId);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
    });
    setIsAddDialogOpen(true);
  };

  const openEditTaskDialog = (task: Task, columnId: string) => {
    setCurrentTask(task);
    setCurrentColumnId(columnId);
    setIsEditDialogOpen(true);
  };

  const handleAddTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title || "",
      description: newTask.description || "",
      dueDate: newTask.dueDate || "",
      priority: (newTask.priority as "low" | "medium" | "high") || "medium",
    };

    const column = columns[currentColumnId];
    const updatedColumn = {
      ...column,
      tasks: [...column.tasks, task],
    };

    setColumns({
      ...columns,
      [currentColumnId]: updatedColumn,
    });

    onTaskCreate(task, currentColumnId);
    setIsAddDialogOpen(false);
  };

  const handleEditTask = () => {
    if (!currentTask || !currentTask.title) return;

    const column = columns[currentColumnId];
    const updatedTasks = column.tasks.map((task) =>
      task.id === currentTask.id ? currentTask : task,
    );

    const updatedColumn = {
      ...column,
      tasks: updatedTasks,
    };

    setColumns({
      ...columns,
      [currentColumnId]: updatedColumn,
    });

    onTaskEdit(currentTask.id, currentColumnId, currentTask);
    setIsEditDialogOpen(false);
  };

  const handleDeleteTask = (taskId: string, columnId: string) => {
    const column = columns[columnId];
    const updatedTasks = column.tasks.filter((task) => task.id !== taskId);

    const updatedColumn = {
      ...column,
      tasks: updatedTasks,
    };

    setColumns({
      ...columns,
      [columnId]: updatedColumn,
    });

    onTaskDelete(taskId, columnId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-peach-500";
      case "medium":
        return "bg-sky-500";
      case "low":
        return "bg-sage-500";
      default:
        return "bg-lavender-500";
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold font-sora rem-text-gradient">Task Garden 🌱</h2>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-stone-200 shadow-soft">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg text-stone-800">{column.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openAddTaskDialog(column.id)}
                  className="hover:bg-sage-50 text-sage-600 rounded-xl"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Plant Seed
                </Button>
              </div>

              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px]"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-3"
                          >
                            <Card className="rem-card border-sage-200 hover:scale-105 transition-all duration-300 mb-4">
                              <CardHeader className="p-4 pb-2">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-base text-sage-700">
                                    {task.title}
                                  </CardTitle>
                                  <div className="flex space-x-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0 hover:bg-sage-50 text-sage-600"
                                      onClick={() =>
                                        openEditTaskDialog(task, column.id)
                                      }
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0 hover:bg-peach-50 text-peach-600"
                                      onClick={() =>
                                        handleDeleteTask(task.id, column.id)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4 pt-2">
                                <p className="text-sm text-stone-600 mb-3">
                                  {task.description}
                                </p>
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center text-stone-500">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span className="text-xs">
                                      {task.dueDate}
                                    </span>
                                  </div>
                                  <Badge
                                    className={`${getPriorityColor(task.priority)} text-white rounded-full px-2 py-1`}
                                  >
                                    {task.priority}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {/* Add Task Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-xl border-sage-200 rounded-2xl shadow-floating">
          <DialogHeader>
            <DialogTitle className="text-sage-700">Plant New Seed</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-stone-700 font-medium">Seed Name</label>
              <Input
                id="title"
                value={newTask.title || ""}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                placeholder="What will this seed grow into?"
                className="rounded-2xl border-sage-200 focus:border-sage-400 focus:ring-sage-200"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description" className="text-stone-700 font-medium">Growth Plan</label>
              <Textarea
                id="description"
                value={newTask.description || ""}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                placeholder="How will you nurture this seed?"
                className="rounded-2xl border-sage-200 focus:border-sage-400 focus:ring-sage-200"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="dueDate" className="text-stone-700 font-medium">Bloom Date</label>
              <Input
                id="dueDate"
                type="date"
                value={newTask.dueDate || ""}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
                className="rounded-2xl border-sage-200 focus:border-sage-400 focus:ring-sage-200"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="priority" className="text-stone-700 font-medium">Growth Priority</label>
              <Select
                value={newTask.priority}
                onValueChange={(value) =>
                  setNewTask({
                    ...newTask,
                    priority: value as "low" | "medium" | "high",
                  })
                }
              >
                <SelectTrigger className="rounded-2xl border-sage-200 focus:border-sage-400 focus:ring-sage-200">
                  <SelectValue placeholder="How important is this seed?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Gentle Growth</SelectItem>
                  <SelectItem value="medium">Steady Growth</SelectItem>
                  <SelectItem value="high">Rapid Growth</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-sage-200 hover:bg-sage-50 text-sage-700 rounded-2xl">
              Cancel
            </Button>
            <Button onClick={handleAddTask} className="rem-accent hover:from-sage-500 hover:to-lavender-500 text-white rounded-2xl">Plant Seed</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-xl border-sage-200 rounded-2xl shadow-floating">
          <DialogHeader>
            <DialogTitle className="text-sage-700">Nurture Seed</DialogTitle>
          </DialogHeader>
          {currentTask && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="edit-title">Title</label>
                <Input
                  id="edit-title"
                  value={currentTask.title}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, title: e.target.value })
                  }
                  placeholder="Task title"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-description">Description</label>
                <Textarea
                  id="edit-description"
                  value={currentTask.description}
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      description: e.target.value,
                    })
                  }
                  placeholder="Task description"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-dueDate">Due Date</label>
                <Input
                  id="edit-dueDate"
                  type="date"
                  value={currentTask.dueDate}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, dueDate: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="edit-priority">Priority</label>
                <Select
                  value={currentTask.priority}
                  onValueChange={(value) =>
                    setCurrentTask({
                      ...currentTask,
                      priority: value as "low" | "medium" | "high",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-sage-200 hover:bg-sage-50 text-sage-700 rounded-2xl"
            >
              Cancel
            </Button>
            <Button onClick={handleEditTask} className="rem-accent hover:from-sage-500 hover:to-lavender-500 text-white rounded-2xl">Save Growth</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KanbanBoard;
