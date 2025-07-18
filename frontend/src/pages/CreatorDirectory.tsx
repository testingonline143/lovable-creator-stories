import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, DollarSign, MapPin, Users, ExternalLink, Calendar } from "lucide-react";
import Header from "@/components/Header";
import SearchAndFilter from "@/components/SearchAndFilter";
import { useSearchAndFilter, Creator } from "@/hooks/useSearchAndFilter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CreatorDirectory = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const {
    filters,
    setFilters,
    clearFilters,
    filteredCreators,
    filterOptions,
    resultsCount,
    totalCount,
  } = useSearchAndFilter(creators);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match our Creator interface
      const transformedCreators: Creator[] = (data || []).map(creator => ({
        id: creator.id,
        name: creator.name,
        title: creator.title || '',
        bio: creator.bio || '',
        avatar_url: creator.avatar_url,
        location: creator.location,
        monthly_revenue: creator.monthly_revenue || 0,
        total_students: creator.total_students || 0,
        total_courses: creator.total_courses || 0,
        year_started: creator.year_started || new Date().getFullYear(),
        badge_text: creator.badge_text || 'Creator',
        created_at: creator.created_at,
        category: creator.title?.split(' ')[0] || 'Other', // Extract category from title
        tags: [], // We'll implement tags later when we have them in the schema
      }));

      setCreators(transformedCreators);
    } catch (error) {
      console.error('Error fetching creators:', error);
      toast({
        title: "Error",
        description: "Failed to load creators",
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

  const formatStudents = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getYearsInBusiness = (yearStarted: number) => {
    const currentYear = new Date().getFullYear();
    const years = currentYear - yearStarted;
    return years > 0 ? `${years} year${years !== 1 ? 's' : ''}` : 'New';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Discover <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Creators</span>
            </h1>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full"></div>
                    <div>
                      <div className="h-4 bg-muted rounded w-32 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-12 bg-muted rounded mb-4"></div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="text-center">
                        <div className="h-6 bg-muted rounded mb-1"></div>
                        <div className="h-4 bg-muted rounded"></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Discover <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Creators</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse {totalCount} successful creators sharing their knowledge and revenue stories
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

        {/* Creator Grid */}
        {filteredCreators.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map((creator) => (
              <Link key={creator.id} to={`/creator/${creator.id}`}>
                <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full group">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        {creator.avatar_url ? (
                          <img 
                            src={creator.avatar_url} 
                            alt={creator.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-lg">
                            {creator.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {creator.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">{creator.title}</p>
                        <Badge className="mt-1 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs">
                          {creator.badge_text}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {creator.bio}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 text-center mb-4">
                      <div>
                        <div className="flex items-center justify-center gap-1 text-primary mb-1">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div className="font-semibold">{creator.total_courses}</div>
                        <div className="text-xs text-muted-foreground">Courses</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                          <DollarSign className="h-4 w-4" />
                        </div>
                        <div className="font-semibold">{formatRevenue(creator.monthly_revenue)}</div>
                        <div className="text-xs text-muted-foreground">Monthly</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                          <Users className="h-4 w-4" />
                        </div>
                        <div className="font-semibold">{formatStudents(creator.total_students)}</div>
                        <div className="text-xs text-muted-foreground">Students</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs text-muted-foreground">
                      {creator.location && (
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {creator.location}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {getYearsInBusiness(creator.year_started)} in business
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">View Profile</span>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No creators found</h3>
              <p className="text-muted-foreground mb-4">
                No creators match your current search criteria.
              </p>
            </div>
            <Button variant="outline" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDirectory;