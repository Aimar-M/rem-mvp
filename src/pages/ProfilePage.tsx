import React from 'react';
import Layout from '../components/Layout';
import Profile from '../components/Profile';

const ProfilePage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-sora rem-text-gradient">Growth Profile 🌱</h1>
          <p className="text-stone-600 mt-2 font-plus-jakarta">
            Manage your account and track your achievements
          </p>
        </div>
        
        <Profile />
      </div>
    </Layout>
  );
};

export default ProfilePage;