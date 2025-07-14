import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, Users, BookOpen, Calendar, Eye, Heart, Share2 } from "lucide-react";
import Header from "@/components/Header";
import SearchAndFilter from "@/components/SearchAndFilter";
import { useSearchAndFilter } from "@/hooks/useSearchAndFilter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface StorySubmission {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  category: string;
  featured_image_url: string | null;
  revenue_before: number;
  revenue_after: number;
  timeframe_start: string | null;
  timeframe_end: string | null;
  tags: string[];
  published_at: string;
  created_at: string;
  user_id: string;
  // Creator info from join
  creator?: {
    name: string;
    avatar_url: string | null;
    location: string | null;
  };
}

const SuccessStories = () => {
  const [stories, setStories] = useState<StorySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Transform stories to match the Creator interface for the search hook
  const searchableStories = stories.map(story => ({
    id: story.id,
    name: story.title,
    title: story.subtitle || '',
    bio: story.subtitle || '',
    avatar_url: story.featured_image_url,
    location: story.creator?.location || null,
    monthly_revenue: story.revenue_after - story.revenue_before,
    total_students: 0, // Not applicable for stories
    total_courses: 0, // Not applicable for stories
    year_started: story.timeframe_start ? new Date(story.timeframe_start).getFullYear() : new Date().getFullYear(),
    badge_text: story.category,
    created_at: story.published_at || story.created_at,
    category: story.category,
    tags: story.tags,
  }));

  const {
    filters,
    setFilters,
    clearFilters,
    filteredCreators: filteredStories,
    filterOptions,
    resultsCount,
    totalCount,
  } = useSearchAndFilter(searchableStories);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('story_submissions')
        .select(`
          *,
          creators!inner(name, avatar_url, location)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;

      const transformedStories: StorySubmission[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        slug: item.slug,
        category: item.category,
        featured_image_url: item.featured_image_url,
        revenue_before: item.revenue_before || 0,
        revenue_after: item.revenue_after || 0,
        timeframe_start: item.timeframe_start,
        timeframe_end: item.timeframe_end,
        tags: Array.isArray(item.tags) ? item.tags : [],
        published_at: item.published_at,
        created_at: item.created_at,
        user_id: item.user_id,
        creator: {
          name: item.creators?.name || 'Anonymous',
          avatar_url: item.creators?.avatar_url,
          location: item.creators?.location,
        },
      }));

      setStories(transformedStories);
    } catch (error) {
      console.error('Error fetching stories:', error);
      toast({
        title: "Error",
        description: "Failed to load success stories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatRevenue = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount}`;
  };

  const getTimeframe = (start: string | null, end: string | null) => {
    if (!start || !end) return 'Ongoing';
    
    const startDate = new Date(start);
    const endDate = new Date(end);
    const months = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    if (months < 1) return '< 1 month';
    if (months < 12) return `${Math.round(months)} months`;
    return `${Math.round(months / 12)} years`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-16 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Map filtered stories back to original stories
  const actualFilteredStories = stories.filter(story => 
    filteredStories.some(filtered => filtered.id === story.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Success <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Stories</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Real stories from {totalCount} creators who built successful online businesses
          </p>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="mb-8">
          <SearchAndFilter
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
            resultsCount={resultsCount}
            totalCount={totalCount}
            availableCategories={filterOptions.categories}
            availableLocations={filterOptions.locations}
            availableTags={filterOptions.tags}
          />
        </div>

        {/* Featured Story */}
        {actualFilteredStories.length > 0 && (
          <Card className="mb-8 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                {actualFilteredStories[0].featured_image_url ? (
                  <img
                    src={actualFilteredStories[0].featured_image_url}
                    alt={actualFilteredStories[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-64 md:h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary" />
                  </div>
                )}
              </div>
              <div className="md:w-2/3 p-8">
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary">Featured</Badge>
                  <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                    {actualFilteredStories[0].category}
                  </Badge>
                </div>
                
                <h2 className="text-3xl font-bold mb-4">{actualFilteredStories[0].title}</h2>
                
                {actualFilteredStories[0].subtitle && (
                  <p className="text-lg text-muted-foreground mb-6">
                    {actualFilteredStories[0].subtitle}
                  </p>
                )}

                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {formatRevenue(actualFilteredStories[0].revenue_before)} → {formatRevenue(actualFilteredStories[0].revenue_after)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {getTimeframe(actualFilteredStories[0].timeframe_start, actualFilteredStories[0].timeframe_end)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {actualFilteredStories[0].creator?.avatar_url ? (
                      <img
                        src={actualFilteredStories[0].creator.avatar_url}
                        alt={actualFilteredStories[0].creator.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-sm font-semibold">
                        {actualFilteredStories[0].creator?.name.split(' ').map(n => n[0]).join('') || '?'}
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{actualFilteredStories[0].creator?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(actualFilteredStories[0].published_at || actualFilteredStories[0].created_at)}
                      </p>
                    </div>
                  </div>

                  <Link to={`/story/${actualFilteredStories[0].slug || actualFilteredStories[0].id}`}>
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      Read Story
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Stories Grid */}
        {actualFilteredStories.length > 1 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actualFilteredStories.slice(1).map((story) => (
              <Card key={story.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  {story.featured_image_url ? (
                    <img
                      src={story.featured_image_url}
                      alt={story.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-primary" />
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-black/50 text-white border-none">
                      {story.category}
                    </Badge>
                  </div>

                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {story.title}
                  </h3>
                  
                  {story.subtitle && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {story.subtitle}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {formatRevenue(story.revenue_before)} → {formatRevenue(story.revenue_after)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {getTimeframe(story.timeframe_start, story.timeframe_end)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {story.creator?.avatar_url ? (
                        <img
                          src={story.creator.avatar_url}
                          alt={story.creator.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-semibold">
                          {story.creator?.name.split(' ').map(n => n[0]).join('') || '?'}
                        </div>
                      )}
                      <span className="text-sm font-medium">{story.creator?.name}</span>
                    </div>

                    <Link to={`/story/${story.slug || story.id}`}>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        Read
                      </Button>
                    </Link>
                  </div>

                  {story.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-4">
                      {story.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {story.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{story.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : actualFilteredStories.length === 1 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">This is the only story matching your criteria</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters to see more stories.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No stories found</h3>
            <p className="text-muted-foreground mb-4">
              No stories match your current search criteria.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 border-border text-center">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Share Your Success Story</h3>
            <p className="text-muted-foreground mb-6">
              Inspire other creators by sharing your journey, challenges, and achievements.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/dashboard/stories/new">
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Submit Your Story
                </Button>
              </Link>
              <Link to="/creators">
                <Button variant="outline">
                  Browse Creators
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessStories;