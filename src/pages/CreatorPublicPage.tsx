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
            <div className="p-4 space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Courses & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Coaching Programs</span>
                </h2>
                <p className="text-gray-400 text-base">
                  Comprehensive education designed to level up your design career
                </p>
              </div>

              {/* Course Grid - Horizontal Layout */}
              <div className="overflow-x-auto">
                <div className="flex gap-6 pb-4">
                  {allCourses.map((course, index) => (
                    <div key={course.id} className="flex-shrink-0 w-96">
                      <Card className="bg-gray-900 border-gray-800 shadow-lg overflow-hidden h-full">
                        <div className="relative">
                          <img 
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-48 object-cover"
                          />
                          <Badge className={`absolute top-4 left-4 text-white text-xs font-medium px-3 py-1 ${
                            course.badge === 'Popular' ? 'bg-purple-600' : 
                            course.badge === 'New' ? 'bg-red-500' : 'bg-green-500'
                          }`}>
                            {course.badge.toLowerCase()}
                          </Badge>
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white h-14 w-14 rounded-full p-0">
                              <Play className="h-6 w-6 ml-0.5" />
                            </Button>
                          </div>
                        </div>
                        
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-purple-400 mb-4 leading-tight">
                            {course.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            {course.description}
                          </p>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              <span>{course.students.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{course.hours} hours</span>
                            </div>
                            <Badge variant="secondary" className="text-xs bg-gray-800 text-gray-300 px-3 py-1">
                              {course.level}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold text-yellow-400 text-base">{course.rating}</span>
                              </div>
                              <span className="text-sm text-gray-400">
                                ({course.reviews} reviews)
                              </span>
                            </div>
                            <div className="text-2xl font-bold text-purple-400">
                              ${course.price}
                            </div>
                          </div>
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
            <div className="p-4 space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  The <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Journey</span>
                </h2>
                <p className="text-gray-400 text-base">
                  From zero to $847,000 - the complete story
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">Started Teaching Online</h3>
                            <div className="text-sm text-gray-400">January 2022</div>
                          </div>
                          <div className="text-2xl font-bold text-green-400">$0/mo</div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Left my senior UX role at Uber to focus on education full-time
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Play className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">First Course Launch</h3>
                            <div className="text-sm text-gray-400">March 2022</div>
                          </div>
                          <div className="text-2xl font-bold text-green-400">$15,000/mo</div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Design Systems Masterclass - sold 100 copies in first week
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">Hit $10K/month</h3>
                            <div className="text-sm text-gray-400">August 2022</div>
                          </div>
                          <div className="text-2xl font-bold text-green-400">$12,000/mo</div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Consistent growth through word-of-mouth and social media
                        </p>
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
            <div className="p-4 space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Student <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Testimonials</span>
                </h2>
                <p className="text-gray-400 text-base">
                  What students are saying about their transformation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <CardContent className="p-0">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                      "Sarah's design systems course completely transformed how I approach my work. The methodical breakdown of complex concepts is unmatched."
                    </p>
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108755-2616b15a5b26?w=50&h=50&fit=crop&crop=face" 
                        alt="Alex Thompson" 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-semibold text-sm">Alex Thompson</div>
                        <div className="text-gray-400 text-sm">Senior Product Designer at Stripe</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800 p-6">
                  <CardContent className="p-0">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                      "The practical examples and real-world applications made this course incredibly valuable. Best investment I've made in my career."
                    </p>
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" 
                        alt="Maria Rodriguez" 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-semibold text-sm">Maria Rodriguez</div>
                        <div className="text-gray-400 text-sm">UX Designer at Airbnb</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800 p-6">
                  <CardContent className="p-0">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                      "Sarah's teaching style is exceptional. She breaks down complex design principles into digestible, actionable steps."
                    </p>
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" 
                        alt="David Kim" 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-semibold text-sm">David Kim</div>
                        <div className="text-gray-400 text-sm">Product Designer at Google</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800 p-6">
                  <CardContent className="p-0">
                    <div className="flex gap-1 mb-4">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="h-5 w-5 text-gray-600" />
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
                      "Great content and comprehensive curriculum. The course helped me transition from visual design to UX strategy."
                    </p>
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face" 
                        alt="James Wilson" 
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-white font-semibold text-sm">James Wilson</div>
                        <div className="text-gray-400 text-sm">Design Lead at Spotify</div>
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