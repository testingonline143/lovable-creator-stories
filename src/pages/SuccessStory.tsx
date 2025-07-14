import { useParams, Link } from "react-router-dom";
import { successStories } from "@/data/stories";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, TrendingUp, Users, BookOpen, Target, DollarSign, Award, Share2, Heart } from "lucide-react";
import Header from "@/components/Header";

const SuccessStory = () => {
  const { storyId } = useParams();
  const story = successStories.find(s => s.id === storyId);

  if (!story) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Story Not Found</h1>
          <Link to="/stories">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Stories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getIcon = (iconName: string) => {
    const icons = {
      TrendingUp,
      Users,
      BookOpen,
      Target,
      DollarSign,
      Award
    };
    return icons[iconName as keyof typeof icons] || TrendingUp;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Story Header */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center gap-3 mb-4">
              <Badge variant="secondary">{story.category}</Badge>
              <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                {story.timeframe}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{story.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{story.subtitle}</p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {story.readTime} min read
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                ${story.revenue.before.toLocaleString()} → ${story.revenue.after.toLocaleString()}
              </div>
            </div>

            {/* Author Card */}
            <Card className="bg-card border-border shadow-lg mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={story.creatorImage} 
                    alt={story.creatorName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">{story.creatorName}</h3>
                    <p className="text-muted-foreground">Published on {new Date(story.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <Link to={`/creator/${story.creatorId}`}>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {story.metrics.map((metric) => {
              const IconComponent = getIcon(metric.icon);
              return (
                <Card key={metric.label} className="bg-card border-border shadow-lg">
                  <CardContent className="p-4 text-center">
                    <IconComponent className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold mb-1">{metric.value}</div>
                    <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
                    {metric.change && (
                      <div className="text-xs text-green-500">{metric.change}</div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Story Content */}
          <div className="prose prose-lg max-w-none mb-12">
            {story.content.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-foreground">{section.title}</h2>
                
                {section.content.split('\n\n').map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
                
                {section.image && (
                  <div className="my-8">
                    <img 
                      src={section.image} 
                      alt={section.title}
                      className="w-full rounded-lg shadow-lg"
                    />
                  </div>
                )}
                
                {section.quote && (
                  <Card className="bg-primary/5 border-l-4 border-l-primary my-8">
                    <CardContent className="p-6">
                      <blockquote className="text-lg italic text-foreground mb-2">
                        "{section.quote.text}"
                      </blockquote>
                      <cite className="text-sm text-muted-foreground">
                        — {section.quote.author}
                      </cite>
                    </CardContent>
                  </Card>
                )}
              </div>
            ))}
          </div>

          {/* Key Takeaways */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-border shadow-lg mb-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Key Takeaways</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {story.keyTakeaways.map((takeaway, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-foreground text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-foreground">{takeaway}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {story.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Related Stories CTA */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-border shadow-lg text-center">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Want to share your story?</h3>
              <p className="text-muted-foreground mb-6">
                Help inspire other creators by sharing your journey, challenges, and successes.
              </p>
              <div className="flex justify-center gap-4">
                <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Submit Your Story
                </Button>
                <Link to={`/creator/${story.creatorId}`}>
                  <Button variant="outline">
                    Follow {story.creatorName.split(' ')[0]}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SuccessStory;