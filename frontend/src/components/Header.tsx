import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">CS</span>
          </div>
          <span className="text-xl font-bold">CreatorStory</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/creators" className="text-muted-foreground hover:text-foreground transition-colors">
            Creators
          </Link>
          <Link to="/stories" className="text-muted-foreground hover:text-foreground transition-colors">
            Success Stories
          </Link>
          <Link to="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
            Courses
          </Link>
        </nav>

        <Link to="/auth">
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
            Sign In
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;