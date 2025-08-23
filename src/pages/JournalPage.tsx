import React from 'react';
import Layout from '../components/Layout';
import Journal from '../components/Journal';

const JournalPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Reflection Journal</h1>
          <p className="text-muted-foreground mt-2">
            Document your journey and reflect on your progress
          </p>
        </div>
        
        <Journal />
      </div>
    </Layout>
  );
};

export default JournalPage;