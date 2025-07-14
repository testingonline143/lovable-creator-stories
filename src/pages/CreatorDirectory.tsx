import { useState } from "react";
import { Link } from "react-router-dom";
import { creators } from "@/data/creators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Users, BookOpen, DollarSign, MapPin } from "lucide-react";
import Header from "@/components/Header";

const CreatorDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Design", "Business", "Marketing", "Development"];

  const filteredCreators = creators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || 
                           creator.specialty.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Discover <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Creators</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse {creators.length} successful creators sharing their knowledge and revenue stories
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search creators, specialties, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredCreators.length} of {creators.length} creators
          </p>
        </div>

        {/* Creator Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <Link key={creator.id} to={`/creator/${creator.id}`}>
              <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={creator.image} 
                      alt={creator.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{creator.name}</h3>
                      <p className="text-muted-foreground text-sm">{creator.specialty}</p>
                      <Badge className="mt-1 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs">
                        {creator.badge}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {creator.bio}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center gap-1 text-primary">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="font-semibold">{creator.courses}</div>
                      <div className="text-xs text-muted-foreground">Courses</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-green-500">
                        <DollarSign className="h-4 w-4" />
                      </div>
                      <div className="font-semibold">${creator.monthlyRevenue / 1000}K</div>
                      <div className="text-xs text-muted-foreground">Monthly</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center gap-1 text-blue-500">
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="font-semibold">{(creator.totalStudents / 1000).toFixed(1)}K</div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 mr-1" />
                    {creator.location}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCreators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No creators found matching your criteria.</p>
            <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDirectory;