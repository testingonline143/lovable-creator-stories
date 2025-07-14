import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, TrendingUp, ArrowRight, Star } from "lucide-react";
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
            <Badge className="text-sm px-4 py-2" style={{ background: 'var(--gradient-primary)' }}>
              Product of the day
            </Badge>
            <Badge className="text-sm px-4 py-2" style={{ background: 'var(--gradient-primary)' }}>
              #1 Creator Platform
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Connect with<br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              top creators
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Build your own creator page, showcase inspiring case studies, and connect with an audience that values 
            transparency. Join successful creators who share real revenue numbers and authentic growth stories.
          </p>
          
          <div className="inline-flex items-center gap-2 mb-8 bg-card border border-border rounded-full px-6 py-3">
            <span className="text-muted-foreground">creatorstory.com/</span>
            <span className="text-foreground font-semibold">yourname</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/auth">
              <Button 
                size="lg" 
                className="text-lg px-10 py-4"
                style={{ background: 'var(--gradient-primary)' }}
              >
                Create Your Creator Page
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="outline"
              size="lg" 
              className="text-lg px-8 py-4 border-primary/30 hover:border-primary backdrop-blur-sm"
            >
              View Success Stories
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-primary mb-2">{stats.creators.toLocaleString()}</div>
              <div className="text-muted-foreground">Active Creators</div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-500 mb-2">${(stats.revenue / 1000000).toFixed(1)}M+</div>
              <div className="text-muted-foreground">Revenue Generated</div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-500 mb-2">{stats.courses.toLocaleString()}</div>
              <div className="text-muted-foreground">Courses Available</div>
            </div>
          </div>
          
          {/* Social Proof */}
          <div className="mt-16 flex items-center justify-center gap-6">
            <div className="flex -space-x-2">
              {creators.slice(0, 4).map((creator) => (
                <img 
                  key={creator.id}
                  src={creator.image} 
                  alt={creator.name}
                  className="w-10 h-10 rounded-full border-2 border-background"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">4.9/5</span>
              </div>
              <p className="font-semibold">Trusted by 12K+ creators</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Platform Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-muted/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The most <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">transparent</span> creator platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              CreatorStory is where successful creators share their real numbers, proven strategies, and authentic journeys. 
              No fake gurus, no hidden secrets - just transparent business building that actually works.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Benefit 1 */}
            <div className="text-center p-8 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Your Personal Creator Page</h3>
              <p className="text-muted-foreground">
                Build a stunning profile that showcases your courses, revenue milestones, and success story. 
                Stand out with transparency that converts visitors into loyal students.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center p-8 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Real Revenue Transparency</h3>
              <p className="text-muted-foreground">
                Share your actual earnings and growth metrics. Build trust through transparency and inspire 
                others with your authentic journey from zero to success.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center p-8 bg-card border border-border rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-500/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4">Inspiring Case Studies</h3>
              <p className="text-muted-foreground">
                Access detailed breakdowns of how successful creators built their businesses. Get the exact 
                strategies, timelines, and tactics that led to their breakthrough moments.
              </p>
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-center mb-12">How CreatorStory Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">1</div>
                <h4 className="text-lg font-semibold mb-2">Create Your Page</h4>
                <p className="text-muted-foreground">Set up your creator profile with your story, courses, and revenue milestones</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">2</div>
                <h4 className="text-lg font-semibold mb-2">Share Transparently</h4>
                <p className="text-muted-foreground">Update your real numbers and share authentic insights about your journey</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">3</div>
                <h4 className="text-lg font-semibold mb-2">Inspire & Grow</h4>
                <p className="text-muted-foreground">Build trust, attract students, and scale your creator business through transparency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Creators Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get inspired by <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">creator pages</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how successful creators showcase their journey with custom pages featuring real revenue data, 
              course offerings, and transparent growth metrics that convert visitors into students
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
              These case studies show exactly how creators built their businesses, overcame challenges, and scaled 
              to life-changing revenue. Get the blueprint for your own success story.
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
              Create your personalized creator page, share your success story, and inspire others while building 
              your business. Start with our proven templates and case study examples.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-4 shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
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
