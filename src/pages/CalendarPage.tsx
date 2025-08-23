import React from 'react';
import Layout from '../components/Layout';
import CalendarView from '../components/CalendarView';

const CalendarPage: React.FC = () => {
  // Mock tasks with deadlines for calendar view
  const tasksWithDeadlines = [
    {
      id: '1',
      title: 'Complete React project',
      description: 'Finish the final components and testing',
      dueDate: new Date('2024-01-15'),
      priority: 'high' as const,
      status: 'in-progress' as const,
    },
    {
      id: '2',
      title: 'Submit internship application',
      description: 'Apply to summer internship program',
      dueDate: new Date('2024-01-20'),
      priority: 'high' as const,
      status: 'todo' as const,
    },
    {
      id: '3',
      title: 'Weekly journal reflection',
      description: 'Write about this week\'s progress and learnings',
      dueDate: new Date('2024-01-18'),
      priority: 'medium' as const,
      status: 'todo' as const,
    },
    {
      id: '4',
      title: 'Team meeting preparation',
      description: 'Prepare slides for project presentation',
      dueDate: new Date('2024-01-22'),
      priority: 'medium' as const,
      status: 'todo' as const,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground mt-2">
            View your tasks and deadlines in calendar format
          </p>
        </div>
        
        <CalendarView 
          tasks={tasksWithDeadlines}
          onTaskClick={(task) => {
            console.log('Task clicked:', task);
            // Handle task click - could open a modal or navigate to task details
          }}
        />
      </div>
    </Layout>
  );
};

export default CalendarPage;