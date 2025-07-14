import { useParams, Link } from "react-router-dom";
import { creators } from "@/data/creators";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle, ExternalLink, MapPin, Calendar, Users, BookOpen, DollarSign, Star, Clock, Play } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Cover Image */}
      <div className="relative h-screen max-h-[600px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop)`
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={creator.image} 
              alt={creator.name}
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">Sarah Chen</span>
              <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs px-2 py-1">
                Top Creator
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-6 space-y-6">
        {/* Creator Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white">Sarah Chen</h1>
          <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground mb-4">
            Top Creator
          </Badge>
          
          <p className="text-gray-300 leading-relaxed mb-4">
            UX Designer turned educator. Helping designers build systematic thinking and 
            create better user experiences through comprehensive design systems.
          </p>
          
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              San Francisco, CA
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Joined January 2022
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-300 mb-6">
            <span>🌐 sarahchen.design</span>
            <span>🐦 @sarahchenux</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 flex-1">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact
            </Button>
            <Button variant="outline" className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Website
            </Button>
          </div>
        </div>

        {/* Revenue Stats Row */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                $847,000
              </div>
              <div className="text-gray-400 text-sm">Total Revenue</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                $67,000
              </div>
              <div className="text-gray-400 text-sm">Monthly Revenue</div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">
                12,847
              </div>
              <div className="text-gray-400 text-sm">Total Students</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                12
              </div>
              <div className="text-gray-400 text-sm">Courses Created</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                <span className="text-3xl font-bold text-yellow-400">4.9</span>
              </div>
              <div className="text-gray-400 text-sm">Average Rating</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-white mb-2">
                2,341
              </div>
              <div className="text-gray-400 text-sm">Total Reviews</div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-6 border-b border-gray-800 -mx-6 px-6">
          <button className="pb-3 font-medium text-white border-b-2 border-primary">
            Courses & Coaching
          </button>
          <button className="pb-3 font-medium text-gray-400">
            Journey
          </button>
          <button className="pb-3 font-medium text-gray-400">
            Revenue
          </button>
          <button className="pb-3 font-medium text-gray-400">
            Reviews
          </button>
        </div>

        {/* Courses Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Courses & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Coaching Programs</span>
            </h2>
            <p className="text-gray-400">
              Comprehensive education designed to level up your design career
            </p>
          </div>

          {/* Featured Course Card */}
          <Card className="bg-gray-900 border-gray-800 shadow-lg overflow-hidden">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558655146-9f40138c1ac9?w=600&h=250&fit=crop"
                alt="Complete Design Systems Masterclass"
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                Bestseller
              </Badge>
              <div className="absolute top-3 right-3">
                <Button size="sm" className="bg-black/50 backdrop-blur-sm text-white border-white/30 hover:bg-black/70">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-white mb-3">
                Complete Design Systems Masterclass
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Learn to build scalable design systems from scratch. 40+ hours of content, real-world projects, and lifetime access.
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  4,521
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  42 hours
                </div>
                <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                  Intermediate
                </Badge>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-yellow-400">4.9</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    (827 reviews)
                  </span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  $299
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                Enroll Now
              </Button>
            </CardContent>
          </Card>

          {/* Additional Course Cards */}
          <div className="space-y-4">
            {creator.recentCourses.map((course) => (
              <Card key={course.id} className="bg-gray-900 border-gray-800 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-16 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{course.title}</h4>
                      <p className="text-sm text-gray-400 mb-2">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-gray-300">{course.rating}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">{course.students} students</span>
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