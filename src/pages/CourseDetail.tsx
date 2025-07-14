import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  Play, 
  Heart, 
  ShoppingCart, 
  ArrowLeft,
  CheckCircle,
  Target,
  Award,
  Calendar,
  Globe,
  Download,
  Share2,
  MoreHorizontal
} from "lucide-react";
import Header from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CourseDetails {
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
  prerequisites: string[];
  learning_outcomes: string[];
  total_students: number;
  average_rating: number;
  total_reviews: number;
  is_featured: boolean;
  launch_date: string | null;
  course_url: string | null;
  platform: string | null;
  creator: {
    id: string;
    name: string;
    title: string;
    avatar_url: string | null;
    badge_text: string;
    bio: string;
  };
}

interface Review {
  id: string;
  rating: number;
  title: string | null;
  review_text: string | null;
  is_verified: boolean;
  helpful_votes: number;
  created_at: string;
  user: {
    name: string;
    avatar_url: string | null;
  };
}

const CourseDetail = () => {
  const { courseSlug } = useParams();
  const [course, setCourse] = useState<CourseDetails | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (courseSlug) {
      fetchCourse();
      fetchReviews();
      checkEnrollmentStatus();
      checkWishlistStatus();
    }
  }, [courseSlug]);

  const fetchCourse = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          creators!inner(id, name, title, avatar_url, badge_text, bio)
        `)
        .eq('slug', courseSlug)
        .eq('status', 'published')
        .single();

      if (error) throw error;

      const courseData: CourseDetails = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        short_description: data.short_description || '',
        slug: data.slug,
        cover_image_url: data.cover_image_url,
        trailer_video_url: data.trailer_video_url,
        price: parseFloat(data.price.toString()),
        original_price: data.original_price ? parseFloat(data.original_price.toString()) : null,
        currency: data.currency,
        difficulty: data.difficulty,
        duration_hours: data.duration_hours || 0,
        total_lessons: data.total_lessons || 0,
        language: data.language,
        category: data.category,
        tags: Array.isArray(data.tags) ? data.tags : [],
        prerequisites: Array.isArray(data.prerequisites) ? data.prerequisites : [],
        learning_outcomes: Array.isArray(data.learning_outcomes) ? data.learning_outcomes : [],
        total_students: data.total_students || 0,
        average_rating: parseFloat(data.average_rating.toString()) || 0,
        total_reviews: data.total_reviews || 0,
        is_featured: data.is_featured || false,
        launch_date: data.launch_date,
        course_url: data.course_url,
        platform: data.platform,
        creator: {
          id: data.creators.id,
          name: data.creators.name,
          title: data.creators.title || '',
          avatar_url: data.creators.avatar_url,
          badge_text: data.creators.badge_text || 'Creator',
          bio: data.creators.bio || '',
        },
      };

      setCourse(courseData);
    } catch (error) {
      console.error('Error fetching course:', error);
      toast({
        title: "Error",
        description: "Failed to load course details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      if (!course?.id) return;
      
      const { data, error } = await supabase
        .from('course_reviews')
        .select('*')
        .eq('course_id', course.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const reviewsData: Review[] = (data || []).map(item => ({
        id: item.id,
        rating: item.rating,
        title: item.title,
        review_text: item.review_text,
        is_verified: item.is_verified,
        helpful_votes: item.helpful_votes,
        created_at: item.created_at,
        user: {
          name: 'Anonymous User',
          avatar_url: null,
        },
      }));

      setReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const checkEnrollmentStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !course) return;

      const { data, error } = await supabase
        .from('course_enrollments')
        .select('id')
        .eq('course_id', course.id)
        .eq('user_id', user.id)
        .single();

      if (!error && data) {
        setIsEnrolled(true);
      }
    } catch (error) {
      console.error('Error checking enrollment:', error);
    }
  };

  const checkWishlistStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !course) return;

      const { data, error } = await supabase
        .from('course_wishlist')
        .select('id')
        .eq('course_id', course.id)
        .eq('user_id', user.id)
        .single();

      if (!error && data) {
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error('Error checking wishlist:', error);
    }
  };

  const handleEnroll = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to enroll in courses",
          variant: "destructive",
        });
        return;
      }

      if (!course) return;

      const { error } = await supabase
        .from('course_enrollments')
        .insert({
          course_id: course.id,
          user_id: user.id,
        });

      if (error) throw error;

      setIsEnrolled(true);
      toast({
        title: "Enrolled successfully!",
        description: "You're now enrolled in this course",
      });

      // Redirect to course URL if available
      if (course.course_url) {
        window.open(course.course_url, '_blank');
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      toast({
        title: "Enrollment failed",
        description: "Failed to enroll in course",
        variant: "destructive",
      });
    }
  };

  const toggleWishlist = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to manage your wishlist",
          variant: "destructive",
        });
        return;
      }

      if (!course) return;

      if (isInWishlist) {
        const { error } = await supabase
          .from('course_wishlist')
          .delete()
          .eq('course_id', course.id)
          .eq('user_id', user.id);

        if (error) throw error;
        setIsInWishlist(false);
        toast({
          title: "Removed from wishlist",
          description: "Course removed from your wishlist",
        });
      } else {
        const { error } = await supabase
          .from('course_wishlist')
          .insert({
            course_id: course.id,
            user_id: user.id,
          });

        if (error) throw error;
        setIsInWishlist(true);
        toast({
          title: "Added to wishlist",
          description: "Course added to your wishlist",
        });
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive",
      });
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
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-muted rounded mb-6"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
              <div>
                <div className="h-96 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link to="/courses">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/courses">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                  {course.difficulty}
                </Badge>
                <Badge variant="outline">{course.category}</Badge>
                {course.is_featured && (
                  <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{course.short_description}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={course.creator.avatar_url || ''} alt={course.creator.name} />
                    <AvatarFallback>
                      {course.creator.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Link to={`/creator/${course.creator.id}`} className="font-semibold hover:text-primary">
                      {course.creator.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{course.creator.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {renderStars(course.average_rating)}
                  <span className="text-sm text-muted-foreground ml-2">
                    {course.average_rating.toFixed(1)} ({course.total_reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{formatDuration(course.duration_hours)}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{course.total_lessons}</div>
                  <div className="text-sm text-muted-foreground">Lessons</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{course.total_students.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Globe className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-semibold">{course.language}</div>
                  <div className="text-sm text-muted-foreground">Language</div>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {course.description.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {course.prerequisites.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Prerequisites</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.prerequisites.map((prerequisite, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{prerequisite}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="outcomes">
                <Card>
                  <CardHeader>
                    <CardTitle>What You'll Learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.learning_outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {reviews.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                            <div className="flex items-start gap-4">
                              <Avatar>
                                <AvatarImage src={review.user.avatar_url || ''} alt={review.user.name} />
                                <AvatarFallback>
                                  {review.user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-semibold">{review.user.name}</span>
                                  {review.is_verified && (
                                    <Badge variant="outline" className="text-xs">
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-2 mb-2">
                                  {renderStars(review.rating)}
                                  <span className="text-sm text-muted-foreground">
                                    {new Date(review.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                {review.title && (
                                  <h4 className="font-semibold mb-2">{review.title}</h4>
                                )}
                                {review.review_text && (
                                  <p className="text-muted-foreground">{review.review_text}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No reviews yet. Be the first to review this course!</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor">
                <Card>
                  <CardHeader>
                    <CardTitle>About the Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-6">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={course.creator.avatar_url || ''} alt={course.creator.name} />
                        <AvatarFallback className="text-2xl">
                          {course.creator.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{course.creator.name}</h3>
                        <p className="text-muted-foreground mb-4">{course.creator.title}</p>
                        <p className="mb-4">{course.creator.bio}</p>
                        <Link to={`/creator/${course.creator.id}`}>
                          <Button variant="outline">View Profile</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Video Preview */}
            <Card>
              <div className="relative">
                {course.cover_image_url ? (
                  <img
                    src={course.cover_image_url}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center rounded-t-lg">
                    <BookOpen className="h-16 w-16 text-primary" />
                  </div>
                )}
                
                {course.trailer_video_url && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors">
                      <Play className="h-8 w-8 ml-1" />
                    </button>
                  </div>
                )}
              </div>
            </Card>

            {/* Pricing Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  {course.original_price && course.original_price > course.price && (
                    <div className="text-lg text-muted-foreground line-through mb-1">
                      {formatPrice(course.original_price, course.currency)}
                    </div>
                  )}
                  <div className="text-3xl font-bold text-primary">
                    {formatPrice(course.price, course.currency)}
                  </div>
                  {course.original_price && course.original_price > course.price && (
                    <div className="text-sm text-green-600 font-semibold">
                      Save {Math.round(((course.original_price - course.price) / course.original_price) * 100)}%
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {isEnrolled ? (
                    <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-green-700 font-semibold">You're enrolled!</p>
                      {course.course_url && (
                        <Button className="w-full mt-3" asChild>
                          <a href={course.course_url} target="_blank" rel="noopener noreferrer">
                            Access Course
                          </a>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <>
                      <Button className="w-full" size="lg" onClick={handleEnroll}>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Enroll Now
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={toggleWishlist}
                      >
                        <Heart className={`mr-2 h-4 w-4 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
                        {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      </Button>
                    </>
                  )}

                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Course
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-semibold mb-3">This course includes:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Lifetime access
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {course.total_lessons} lessons
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {formatDuration(course.duration_hours)} of content
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Mobile access
                    </li>
                  </ul>
                </div>

                {course.tags.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-semibold mb-3">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;