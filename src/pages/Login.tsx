import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in to REM.",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center rem-gradient py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <h1 className="text-4xl font-bold font-sora rem-text-gradient">REM</h1>
            <span className="text-2xl">🌙</span>
          </div>
          <p className="text-stone-600 font-plus-jakarta">Your growth garden awaits</p>
        </div>

        <Card className="rem-card border-sage-200 shadow-floating">
          <CardHeader>
            <CardTitle className="text-sage-700">Welcome to your garden</CardTitle>
            <CardDescription className="text-stone-600">
              Enter your email and password to access your growth space
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-stone-700 font-medium">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="rounded-2xl border-sage-200 focus:border-sage-400 focus:ring-sage-200"
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-stone-700 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="rounded-2xl border-sage-200 focus:border-sage-400 focus:ring-sage-200"
                />
              </div>

              <Button type="submit" className="w-full rem-accent hover:from-sage-500 hover:to-lavender-500 text-white rounded-2xl" disabled={loading}>
                {loading ? 'Entering garden...' : 'Enter Garden'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-stone-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-sage-600 hover:text-sage-700 hover:underline">
                  Join the garden
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;