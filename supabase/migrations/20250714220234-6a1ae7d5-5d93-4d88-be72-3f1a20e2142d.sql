-- Create course management system

-- Create enum for course status
CREATE TYPE public.course_status AS ENUM ('draft', 'published', 'archived');

-- Create enum for course difficulty levels
CREATE TYPE public.course_difficulty AS ENUM ('beginner', 'intermediate', 'advanced');

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID NOT NULL REFERENCES public.creators(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  slug TEXT UNIQUE,
  cover_image_url TEXT,
  trailer_video_url TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  original_price DECIMAL(10,2),
  currency TEXT NOT NULL DEFAULT 'USD',
  status course_status NOT NULL DEFAULT 'draft',
  difficulty course_difficulty DEFAULT 'beginner',
  duration_hours INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  language TEXT DEFAULT 'en',
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  prerequisites TEXT[],
  learning_outcomes TEXT[],
  course_url TEXT,
  platform TEXT, -- 'teachable', 'thinkific', 'udemy', 'coursera', 'custom', etc.
  total_students INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  launch_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create course enrollments table
CREATE TABLE public.course_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  certificate_issued BOOLEAN DEFAULT false,
  UNIQUE(course_id, user_id)
);

-- Create course reviews table
CREATE TABLE public.course_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES public.course_enrollments(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  review_text TEXT,
  is_verified BOOLEAN DEFAULT false,
  helpful_votes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(course_id, user_id)
);

-- Create course categories table for better organization
CREATE TABLE public.course_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create course wishlist table
CREATE TABLE public.course_wishlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(course_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_wishlist ENABLE ROW LEVEL SECURITY;

-- RLS Policies for courses
CREATE POLICY "Published courses are viewable by everyone" 
ON public.courses 
FOR SELECT 
USING (status = 'published');

CREATE POLICY "Creators can view their own courses" 
ON public.courses 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.creators 
  WHERE creators.id = courses.creator_id 
  AND creators.user_id = auth.uid()
));

CREATE POLICY "Creators can manage their own courses" 
ON public.courses 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.creators 
  WHERE creators.id = courses.creator_id 
  AND creators.user_id = auth.uid()
));

-- RLS Policies for course enrollments
CREATE POLICY "Users can view their own enrollments" 
ON public.course_enrollments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can enroll in courses" 
ON public.course_enrollments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments" 
ON public.course_enrollments 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Course creators can view enrollments for their courses" 
ON public.course_enrollments 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.courses 
  JOIN public.creators ON courses.creator_id = creators.id
  WHERE courses.id = course_enrollments.course_id 
  AND creators.user_id = auth.uid()
));

-- RLS Policies for course reviews
CREATE POLICY "Reviews are viewable by everyone" 
ON public.course_reviews 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create reviews for courses they're enrolled in" 
ON public.course_reviews 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id 
  AND EXISTS (
    SELECT 1 FROM public.course_enrollments 
    WHERE course_enrollments.course_id = course_reviews.course_id 
    AND course_enrollments.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own reviews" 
ON public.course_reviews 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" 
ON public.course_reviews 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for course categories
CREATE POLICY "Course categories are viewable by everyone" 
ON public.course_categories 
FOR SELECT 
USING (is_active = true);

-- RLS Policies for course wishlist
CREATE POLICY "Users can manage their own wishlist" 
ON public.course_wishlist 
FOR ALL 
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_courses_creator_id ON public.courses(creator_id);
CREATE INDEX idx_courses_status ON public.courses(status);
CREATE INDEX idx_courses_category ON public.courses(category);
CREATE INDEX idx_courses_featured ON public.courses(is_featured) WHERE is_featured = true;
CREATE INDEX idx_courses_rating ON public.courses(average_rating DESC);
CREATE INDEX idx_courses_students ON public.courses(total_students DESC);
CREATE INDEX idx_courses_search_title ON public.courses USING gin(to_tsvector('english', title));
CREATE INDEX idx_courses_search_description ON public.courses USING gin(to_tsvector('english', coalesce(description, '')));
CREATE INDEX idx_courses_tags ON public.courses USING gin(tags);

CREATE INDEX idx_course_enrollments_user_id ON public.course_enrollments(user_id);
CREATE INDEX idx_course_enrollments_course_id ON public.course_enrollments(course_id);
CREATE INDEX idx_course_enrollments_completed ON public.course_enrollments(completed_at);

CREATE INDEX idx_course_reviews_course_id ON public.course_reviews(course_id);
CREATE INDEX idx_course_reviews_rating ON public.course_reviews(rating);
CREATE INDEX idx_course_reviews_created_at ON public.course_reviews(created_at DESC);

CREATE INDEX idx_course_wishlist_user_id ON public.course_wishlist(user_id);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_course_reviews_updated_at
BEFORE UPDATE ON public.course_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-generate course slug
CREATE OR REPLACE FUNCTION public.generate_course_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Generate base slug from title
  base_slug := lower(regexp_replace(NEW.title, '[^a-zA-Z0-9\s]', '', 'g'));
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  base_slug := trim(both '-' from base_slug);
  
  -- Ensure uniqueness
  final_slug := base_slug;
  WHILE EXISTS (SELECT 1 FROM public.courses WHERE slug = final_slug AND id != COALESCE(NEW.id, gen_random_uuid())) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_course_slug_trigger
BEFORE INSERT OR UPDATE OF title ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.generate_course_slug();

-- Function to update course statistics when reviews are added/updated/deleted
CREATE OR REPLACE FUNCTION public.update_course_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update average rating and total reviews for the course
  UPDATE public.courses 
  SET 
    average_rating = COALESCE((
      SELECT ROUND(AVG(rating)::numeric, 2) 
      FROM public.course_reviews 
      WHERE course_id = COALESCE(NEW.course_id, OLD.course_id)
    ), 0),
    total_reviews = (
      SELECT COUNT(*) 
      FROM public.course_reviews 
      WHERE course_id = COALESCE(NEW.course_id, OLD.course_id)
    )
  WHERE id = COALESCE(NEW.course_id, OLD.course_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_course_stats_on_review_change
AFTER INSERT OR UPDATE OR DELETE ON public.course_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_course_stats();

-- Function to update course student count when enrollments change
CREATE OR REPLACE FUNCTION public.update_course_student_count()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total students count for the course
  UPDATE public.courses 
  SET total_students = (
    SELECT COUNT(*) 
    FROM public.course_enrollments 
    WHERE course_id = COALESCE(NEW.course_id, OLD.course_id)
  )
  WHERE id = COALESCE(NEW.course_id, OLD.course_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_course_student_count_trigger
AFTER INSERT OR DELETE ON public.course_enrollments
FOR EACH ROW
EXECUTE FUNCTION public.update_course_student_count();

-- Insert some default course categories
INSERT INTO public.course_categories (name, slug, description, icon, color, sort_order) VALUES
('Web Development', 'web-development', 'Frontend and backend web development courses', 'Code', '#3B82F6', 1),
('Mobile Development', 'mobile-development', 'iOS, Android, and cross-platform mobile development', 'Smartphone', '#10B981', 2),
('Data Science', 'data-science', 'Data analysis, machine learning, and AI courses', 'BarChart3', '#8B5CF6', 3),
('Design', 'design', 'UI/UX design, graphic design, and visual arts', 'Palette', '#F59E0B', 4),
('Business', 'business', 'Entrepreneurship, marketing, and business strategy', 'TrendingUp', '#EF4444', 5),
('Marketing', 'marketing', 'Digital marketing, SEO, and social media', 'Megaphone', '#EC4899', 6),
('Photography', 'photography', 'Photography techniques and post-processing', 'Camera', '#6B7280', 7),
('Music', 'music', 'Music production, theory, and instrument lessons', 'Music', '#84CC16', 8),
('Fitness', 'fitness', 'Workout routines, nutrition, and wellness', 'Dumbbell', '#F97316', 9),
('Language Learning', 'language-learning', 'Learn new languages and improve communication', 'Languages', '#06B6D4', 10);