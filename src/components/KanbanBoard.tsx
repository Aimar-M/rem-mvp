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
      title: "To Do",
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
      title: "In Progress",
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
      title: "Done",
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
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="bg-background p-4 rounded-lg shadow-sm w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Roadmap Tasks</h2>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="bg-muted/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">{column.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => openAddTaskDialog(column.id)}
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add
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
                            <Card>
                              <CardHeader className="p-3 pb-0">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-base">
                                    {task.title}
                                  </CardTitle>
                                  <div className="flex space-x-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0"
                                      onClick={() =>
                                        openEditTaskDialog(task, column.id)
                                      }
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0"
                                      onClick={() =>
                                        handleDeleteTask(task.id, column.id)
                                      }
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="p-3 pt-2">
                                <p className="text-sm text-muted-foreground mb-2">
                                  {task.description}
                                </p>
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    <span className="text-xs">
                                      {task.dueDate}
                                    </span>
                                  </div>
                                  <Badge
                                    className={`${getPriorityColor(task.priority)} text-white`}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                value={newTask.title || ""}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                placeholder="Task title"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                value={newTask.description || ""}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                placeholder="Task description"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="dueDate">Due Date</label>
              <Input
                id="dueDate"
                type="date"
                value={newTask.dueDate || ""}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="priority">Priority</label>
              <Select
                value={newTask.priority}
                onValueChange={(value) =>
                  setNewTask({
                    ...newTask,
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
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
            >
              Cancel
            </Button>
            <Button onClick={handleEditTask}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KanbanBoard;
