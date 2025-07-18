import { useParams, Link } from "react-router-dom";
import { creators } from "@/data/creators";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Twitter, Linkedin, Users, BookOpen, DollarSign, Calendar, MapPin, Star } from "lucide-react";
import Header from "@/components/Header";

const CreatorProfile = () => {
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

        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <img 
                src={creator.image} 
                alt={creator.name}
                className="w-32 h-32 rounded-2xl object-cover shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">{creator.name}</h1>
                  <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                    {creator.badge}
                  </Badge>
                </div>
                <p className="text-xl text-muted-foreground mb-3">{creator.title}</p>
                <p className="text-foreground leading-relaxed mb-4">{creator.bio}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {creator.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Teaching since {creator.yearStarted}
                  </div>
                  {creator.website && (
                    <a href={`https://${creator.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary transition-colors">
                      <ExternalLink className="h-4 w-4" />
                      {creator.website}
                    </a>
                  )}
                </div>

                <div className="flex gap-3 mt-4">
                  {creator.twitter && (
                    <a href={`https://twitter.com/${creator.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  {creator.linkedin && (
                    <a href={`https://linkedin.com${creator.linkedin}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-4">
            <Card className="bg-card border-border shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Creator Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Monthly Revenue</span>
                    </div>
                    <span className="font-semibold">${creator.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span className="text-sm">Courses</span>
                    </div>
                    <span className="font-semibold">{creator.courses}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Total Students</span>
                    </div>
                    <span className="font-semibold">{creator.totalStudents.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card border-border shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Success Story</h2>
                <p className="text-foreground leading-relaxed">{creator.story}</p>
              </CardContent>
            </Card>

            {/* Recent Courses */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Popular Courses</h2>
              <div className="grid gap-6">
                {creator.recentCourses.map((course) => (
                  <Card key={course.id} className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-24 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg">{course.title}</h3>
                            <Badge variant="secondary">{course.category}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{course.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {course.students.toLocaleString()} students
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {course.rating}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              ${course.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card border-border shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Achievements</h3>
                <div className="space-y-2">
                  {creator.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-border shadow-lg">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-3">Want to connect?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Follow {creator.name.split(' ')[0]} for updates on new courses and insights.
                </p>
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                  Follow Creator
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;