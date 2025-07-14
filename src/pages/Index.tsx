import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, TrendingUp, ArrowRight } from "lucide-react";
import { creators } from "@/data/creators";
import Header from "@/components/Header";

const Index = () => {
  const stats = {
    creators: 12486,
    revenue: 2400000,
    courses: 3247
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center gap-4 mb-8">
            <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              Product of the day
            </Badge>
            <Badge className="bg-gradient-to-r from-accent to-primary text-primary-foreground">
              #1 Creator Platform
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Showcase and <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">grow</span> your<br />
            creator business
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get a Creator Story page to showcase your courses, coaching programs, and revenue journey. 
            Stand out from the crowd with transparent success stories.
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-muted-foreground">creatorstory.com/</span>
            <span className="text-foreground font-medium">yourname</span>
          </div>
          
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8 py-3">
            Claim my Creator Page
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-12 text-center">
            <div>
              <div className="flex items-center gap-1 text-primary">
                <Users className="h-4 w-4" />
                <span className="font-semibold">{stats.creators.toLocaleString()} Creators</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-green-500">
                <TrendingUp className="h-4 w-4" />
                <span className="font-semibold">${(stats.revenue / 1000000).toFixed(1)}M+ Revenue Shared</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 text-blue-500">
                <BookOpen className="h-4 w-4" />
                <span className="font-semibold">{stats.courses.toLocaleString()} Courses</span>
              </div>
            </div>
          </div>
          
          {/* Testimonial */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="flex -space-x-2">
              {creators.slice(0, 3).map((creator) => (
                <img 
                  key={creator.id}
                  src={creator.image} 
                  alt={creator.name}
                  className="w-10 h-10 rounded-full border-2 border-background"
                />
              ))}
            </div>
            <div className="text-left">
              <p className="font-medium">This is a game changer</p>
              <p className="text-sm text-muted-foreground">@SarahChenUX</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Creators Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet our top <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">creators</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Real creators sharing their real revenue and growth stories
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creators.map((creator) => (
              <Link key={creator.id} to={`/creator/${creator.id}`}>
                <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <img 
                      src={creator.image} 
                      alt={creator.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <Badge className="mb-3 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                      {creator.badge}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-1">{creator.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{creator.title}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">{creator.courses}</span>
                        <span className="text-sm text-muted-foreground">courses</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-green-500">${creator.monthlyRevenue / 1000}K/mo</span>
                        <span className="text-sm text-muted-foreground">monthly</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success stories that inspire
            </h2>
            <p className="text-xl text-muted-foreground">
              Real revenue numbers, real struggles, real breakthroughs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: "sarah-chen-design-systems",
                timeframe: "8 months",
                title: "From $0 to $50K/month teaching design systems",
                preview: "Started my journey at Google where I worked on Gmail's redesign. After seeing the impact of good design on millions of users...",
                creator: creators[0]
              },
              {
                id: "marcus-rivera-coaching-empire", 
                timeframe: "24 months",
                title: "How I built a 7-figure coaching business in 2 years",
                preview: "After three years at McKinsey, I was earning $200K+ and working with Fortune 500 CEOs, but I felt disconnected...",
                creator: creators[1]
              },
              {
                id: "elena-volkov-marketing-mastery",
                timeframe: "1 year", 
                title: "The marketing course that changed everything",
                preview: "After 8 years as a freelance digital marketer, I was stuck at $4K monthly revenue. I was trading time for money...",
                creator: creators[2]
              }
            ].map((story) => (
              <Link key={story.id} to={`/story/${story.id}`}>
                <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                        {story.timeframe}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-3">
                      {story.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {story.preview}
                    </p>
                    <div className="flex items-center gap-2">
                      <img 
                        src={story.creator.image} 
                        alt={story.creator.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium">by {story.creator.name}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
