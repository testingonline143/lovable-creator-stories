import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { LogOut, Settings, Eye, ExternalLink } from 'lucide-react';
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
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
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
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
          
          <CreatorOnboarding onCreatorCreated={handleCreatorCreated} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Creator Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {creator.name}
            </p>
          </div>
          <div className="flex gap-2">
            {creator.is_public && (
              <Button
                variant="outline"
                onClick={() => navigate(`/creator/${creator.slug}`)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Public Page
              </Button>
            )}
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Profile Overview
              </CardTitle>
              <CardDescription>
                Manage your creator profile and public page settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {creator.name}</p>
                    <p><strong>Title:</strong> {creator.title || 'Not set'}</p>
                    <p><strong>Location:</strong> {creator.location || 'Not set'}</p>
                    <p><strong>Website:</strong> {creator.website || 'Not set'}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Profile Status</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Public Status:</strong>{' '}
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        creator.is_public 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {creator.is_public ? 'Live' : 'Draft'}
                      </span>
                    </p>
                    <p><strong>Slug:</strong> {creator.slug || 'Not set'}</p>
                    {creator.is_public && (
                      <p>
                        <strong>Public URL:</strong>{' '}
                        <a 
                          href={`/creator/${creator.slug}`}
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          /creator/{creator.slug}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {creator.bio && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Bio</h3>
                  <p className="text-sm text-muted-foreground">{creator.bio}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your creator profile and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" disabled>
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile (Coming Soon)
                </Button>
                <Button variant="outline" disabled>
                  Add Success Story (Coming Soon)
                </Button>
                <Button variant="outline" disabled>
                  Analytics (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;