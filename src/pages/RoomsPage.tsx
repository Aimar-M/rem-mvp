import React from 'react';
import Layout from '../components/Layout';
import Rooms from '../components/Rooms';

const RoomsPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Collaboration Rooms</h1>
          <p className="text-muted-foreground mt-2">
            Join study groups, work on projects together, and build your network
          </p>
        </div>
        
        <Rooms />
      </div>
    </Layout>
  );
};

export default RoomsPage;