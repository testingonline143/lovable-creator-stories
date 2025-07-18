import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, BookOpen, Play, Heart, ShoppingCart, DollarSign, TrendingUp, Award } from "lucide-react";
import Header from "@/components/Header";
import SearchAndFilter from "@/components/SearchAndFilter";
import { useSearchAndFilter } from "@/hooks/useSearchAndFilter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: string;
  title: string;
  description: string;
  short_description: string;
  slug: string;
  cover_image_url: string | null;
  trailer_video_url: string | null;
  price: number;
  original_price: number | null;
  currency: string;
  difficulty: string;
  duration_hours: number;
  total_lessons: number;
  language: string;
  category: string;
  tags: string[];
  total_students: number;
  average_rating: number;
  total_reviews: number;
  is_featured: boolean;
  launch_date: string | null;
  created_at: string;
  creator: {
    id: string;
    name: string;
    avatar_url: string | null;
    badge_text: string;
  };
}

const CoursesCatalog = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Transform courses to match the Creator interface for the search hook
  const searchableCourses = courses.map(course => ({
    id: course.id,
    name: course.title,
    title: course.short_description || course.description || '',
    bio: course.description || '',
    avatar_url: course.cover_image_url,
    location: course.language,
    monthly_revenue: course.price * course.total_students,
    total_students: course.total_students,
    total_courses: course.total_lessons,
    year_started: course.launch_date ? new Date(course.launch_date).getFullYear() : new Date().getFullYear(),
    badge_text: course.difficulty,
    created_at: course.created_at,
    category: course.category,
    tags: course.tags,
  }));

  const {
    filters,
    setFilters,
    clearFilters,
    filteredCreators: filteredCourses,
    filterOptions,
    resultsCount,
    totalCount,
  } = useSearchAndFilter(searchableCourses);

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          creators!inner(id, name, avatar_url, badge_text)
        `)
        .eq('status', 'published')
        .order('is_featured', { ascending: false })
        .order('average_rating', { ascending: false })
        .order('total_students', { ascending: false });

      if (error) throw error;

      const transformedCourses: Course[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        short_description: item.short_description || '',
        slug: item.slug,
        cover_image_url: item.cover_image_url,
        trailer_video_url: item.trailer_video_url,
        price: parseFloat(item.price.toString()),
        original_price: item.original_price ? parseFloat(item.original_price.toString()) : null,
        currency: item.currency,
        difficulty: item.difficulty,
        duration_hours: item.duration_hours || 0,
        total_lessons: item.total_lessons || 0,
        language: item.language,
        category: item.category,
        tags: Array.isArray(item.tags) ? item.tags : [],
        total_students: item.total_students || 0,
        average_rating: parseFloat(item.average_rating.toString()) || 0,
        total_reviews: item.total_reviews || 0,
        is_featured: item.is_featured || false,
        launch_date: item.launch_date,
        created_at: item.created_at,
        creator: {
          id: item.creators.id,
          name: item.creators.name,
          avatar_url: item.creators.avatar_url,
          badge_text: item.creators.badge_text || 'Creator',
        },
      }));

      setCourses(transformedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Error",
        description: "Failed to load courses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('course_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const formatPrice = (price: number, currency: string = 'USD') => {
    if (price === 0) return 'Free';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatRating = (rating: number) => {
    return rating > 0 ? rating.toFixed(1) : 'No rating';
  };

  const formatDuration = (hours: number) => {
    if (hours === 0) return 'Self-paced';
    if (hours < 1) return `${Math.round(hours * 60)} min`;
    return `${hours}h`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < fullStars
                ? 'fill-yellow-400 text-yellow-400'
                : i === fullStars && hasHalfStar
                ? 'fill-yellow-200 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Course Catalog</h1>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-12 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Map filtered courses back to original courses
  const actualFilteredCourses = courses.filter(course => 
    filteredCourses.some(filtered => filtered.id === course.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Course <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Catalog</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover {totalCount} high-quality courses from expert creators
          </p>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-semibold">{totalCount}</span>
            </div>
            <p className="text-sm text-muted-foreground">Total Courses</p>
          </Card>
          <Card className="text-center p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="font-semibold">{courses.reduce((sum, c) => sum + c.total_students, 0).toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground">Students Enrolled</p>
          </Card>
          <Card className="text-center p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">
                {courses.length > 0 ? (courses.reduce((sum, c) => sum + c.average_rating, 0) / courses.length).toFixed(1) : '0.0'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </Card>
          <Card className="text-center p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="font-semibold">{courses.filter(c => c.is_featured).length}</span>
            </div>
            <p className="text-sm text-muted-foreground">Featured Courses</p>
          </Card>
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

        {/* Featured Courses */}
        {actualFilteredCourses.some(c => c.is_featured) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Featured Courses</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {actualFilteredCourses.filter(c => c.is_featured).slice(0, 3).map((course) => (
                <Card key={`featured-${course.id}`} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-primary/20">
                  <div className="relative">
                    {course.cover_image_url ? (
                      <img
                        src={course.cover_image_url}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-primary" />
                      </div>
                    )}
                    
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-primary to-accent text-white border-none">
                        Featured
                      </Badge>
                    </div>

                    <div className="absolute top-4 right-4">
                      <button className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>

                    {course.trailer_video_url && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-12 h-12 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors">
                          <Play className="h-6 w-6 ml-1" />
                        </button>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                        {course.difficulty}
                      </Badge>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>

                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {course.short_description || course.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDuration(course.duration_hours)}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {course.total_lessons} lessons
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {course.creator.avatar_url ? (
                          <img
                            src={course.creator.avatar_url}
                            alt={course.creator.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-semibold">
                            {course.creator.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <span className="text-sm font-medium">{course.creator.name}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {renderStars(course.average_rating)}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({course.total_reviews})
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {course.original_price && course.original_price > course.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(course.original_price, course.currency)}
                          </span>
                        )}
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(course.price, course.currency)}
                        </span>
                      </div>

                      <Link to={`/course/${course.slug}`}>
                        <Button className="gap-2">
                          <ShoppingCart className="h-4 w-4" />
                          View Course
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Courses Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">All Courses</h2>
          {actualFilteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {actualFilteredCourses.map((course) => (
                <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    {course.cover_image_url ? (
                      <img
                        src={course.cover_image_url}
                        alt={course.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-primary" />
                      </div>
                    )}
                    
                    <div className="absolute top-3 left-3">
                      <Badge variant="outline" className="bg-black/50 text-white border-none text-xs">
                        {course.category}
                      </Badge>
                    </div>

                    <div className="absolute top-3 right-3">
                      <button className="w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                        <Heart className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Badge variant="outline" className={`text-xs ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </Badge>
                      {course.is_featured && (
                        <Badge className="text-xs bg-gradient-to-r from-primary to-accent text-white">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDuration(course.duration_hours)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {course.total_students}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(course.average_rating)}
                      <span className="text-xs text-muted-foreground">
                        {formatRating(course.average_rating)} ({course.total_reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        {course.original_price && course.original_price > course.price && (
                          <span className="text-xs text-muted-foreground line-through block">
                            {formatPrice(course.original_price, course.currency)}
                          </span>
                        )}
                        <span className="font-bold text-primary">
                          {formatPrice(course.price, course.currency)}
                        </span>
                      </div>

                      <Link to={`/course/${course.slug}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">
                No courses match your current search criteria.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Course Categories */}
        {categories.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <Card key={category.id} className="text-center p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${category.color}20` }}>
                    <span className="text-2xl" style={{ color: category.color }}>
                      📚
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {courses.filter(c => c.category === category.name).length} courses
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesCatalog;