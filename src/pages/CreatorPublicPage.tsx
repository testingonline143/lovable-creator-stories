import { useParams, Link } from "react-router-dom";
import { creators } from "@/data/creators";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle, ExternalLink, MapPin, Calendar, Users, BookOpen, DollarSign, Star, Clock, Play } from "lucide-react";
import Header from "@/components/Header";

const CreatorPublicPage = () => {
  const { creatorId } = useParams();
  const creator = creators.find(c => c.id === creatorId);

  if (!creator) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Creator Not Found</h1>
          <Link to="/creators">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Creators
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock course data for the creator
  const featuredCourse = {
    title: "Complete Design Systems Masterclass",
    description: "Learn to build scalable design systems from scratch. 40+ hours of content, real-world projects, and lifetime access.",
    price: 299,
    students: 4521,
    hours: 42,
    level: "Intermediate",
    rating: 4.9,
    reviews: 827,
    thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138c1ac9?w=600&h=400&fit=crop",
    isBestseller: true
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Cover */}
      <div className="relative">
        <div 
          className="h-64 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop)`
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-3">
              <img 
                src={creator.image} 
                alt={creator.name}
                className="w-16 h-16 rounded-full border-4 border-white object-cover"
              />
              <div>
                <h1 className="text-white font-bold text-xl">{creator.name}</h1>
                <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                  {creator.badge}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Creator Info */}
        <div className="mb-6">
          <p className="text-foreground text-lg leading-relaxed mb-4">
            {creator.bio}
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {creator.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Joined {creator.yearStarted}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {creator.website && (
              <span className="text-sm text-primary">🌐 {creator.website}</span>
            )}
            {creator.twitter && (
              <span className="text-sm text-primary">🐦 {creator.twitter}</span>
            )}
          </div>

          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 flex-1">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact
            </Button>
            <Button variant="outline" className="flex-1">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Website
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="bg-card border-border shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-1">
                $847,000
              </div>
              <div className="text-muted-foreground text-sm">Total Revenue</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                $67,000
              </div>
              <div className="text-muted-foreground text-sm">Monthly Revenue</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-pink-500 mb-1">
                12,847
              </div>
              <div className="text-muted-foreground text-sm">Total Students</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-1">
                {creator.courses}
              </div>
              <div className="text-muted-foreground text-sm">Courses Created</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                <span className="text-3xl font-bold text-yellow-500">4.9</span>
              </div>
              <div className="text-muted-foreground text-sm">Average Rating</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-foreground mb-1">
                2,341
              </div>
              <div className="text-muted-foreground text-sm">Total Reviews</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-6 mb-6 border-b border-border">
          <button className="pb-3 font-medium text-foreground border-b-2 border-primary">
            Courses & Coaching
          </button>
          <button className="pb-3 font-medium text-muted-foreground">
            Journey
          </button>
          <button className="pb-3 font-medium text-muted-foreground">
            Revenue
          </button>
          <button className="pb-3 font-medium text-muted-foreground">
            Reviews
          </button>
        </div>

        {/* Courses Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">
              Courses & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Coaching Programs</span>
            </h2>
            <p className="text-muted-foreground">
              Comprehensive education designed to level up your design career
            </p>
          </div>

          {/* Featured Course */}
          <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={featuredCourse.thumbnail} 
                  alt={featuredCourse.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {featuredCourse.isBestseller && (
                  <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                    Bestseller
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black/20 rounded-t-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                    <Play className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{featuredCourse.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {featuredCourse.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {featuredCourse.students.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredCourse.hours} hours
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {featuredCourse.level}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{featuredCourse.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({featuredCourse.reviews} reviews)
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    ${featuredCourse.price}
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Enroll Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Additional Courses */}
          <div className="mt-6 grid gap-4">
            {creator.recentCourses.map((course) => (
              <Card key={course.id} className="bg-card border-border shadow-lg">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-16 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{course.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{course.students} students</span>
                        </div>
                        <span className="font-bold text-primary">${course.price}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorPublicPage;