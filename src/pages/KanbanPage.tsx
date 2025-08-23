import React from 'react';
import Layout from '../components/Layout';
import KanbanBoard from '../components/KanbanBoard';

const KanbanPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Kanban Board</h1>
          <p className="text-muted-foreground mt-2">
            Organize your tasks and track your progress
          </p>
        </div>
        
        <KanbanBoard />
      </div>
    </Layout>
  );
};

export default KanbanPage;