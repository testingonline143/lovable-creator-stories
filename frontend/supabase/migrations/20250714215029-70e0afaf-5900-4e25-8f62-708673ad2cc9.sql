-- Create enum for story status
CREATE TYPE public.story_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'rejected', 'published');

-- Create enum for story categories
CREATE TYPE public.story_category AS ENUM ('course_creation', 'coaching', 'digital_products', 'saas', 'consulting', 'content_creation', 'ecommerce', 'other');

-- Create story_submissions table
CREATE TABLE public.story_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES public.creators(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subtitle TEXT,
  category story_category NOT NULL DEFAULT 'other',
  slug TEXT UNIQUE,
  featured_image_url TEXT,
  timeframe_start DATE,
  timeframe_end DATE,
  revenue_before INTEGER DEFAULT 0,
  revenue_after INTEGER DEFAULT 0,
  key_metrics JSONB DEFAULT '[]'::jsonb,
  tags TEXT[] DEFAULT '{}',
  status story_status NOT NULL DEFAULT 'draft',
  admin_notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create story_sections table for rich content
CREATE TABLE public.story_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES public.story_submissions(id) ON DELETE CASCADE,
  section_type TEXT NOT NULL CHECK (section_type IN ('heading', 'paragraph', 'quote', 'image', 'metrics', 'takeaway')),
  content TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create story_reviews table for admin workflow
CREATE TABLE public.story_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES public.story_submissions(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL CHECK (action IN ('submitted', 'approved', 'rejected', 'revision_requested')),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.story_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for story_submissions
CREATE POLICY "Users can view their own stories" 
ON public.story_submissions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own stories" 
ON public.story_submissions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own draft stories" 
ON public.story_submissions 
FOR UPDATE 
USING (auth.uid() = user_id AND status IN ('draft', 'rejected'));

CREATE POLICY "Published stories are viewable by everyone" 
ON public.story_submissions 
FOR SELECT 
USING (status = 'published');

-- RLS Policies for story_sections
CREATE POLICY "Users can manage sections of their own stories" 
ON public.story_sections 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.story_submissions 
  WHERE story_submissions.id = story_sections.story_id 
  AND story_submissions.user_id = auth.uid()
));

CREATE POLICY "Published story sections are viewable by everyone" 
ON public.story_sections 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.story_submissions 
  WHERE story_submissions.id = story_sections.story_id 
  AND story_submissions.status = 'published'
));

-- RLS Policies for story_reviews
CREATE POLICY "Users can view reviews of their own stories" 
ON public.story_reviews 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.story_submissions 
  WHERE story_submissions.id = story_reviews.story_id 
  AND story_submissions.user_id = auth.uid()
));

-- Create indexes for better performance
CREATE INDEX idx_story_submissions_user_id ON public.story_submissions(user_id);
CREATE INDEX idx_story_submissions_status ON public.story_submissions(status);
CREATE INDEX idx_story_submissions_category ON public.story_submissions(category);
CREATE INDEX idx_story_submissions_published_at ON public.story_submissions(published_at);
CREATE INDEX idx_story_sections_story_id ON public.story_sections(story_id);
CREATE INDEX idx_story_sections_sort_order ON public.story_sections(story_id, sort_order);
CREATE INDEX idx_story_reviews_story_id ON public.story_reviews(story_id);

-- Create function to update updated_at timestamp
CREATE TRIGGER update_story_submissions_updated_at
BEFORE UPDATE ON public.story_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_story_sections_updated_at
BEFORE UPDATE ON public.story_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-generate slug from title
CREATE OR REPLACE FUNCTION public.generate_story_slug()
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
  WHILE EXISTS (SELECT 1 FROM public.story_submissions WHERE slug = final_slug AND id != COALESCE(NEW.id, gen_random_uuid())) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;
  
  NEW.slug := final_slug;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER generate_story_slug_trigger
BEFORE INSERT OR UPDATE OF title ON public.story_submissions
FOR EACH ROW
EXECUTE FUNCTION public.generate_story_slug();