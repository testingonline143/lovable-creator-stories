import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, TrendingUp, ArrowRight, Star, Sparkles, Zap } from "lucide-react";
import { creators } from "@/data/creators";
import Header from "@/components/Header";

const Index = () => {
  const stats = {
    creators: 12486,
    revenue: 2400000,
    courses: 3247
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 animate-pulse" style={{ background: 'var(--gradient-primary)' }}></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5 animate-pulse delay-1000" style={{ background: 'var(--gradient-primary)' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 animate-pulse delay-500" style={{ background: 'var(--gradient-primary)' }}></div>
      </div>
      
      {/* Hero Section */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto text-center">
          {/* Floating Badges */}
          <div className="flex justify-center gap-4 mb-12 animate-fade-in">
            <Badge className="backdrop-blur-sm border border-primary/20 text-sm px-4 py-2 shadow-lg" style={{ background: 'var(--gradient-primary)' }}>
              <Sparkles className="w-3 h-3 mr-1" />
              Product of the day
            </Badge>
            <Badge className="backdrop-blur-sm border border-primary/20 text-sm px-4 py-2 shadow-lg" style={{ background: 'var(--gradient-primary)' }}>
              <Zap className="w-3 h-3 mr-1" />
              #1 Creator Platform
            </Badge>
          </div>
          
          {/* Main Headline */}
          <div className="animate-fade-in delay-200">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Connect with<br />
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                  top creators
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl -z-10"></div>
              </span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className="animate-fade-in delay-300">
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the most transparent creator platform. Discover courses, coaching programs, and real revenue stories 
              from successful creators who share their journey openly.
            </p>
          </div>
          
          {/* URL Preview */}
          <div className="animate-fade-in delay-400">
            <div className="inline-flex items-center gap-2 mb-12 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 shadow-lg">
              <span className="text-muted-foreground">creatorstory.com/</span>
              <span className="text-foreground font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">yourname</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="animate-fade-in delay-500">
            <Button 
              size="lg" 
              className="relative group text-lg px-10 py-4 shadow-xl transition-all duration-300 hover:scale-105"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: 'var(--shadow-glow)' }}></div>
              <span className="relative flex items-center">
                Start Your Creator Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
          
          {/* Floating Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto animate-fade-in delay-700">
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stats.creators.toLocaleString()}</div>
              <div className="text-muted-foreground">Active Creators</div>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-500 mb-2">${(stats.revenue / 1000000).toFixed(1)}M+</div>
              <div className="text-muted-foreground">Revenue Generated</div>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-blue-500 mb-2">{stats.courses.toLocaleString()}</div>
              <div className="text-muted-foreground">Courses Available</div>
            </div>
          </div>
          
          {/* Social Proof */}
          <div className="mt-16 flex items-center justify-center gap-6 animate-fade-in delay-900">
            <div className="flex -space-x-3">
              {creators.slice(0, 5).map((creator) => (
                <div key={creator.id} className="relative">
                  <img 
                    src={creator.image} 
                    alt={creator.name}
                    className="w-12 h-12 rounded-full border-3 border-background shadow-lg hover:scale-110 transition-transform cursor-pointer"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">4.9/5</span>
              </div>
              <p className="font-semibold text-foreground">Trusted by 12K+ creators</p>
              <p className="text-sm text-muted-foreground">Join the community today</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet our <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">top creators</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real creators sharing real revenue numbers and authentic growth stories
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {creators.map((creator, index) => (
              <Link key={creator.id} to={`/creator/${creator.id}`} className="group">
                <Card className="relative bg-card/50 backdrop-blur-sm border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ background: 'var(--gradient-primary)' }}></div>
                  
                  <CardContent className="relative p-8 text-center">
                    {/* Profile Image with Glow Effect */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: 'var(--shadow-glow)' }}></div>
                      <img 
                        src={creator.image} 
                        alt={creator.name}
                        className="relative w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/50 transition-colors duration-300"
                      />
                      {/* Online Status */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-card animate-pulse"></div>
                    </div>
                    
                    {/* Badge */}
                    <Badge className="mb-4 px-3 py-1 text-xs font-medium backdrop-blur-sm border border-primary/30" style={{ background: 'var(--gradient-primary)' }}>
                      {creator.badge}
                    </Badge>
                    
                    {/* Creator Info */}
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">{creator.name}</h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{creator.title}</p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background/50 rounded-lg p-3 border border-border/30">
                        <div className="text-2xl font-bold text-blue-500">{creator.courses}</div>
                        <div className="text-xs text-muted-foreground">Courses</div>
                      </div>
                      <div className="bg-background/50 rounded-lg p-3 border border-border/30">
                        <div className="text-2xl font-bold text-green-500">${creator.monthlyRevenue / 1000}K</div>
                        <div className="text-xs text-muted-foreground">Monthly</div>
                      </div>
                    </div>
                    
                    {/* Hover Arrow */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-12 animate-fade-in delay-500">
            <Link to="/creators">
              <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary text-lg px-8 py-3 backdrop-blur-sm">
                View All Creators
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-background via-muted/5 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success stories that <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">inspire</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real revenue numbers, authentic struggles, and breakthrough moments from creators like you
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                id: "sarah-chen-design-systems",
                timeframe: "8 months",
                title: "From $0 to $50K/month teaching design systems",
                preview: "Started my journey at Google where I worked on Gmail's redesign. After seeing the impact of good design on millions of users...",
                creator: creators[0],
                revenue: "$50K/mo",
                growth: "+2400%"
              },
              {
                id: "marcus-rivera-coaching-empire", 
                timeframe: "24 months",
                title: "How I built a 7-figure coaching business in 2 years",
                preview: "After three years at McKinsey, I was earning $200K+ and working with Fortune 500 CEOs, but I felt disconnected...",
                creator: creators[1],
                revenue: "$83K/mo",
                growth: "+1200%"
              },
              {
                id: "elena-volkov-marketing-mastery",
                timeframe: "1 year", 
                title: "The marketing course that changed everything",
                preview: "After 8 years as a freelance digital marketer, I was stuck at $4K monthly revenue. I was trading time for money...",
                creator: creators[2],
                revenue: "$35K/mo",
                growth: "+875%"
              }
            ].map((story, index) => (
              <Link key={story.id} to={`/story/${story.id}`} className="group">
                <Card className="relative bg-card/50 backdrop-blur-sm border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: 'var(--gradient-primary)' }}></div>
                  
                  <CardContent className="relative p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <Badge className="bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1">
                        {story.timeframe}
                      </Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-500">{story.revenue}</div>
                        <div className="text-xs text-green-400">{story.growth} growth</div>
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-xl mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                      {story.title}
                    </h3>
                    
                    {/* Preview */}
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                      {story.preview}
                    </p>
                    
                    {/* Creator Info */}
                    <div className="flex items-center gap-3">
                      <img 
                        src={story.creator.image} 
                        alt={story.creator.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
                      />
                      <div>
                        <div className="text-sm font-semibold">by {story.creator.name}</div>
                        <div className="text-xs text-muted-foreground">{story.creator.title}</div>
                      </div>
                    </div>
                    
                    {/* Read More Arrow */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {/* View All Stories Button */}
          <div className="text-center mt-12 animate-fade-in delay-500">
            <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary text-lg px-8 py-3 backdrop-blur-sm">
              Read All Success Stories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ background: 'var(--gradient-primary)' }}></div>
        <div className="relative container mx-auto text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Ready to share your story?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Join thousands of creators who are building transparent, authentic businesses and inspiring others with their journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-4 shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-white border-white/30 hover:bg-white/10 text-lg px-8 py-4"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
