import React from 'react';
import Layout from '../components/Layout';
import OpportunityBoard from '../components/OpportunityBoard';

const OpportunitiesPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Opportunities</h1>
          <p className="text-muted-foreground mt-2">
            Discover jobs, internships, and scholarships tailored to your goals
          </p>
        </div>
        
        <OpportunityBoard />
      </div>
    </Layout>
  );
};

export default OpportunitiesPage;