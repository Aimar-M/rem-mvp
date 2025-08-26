import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Briefcase,
  Users,
  Settings,
  LogOut,
  Kanban,
  Moon,
  Sparkles
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Your Garden', href: '/', icon: LayoutDashboard, description: 'Growth overview' },
    { name: 'Task Garden', href: '/kanban', icon: Kanban, description: 'Nurture projects' },
    { name: 'Time Blossoms', href: '/calendar', icon: Calendar, description: 'See when dreams bloom' },
    { name: 'Reflection Pool', href: '/journal', icon: BookOpen, description: 'Capture growth moments' },
    { name: 'Opportunities', href: '/opportunities', icon: Briefcase, description: 'Discover possibilities' },
    { name: 'Garden Rooms', href: '/rooms', icon: Users, description: 'Grow together' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-sage-50 to-lavender-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl shadow-floating border-r border-stone-100">
        <div className="flex h-20 items-center justify-center border-b border-stone-100 px-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <h1 className="text-3xl font-bold font-sora rem-text-gradient">REM</h1>
              <Moon className="absolute -top-1 -right-1 h-4 w-4 text-lavender-500" />
            </div>
            <Sparkles className="h-5 w-5 text-peach-400 animate-pulse" />
          </div>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-start px-4 py-3 text-sm font-medium rounded-2xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-sage-100 to-lavender-100 text-sage-700 shadow-soft border border-sage-200'
                      : 'text-stone-600 hover:bg-white/60 hover:text-sage-700 hover:shadow-gentle'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 mt-0.5 ${
                    isActive ? 'text-sage-600' : 'text-stone-400 group-hover:text-sage-500'
                  }`} />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className={`text-xs mt-0.5 ${
                      isActive ? 'text-sage-600' : 'text-stone-400 group-hover:text-sage-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User menu at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-stone-100 bg-white/60 backdrop-blur-sm">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-3 hover:bg-white/80 rounded-2xl">
                <Avatar className="h-10 w-10 mr-3 ring-2 ring-sage-100">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-sage-100 text-sage-700 font-medium">
                    {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium text-stone-800">{user?.name}</p>
                  <p className="text-xs text-stone-500">{user?.email}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-white/95 backdrop-blur-xl border-stone-200 rounded-2xl shadow-floating">
              <DropdownMenuLabel className="text-stone-700 font-medium">My Garden</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-stone-200" />
              <DropdownMenuItem onClick={() => navigate('/profile')} className="text-stone-600 hover:text-sage-700 hover:bg-sage-50 rounded-xl">
                <Settings className="mr-2 h-4 w-4 text-sage-500" />
                Garden Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-stone-200" />
              <DropdownMenuItem onClick={handleLogout} className="text-stone-600 hover:text-peach-600 hover:bg-peach-50 rounded-xl">
                <LogOut className="mr-2 h-4 w-4 text-peach-500" />
                Leave Garden
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-72">
        <main className="py-8 px-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;