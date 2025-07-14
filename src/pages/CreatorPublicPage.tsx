import { useParams, Link } from "react-router-dom";
import { creators } from "@/data/creators";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageCircle, ExternalLink, MapPin, Calendar, Users, Star, Clock, Play, TrendingUp, DollarSign, Award } from "lucide-react";

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

      {/* Functional Tabs */}
      <div className="px-4">
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent border-b border-gray-800 rounded-none h-auto p-0 mb-8">
            <TabsTrigger 
              value="courses" 
              className="pb-4 pt-2 font-medium text-base border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:text-white text-gray-500 bg-transparent rounded-none hover:text-gray-300 transition-colors"
            >
              Courses & Coaching
            </TabsTrigger>
            <TabsTrigger 
              value="journey" 
              className="pb-4 pt-2 font-medium text-base border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:text-white text-gray-500 bg-transparent rounded-none hover:text-gray-300 transition-colors"
            >
              Journey
            </TabsTrigger>
            <TabsTrigger 
              value="revenue" 
              className="pb-4 pt-2 font-medium text-base border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:text-white text-gray-500 bg-transparent rounded-none hover:text-gray-300 transition-colors"
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="pb-4 pt-2 font-medium text-base border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:text-white text-gray-500 bg-transparent rounded-none hover:text-gray-300 transition-colors"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          {/* Courses & Coaching Content */}
          <TabsContent value="courses" className="mt-0">
            <div className="p-4 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Courses & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Coaching Programs</span>
                </h2>
                <p className="text-gray-400 text-sm">
                  Comprehensive education designed to level up your design career
                </p>
              </div>

              {/* Course Grid - Horizontal Layout */}
              <div className="overflow-x-auto">
                <div className="flex gap-4 pb-4">
                  {allCourses.map((course, index) => (
                    <div key={course.id} className="flex-shrink-0 w-80">
                      <Card className="bg-gray-900 border-gray-800 shadow-lg overflow-hidden h-full">
                        <div className="relative">
                          <img 
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-48 object-cover"
                          />
                          <Badge className={`absolute top-3 left-3 text-white text-xs font-medium ${
                            course.badge === 'Popular' ? 'bg-purple-600' : 
                            course.badge === 'New' ? 'bg-red-500' : 'bg-green-500'
                          }`}>
                            {course.badge.toLowerCase()}
                          </Badge>
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <Button size="sm" className="bg-white/90 text-black hover:bg-white h-12 w-12 rounded-full p-0">
                              <Play className="h-5 w-5 ml-0.5" />
                            </Button>
                          </div>
                        </div>
                        
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                            {course.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                            {course.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Journey Content */}
          <TabsContent value="journey" className="mt-0">
            <div className="p-4 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Journey</span>
                </h2>
                <p className="text-gray-400 text-sm">
                  From designer to educator - my path to success
                </p>
              </div>

              <div className="space-y-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">2024 - Present</div>
                        <h3 className="text-white font-semibold mb-2">Top Creator Status</h3>
                        <p className="text-gray-400 text-sm">Reached $800K+ in total revenue with 12,000+ students across 12 courses</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">2023</div>
                        <h3 className="text-white font-semibold mb-2">Design Systems Masterclass Launch</h3>
                        <p className="text-gray-400 text-sm">Launched my flagship course, reaching 4,500+ students in first year</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="text-sm text-gray-400 mb-1">2022</div>
                        <h3 className="text-white font-semibold mb-2">Started Teaching</h3>
                        <p className="text-gray-400 text-sm">Transitioned from full-time design to education, launching first UX course</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Revenue Content */}
          <TabsContent value="revenue" className="mt-0">
            <div className="p-4 space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Revenue <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Transparency</span>
                </h2>
                <p className="text-gray-400 text-sm">
                  Transparent look at my creator journey
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-400">32%</div>
                    <div className="text-xs text-gray-400">Growth Rate</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">$67K</div>
                    <div className="text-xs text-gray-400">Monthly Average</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-3">Revenue Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Course Sales</span>
                      <span className="text-white font-medium">$620,000 (73%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">1:1 Coaching</span>
                      <span className="text-white font-medium">$152,000 (18%)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Workshops</span>
                      <span className="text-white font-medium">$75,000 (9%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reviews Content */}
          <TabsContent value="reviews" className="mt-0">
            <div className="p-4 space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Student <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Reviews</span>
                </h2>
                <p className="text-gray-400 text-sm">
                  What my students are saying
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-3xl font-bold text-yellow-400">4.9</span>
                  </div>
                  <div className="text-xs text-gray-400">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">2,341</div>
                  <div className="text-xs text-gray-400">Total Reviews</div>
                </div>
              </div>

              <div className="space-y-4">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108755-2616b15a5b26?w=40&h=40&fit=crop&crop=face" 
                        alt="Student" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium text-sm">Emily Rodriguez</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                          "Sarah's design systems course completely transformed how I approach design. The practical examples and real-world projects made all the difference."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                        alt="Student" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium text-sm">Michael Chen</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                          "Best investment I've made in my career. The UX research fundamentals helped me land my dream job at a tech company."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <img 
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" 
                        alt="Student" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium text-sm">Sarah Kim</span>
                          <div className="flex gap-1">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="h-3 w-3 text-gray-600" />
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                          "Great content and well-structured lessons. Sarah explains complex concepts in a way that's easy to understand and apply."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorPublicPage;