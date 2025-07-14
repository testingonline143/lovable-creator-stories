import { useParams, Link } from "react-router-dom";
import { creators } from "@/data/creators";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle, ExternalLink, MapPin, Calendar, Users, Star, Clock, Play } from "lucide-react";

const CreatorPublicPage = () => {
  const { creatorId } = useParams();
  const creator = creators.find(c => c.id === creatorId);

  if (!creator) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
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

  const allCourses = [
    {
      id: "design-systems-masterclass",
      title: "Complete Design Systems Masterclass",
      description: "Learn to build scalable design systems from scratch. 40+ hours of content, real-world projects, and lifetime access.",
      price: 299,
      students: 4521,
      hours: 42,
      level: "Intermediate",
      rating: 4.9,
      reviews: 827,
      thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138c1ac9?w=400&h=250&fit=crop",
      badge: "Popular"
    },
    {
      id: "ux-research-fundamentals",
      title: "UX Research Fundamentals",
      description: "Master user research methods and turn insights into actionable design decisions.",
      price: 199,
      students: 3214,
      hours: 28,
      level: "Beginner",
      rating: 4.8,
      reviews: 542,
      thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
      badge: "Popular"
    },
    {
      id: "figma-prototyping",
      title: "Advanced Figma Prototyping",
      description: "Create interactive prototypes that wow stakeholders and validate design decisions.",
      price: 149,
      students: 2890,
      hours: 18,
      level: "Advanced",
      rating: 4.7,
      reviews: 431,
      thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=250&fit=crop",
      badge: "New"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="p-4">
        <Link to="/creators" className="flex items-center text-gray-400 text-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Creators
        </Link>
      </div>

      {/* Hero Section with Cover Image */}
      <div className="relative h-80">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop)`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={creator.image} 
              alt={creator.name}
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">Sarah Chen</span>
              <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs">
                Top Creator
              </Badge>
            </div>
          </div>
          
          <p className="text-gray-200 text-sm leading-relaxed mb-4">
            UX Designer turned educator. Helping designers build systematic thinking and 
            create better user experiences through comprehensive design systems.
          </p>
          
          <div className="flex items-center gap-4 text-xs text-gray-300 mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              San Francisco, CA
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Joined January 2022
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-300 mb-4">
            <span>🌐 sarahchen.design</span>
            <span>🐦 @sarahchenux</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-sm px-6">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-sm px-6">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Website
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Row - Horizontal Scroll */}
      <div className="p-4">
        <div className="flex gap-4 overflow-x-auto pb-2">
          <div className="text-center min-w-[100px] flex-shrink-0">
            <div className="text-2xl font-bold text-green-400">$847,000</div>
            <div className="text-xs text-gray-400">Total Revenue</div>
          </div>
          <div className="text-center min-w-[100px] flex-shrink-0">
            <div className="text-2xl font-bold text-primary">$67,000</div>
            <div className="text-xs text-gray-400">Monthly Revenue</div>
          </div>
          <div className="text-center min-w-[100px] flex-shrink-0">
            <div className="text-2xl font-bold text-pink-400">12,847</div>
            <div className="text-xs text-gray-400">Total Students</div>
          </div>
          <div className="text-center min-w-[100px] flex-shrink-0">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-gray-400">Courses Created</div>
          </div>
          <div className="text-center min-w-[100px] flex-shrink-0">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">4.9</span>
            </div>
            <div className="text-xs text-gray-400">Average Rating</div>
          </div>
          <div className="text-center min-w-[100px] flex-shrink-0">
            <div className="text-2xl font-bold text-white">2,341</div>
            <div className="text-xs text-gray-400">Total Reviews</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4">
        <div className="flex gap-6 border-b border-gray-800">
          <button className="pb-3 font-medium text-white border-b-2 border-primary text-sm">
            Courses & Coaching
          </button>
          <button className="pb-3 font-medium text-gray-400 text-sm">
            Journey
          </button>
          <button className="pb-3 font-medium text-gray-400 text-sm">
            Revenue
          </button>
          <button className="pb-3 font-medium text-gray-400 text-sm">
            Reviews
          </button>
        </div>
      </div>

      {/* Courses Section */}
      <div className="p-4 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Courses & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Coaching Programs</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Comprehensive education designed to level up your design career
          </p>
        </div>

        {/* Course Grid */}
        <div className="space-y-4">
          {allCourses.map((course, index) => (
            <Card key={course.id} className="bg-gray-900 border-gray-800 shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <Badge className={`absolute top-3 left-3 text-white text-xs ${
                  course.badge === 'Popular' ? 'bg-primary' : 
                  course.badge === 'New' ? 'bg-red-500' : 'bg-green-500'
                }`}>
                  {course.badge}
                </Badge>
                <div className="absolute top-3 right-3">
                  <Button size="sm" className="bg-black/50 backdrop-blur-sm text-white border-white/30 hover:bg-black/70 h-8 w-8 p-0">
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {course.students.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.hours} hours
                  </div>
                  <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300 px-2 py-0">
                    {course.level}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-yellow-400 text-sm">{course.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400">
                      ({course.reviews} reviews)
                    </span>
                  </div>
                  <div className="text-xl font-bold text-primary">
                    ${course.price}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorPublicPage;