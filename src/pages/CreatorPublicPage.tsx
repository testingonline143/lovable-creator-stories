import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageCircle, ExternalLink, MapPin, Calendar, Users, Star, TrendingUp, DollarSign, Award } from "lucide-react";

interface Creator {
  id: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  website: string;
  avatar_url: string;
  cover_image_url: string;
  monthly_revenue: number;
  total_students: number;
  total_courses: number;
  year_started: number;
  badge_text: string;
  twitter_handle: string;
  linkedin_url: string;
  achievements: string[];
}

const CreatorPublicPage = () => {
  const { creatorId } = useParams();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      if (!creatorId) return;
      
      try {
        const { data, error } = await supabase
          .from('creators')
          .select('*')
          .eq('slug', creatorId)
          .eq('is_public', true)
          .single();

        if (error) {
          console.error('Error fetching creator:', error);
          return;
        }

        setCreator(data);
      } catch (error) {
        console.error('Error fetching creator:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreator();
  }, [creatorId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Creator Not Found</h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="p-4">
        <Link to="/" className="flex items-center text-gray-400 text-sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section with Cover Image */}
      <div className="relative h-80">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: creator.cover_image_url 
              ? `url(${creator.cover_image_url})` 
              : `url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop)`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-3 mb-3">
            <img 
              src={creator.avatar_url || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face"} 
              alt={creator.name}
              className="w-12 h-12 rounded-full border-2 border-white object-cover"
            />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{creator.name}</span>
              <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs">
                {creator.badge_text}
              </Badge>
            </div>
          </div>
          
          <p className="text-gray-200 text-sm leading-relaxed mb-4">
            {creator.bio}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-gray-300 mb-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {creator.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Teaching since {creator.year_started}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-300 mb-4">
            {creator.website && <span>🌐 {creator.website}</span>}
            {creator.twitter_handle && <span>🐦 {creator.twitter_handle}</span>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-sm px-6">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact
            </Button>
            {creator.website && (
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 text-sm px-6">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Website
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Row - Horizontal Scroll */}
      <div className="p-4">
        <div className="flex gap-4 overflow-x-auto pb-2">
          <div className="text-center min-w-[100px] flex-shrink-0">
            <div className="text-2xl font-bold text-green-400">${(creator.monthly_revenue * 12).toLocaleString()}</div>
            <div className="text-xs text-gray-400">Total Revenue</div>
          </div>
          <div className="text-center min-w-[100px] flex-shrink-0">
            <div className="text-2xl font-bold text-primary">${creator.monthly_revenue.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Monthly Revenue</div>
          </div>
          <div className="text-center min-w-[100px] flex-shrink-0">
            <div className="text-2xl font-bold text-pink-400">{creator.total_students.toLocaleString()}</div>
            <div className="text-xs text-gray-400">Total Students</div>
          </div>
          <div className="text-center min-w-[100px] flex-shrink-0">
            <div className="text-2xl font-bold text-white">{creator.total_courses}</div>
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
        <Tabs defaultValue="journey" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-transparent border-b border-gray-800 rounded-none h-auto p-0 mb-8">
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
              value="achievements" 
              className="pb-4 pt-2 font-medium text-base border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:text-white text-gray-500 bg-transparent rounded-none hover:text-gray-300 transition-colors"
            >
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Journey Content */}
          <TabsContent value="journey" className="mt-0">
            <div className="p-4 space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  The <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Journey</span>
                </h2>
                <p className="text-gray-400 text-base">
                  From zero to ${creator.monthly_revenue.toLocaleString()}/month - the complete story
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
                            <div className="text-sm text-gray-400">{creator.year_started}</div>
                          </div>
                          <div className="text-2xl font-bold text-green-400">$0/mo</div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Started my journey as an educator and content creator
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">Current Status</h3>
                            <div className="text-sm text-gray-400">Today</div>
                          </div>
                          <div className="text-2xl font-bold text-green-400">${creator.monthly_revenue.toLocaleString()}/mo</div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Reached {creator.total_students.toLocaleString()} students across {creator.total_courses} courses
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
                    <div className="text-2xl font-bold text-green-400">${creator.monthly_revenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Monthly Revenue</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-primary">${(creator.monthly_revenue * 12).toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Annual Revenue</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-3">Creator Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Total Students</span>
                      <span className="text-white font-medium">{creator.total_students.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Total Courses</span>
                      <span className="text-white font-medium">{creator.total_courses}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Years Teaching</span>
                      <span className="text-white font-medium">{new Date().getFullYear() - creator.year_started}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Content */}
          <TabsContent value="achievements" className="mt-0">
            <div className="p-4 space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Achievements</span>
                </h2>
                <p className="text-gray-400 text-base">
                  Key milestones and accomplishments
                </p>
              </div>

              <div className="space-y-4">
                {creator.achievements && creator.achievements.length > 0 ? (
                  creator.achievements.map((achievement, index) => (
                    <Card key={index} className="bg-gray-900 border-gray-800">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                            <Award className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-white">{achievement}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6 text-center">
                      <p className="text-gray-400">No achievements added yet.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CreatorPublicPage;