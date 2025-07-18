import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import Overview from './dashboard/Overview';
import Profile from './dashboard/Profile';
import Revenue from './dashboard/Revenue';
import Courses from './dashboard/Courses';
import Stories from './dashboard/Stories';
import StoryForm from './dashboard/StoryForm';
import Analytics from './dashboard/Analytics';
import CreatorOnboarding from '@/components/CreatorOnboarding';

interface Creator {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar_url: string;
  cover_image_url: string;
  location: string;
  website: string;
  social_links: any;
  is_public: boolean;
  slug: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [creator, setCreator] = useState<Creator | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_OUT') {
          navigate('/auth');
        }
        
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(() => {
            fetchCreatorProfile();
          }, 100);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate('/auth');
      } else {
        fetchCreatorProfile();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchCreatorProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching creator profile:', error);
        return;
      }

      setCreator(data);
    } catch (error) {
      console.error('Error fetching creator profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: 'Signed out successfully',
        description: 'You have been logged out.',
      });
    } catch (error: any) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleCreatorCreated = (newCreator: Creator) => {
    setCreator(newCreator);
    toast({
      title: 'Creator profile created!',
      description: 'Your creator profile has been set up successfully.',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to CreatorStory
            </h1>
          </div>
          <CreatorOnboarding onCreatorCreated={handleCreatorCreated} />
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar onSignOut={handleSignOut} creator={creator} />
        <main className="flex-1 bg-gradient-to-br from-background via-background to-muted/20">
          <header className="border-b border-border/50 bg-background/95 backdrop-blur-md sticky top-0 z-40">
            <div className="flex items-center gap-4 px-6 py-4">
              <SidebarTrigger />
              <h2 className="text-lg font-semibold">Creator Dashboard</h2>
            </div>
          </header>
          <div className="p-6">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/revenue" element={<Revenue />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/stories/new" element={<StoryForm />} />
              <Route path="/stories/edit/:id" element={<StoryForm />} />
              <Route path="/stories/preview/:id" element={<div className="text-center py-12"><p className="text-muted-foreground">Story Preview - Coming Soon</p></div>} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<div className="text-center py-12"><p className="text-muted-foreground">Settings - Coming Soon</p></div>} />
            </Routes>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;