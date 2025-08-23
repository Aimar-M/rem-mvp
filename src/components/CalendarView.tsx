import React, { useState } from "react";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "done";
}

interface CalendarViewProps {
  tasks?: Task[];
  onTaskClick?: (task: Task) => void;
}

const CalendarView = ({
  tasks = [],
  onTaskClick = () => {},
}: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");

  const goToPreviousPeriod = () => {
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === "week") {
      setCurrentDate(addDays(currentDate, -7));
    } else {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  const goToNextPeriod = () => {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === "week") {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="bg-background">
        <div className="grid grid-cols-7 gap-1 text-center font-medium">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const dayTasks = tasks.filter((task) =>
              isSameDay(new Date(task.dueDate), day),
            );
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={day.toString()}
                className={`min-h-[100px] p-1 border rounded-md ${isCurrentMonth ? "bg-card" : "bg-muted/30"} ${isToday ? "border-primary" : "border-border"}`}
              >
                <div
                  className={`text-right p-1 ${isCurrentMonth ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {format(day, "d")}
                </div>
                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      onClick={() => onTaskClick(task)}
                      className={`text-xs p-1 rounded-sm cursor-pointer truncate
                        ${
                          task.priority === "high"
                            ? "bg-red-100 dark:bg-red-900/30"
                            : task.priority === "medium"
                              ? "bg-yellow-100 dark:bg-yellow-900/30"
                              : "bg-green-100 dark:bg-green-900/30"
                        }`}
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center">
                      +{dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate);
    const weekEnd = endOfWeek(currentDate);
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

    return (
      <div className="space-y-2">
        {days.map((day) => {
          const dayTasks = tasks.filter((task) =>
            isSameDay(new Date(task.dueDate), day),
          );
          const isToday = isSameDay(day, new Date());

          return (
            <Card
              key={day.toString()}
              className={`${isToday ? "border-primary" : ""}`}
            >
              <CardHeader className="py-2">
                <CardTitle className="text-sm flex justify-between">
                  <span>{format(day, "EEEE")}</span>
                  <span>{format(day, "MMM d, yyyy")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                {dayTasks.length > 0 ? (
                  <div className="space-y-2">
                    {dayTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => onTaskClick(task)}
                        className="p-2 border rounded-md cursor-pointer hover:bg-accent"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{task.title}</span>
                          <Badge
                            variant={
                              task.priority === "high"
                                ? "destructive"
                                : task.priority === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {task.description}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No tasks scheduled
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    const dayTasks = tasks.filter((task) =>
      isSameDay(new Date(task.dueDate), currentDate),
    );
    const isToday = isSameDay(currentDate, new Date());

    return (
      <Card className={`${isToday ? "border-primary" : ""}`}>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{format(currentDate, "EEEE")}</span>
            <span>{format(currentDate, "MMMM d, yyyy")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {dayTasks.length > 0 ? (
            <div className="space-y-4">
              {dayTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => onTaskClick(task)}
                  className="p-4 border rounded-md cursor-pointer hover:bg-accent"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-lg">{task.title}</h3>
                    <Badge
                      variant={
                        task.priority === "high"
                          ? "destructive"
                          : task.priority === "medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{task.description}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <Badge variant="outline">{task.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="mt-4 text-lg font-medium">No tasks scheduled</h3>
              <p className="text-muted-foreground">
                Enjoy your free day or add a new task!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="bg-background p-4 rounded-xl border w-full">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Calendar</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={goToPreviousPeriod}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextPeriod}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium">
            {view === "month" && format(currentDate, "MMMM yyyy")}
            {view === "week" &&
              `Week of ${format(startOfWeek(currentDate), "MMM d")} - ${format(endOfWeek(currentDate), "MMM d, yyyy")}`}
            {view === "day" && format(currentDate, "MMMM d, yyyy")}
          </h3>
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as "month" | "week" | "day")}
          >
            <TabsList>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="day">Day</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-4">
          {view === "month" && renderMonthView()}
          {view === "week" && renderWeekView()}
          {view === "day" && renderDayView()}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
