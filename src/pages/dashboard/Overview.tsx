import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Eye, 
  TrendingUp, 
  DollarSign, 
  BookOpen, 
  FileText, 
  Users, 
  Star,
  PlusCircle,
  ArrowRight,
  Calendar,
  Target
} from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  title: string;
  bio: string;
  is_public: boolean;
  slug: string;
  created_at: string;
}

const Overview = () => {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCreatorData();
  }, []);

  const fetchCreatorData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
        return;
      }

      setCreator(data);
    } catch (error) {
      console.error('Error fetching creator data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoLive = async () => {
    if (!creator) return;

    try {
      const { error } = await supabase
        .from('creators')
        .update({ is_public: true })
        .eq('id', creator.id);

      if (error) throw error;

      setCreator(prev => prev ? { ...prev, is_public: true } : null);
      toast({
        title: 'Profile is now live!',
        description: 'Your creator profile is now visible to the public.',
      });
    } catch (error: any) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">Creator profile not found</p>
        <Link to="/dashboard/profile">
          <Button>Set Up Profile</Button>
        </Link>
      </div>
    );
  }

  const stats = [
    {
      title: 'Profile Views',
      value: '0',
      change: '+0%',
      icon: Eye,
      color: 'text-primary'
    },
    {
      title: 'Monthly Revenue',
      value: '$0',
      change: '+0%',
      icon: DollarSign,
      color: 'text-accent'
    },
    {
      title: 'Courses',
      value: '0',
      change: '+0%',
      icon: BookOpen,
      color: 'text-primary'
    },
    {
      title: 'Stories',
      value: '0',
      change: '+0%',
      icon: FileText,
      color: 'text-accent'
    }
  ];

  const quickActions = [
    {
      title: 'Add Your First Course',
      description: 'Showcase your course offerings to attract students',
      icon: BookOpen,
      action: 'Add Course',
      link: '/dashboard/courses/new',
      color: 'bg-primary/10 text-primary border-primary/20'
    },
    {
      title: 'Share Your Success Story',
      description: 'Write about your journey and inspire others',
      icon: Star,
      action: 'Add Story',
      link: '/dashboard/stories/new',
      color: 'bg-accent/10 text-accent border-accent/20'
    },
    {
      title: 'Update Revenue Data',
      description: 'Keep your earnings transparent and up-to-date',
      icon: TrendingUp,
      action: 'Update Revenue',
      link: '/dashboard/revenue',
      color: 'bg-secondary/50 text-accent border-secondary'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {creator.name}!</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your creator profile
          </p>
        </div>
        <div className="flex gap-2">
          {creator.is_public ? (
            <Link to={`/creator/${creator.slug}`}>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                View Public Page
              </Button>
            </Link>
          ) : (
            <Button onClick={handleGoLive}>
              <Target className="mr-2 h-4 w-4" />
              Go Live
            </Button>
          )}
        </div>
      </div>

      {/* Profile Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Profile Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={creator.is_public ? 'default' : 'secondary'}>
                  {creator.is_public ? 'Live' : 'Draft'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Created {new Date(creator.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {creator.is_public 
                  ? `Your profile is live at /creator/${creator.slug}`
                  : 'Your profile is in draft mode. Complete your setup to go live!'
                }
              </p>
            </div>
            {!creator.is_public && (
              <Button onClick={handleGoLive} variant="outline">
                Go Live
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.change}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Get started with these essential steps to build your creator profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <div key={action.title} className={`p-4 rounded-lg border ${action.color}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <div>
                        <h3 className="font-semibold">{action.title}</h3>
                        <p className="text-sm opacity-80">{action.description}</p>
                      </div>
                    </div>
                    <Link to={action.link}>
                      <Button size="sm" variant="ghost">
                        {action.action}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No recent activity</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start by adding content to see your activity here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;