import { useState, useEffect } from "react";
import { Plus, FileText, Eye, Edit, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface StorySubmission {
  id: string;
  title: string;
  subtitle: string | null;
  category: string;
  status: string;
  revenue_before: number;
  revenue_after: number;
  created_at: string;
  updated_at: string;
  submitted_at: string | null;
  published_at: string | null;
}

const Stories = () => {
  const [stories, setStories] = useState<StorySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('story_submissions')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
      toast({
        title: "Error",
        description: "Failed to load your stories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
      submitted: { label: "Submitted", className: "bg-yellow-100 text-yellow-800" },
      under_review: { label: "Under Review", className: "bg-blue-100 text-blue-800" },
      approved: { label: "Approved", className: "bg-green-100 text-green-800" },
      rejected: { label: "Rejected", className: "bg-red-100 text-red-800" },
      published: { label: "Published", className: "bg-emerald-100 text-emerald-800" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatRevenue = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Your Stories</h1>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-muted rounded w-16"></div>
                  <div className="h-6 bg-muted rounded w-20"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Your Stories</h1>
          <p className="text-muted-foreground mt-1">
            Share your journey and inspire other creators
          </p>
        </div>
        <Button onClick={() => navigate('/dashboard/stories/new')} className="gap-2">
          <Plus className="h-4 w-4" />
          Create New Story
        </Button>
      </div>

      {stories.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No stories yet</h3>
            <p className="text-muted-foreground mb-4">
              Start sharing your creator journey by writing your first success story.
            </p>
            <Button onClick={() => navigate('/dashboard/stories/new')} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Story
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {stories.map((story) => (
            <Card key={story.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{story.title}</CardTitle>
                    {story.subtitle && (
                      <p className="text-sm text-muted-foreground">{story.subtitle}</p>
                    )}
                  </div>
                  {getStatusBadge(story.status)}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Updated {formatDate(story.updated_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {formatRevenue(story.revenue_before)} → {formatRevenue(story.revenue_after)}
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {story.category.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="flex gap-2">
                  {story.status === 'published' ? (
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      View Published
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => navigate(`/dashboard/stories/edit/${story.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                      {story.status === 'draft' ? 'Continue Editing' : 'View Details'}
                    </Button>
                  )}
                  
                  {story.status === 'draft' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => navigate(`/dashboard/stories/preview/${story.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stories;