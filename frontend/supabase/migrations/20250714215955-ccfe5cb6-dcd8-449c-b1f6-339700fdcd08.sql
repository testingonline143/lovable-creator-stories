-- Add search performance indexes for the enhanced search functionality

-- Full-text search indexes for creators
CREATE INDEX IF NOT EXISTS idx_creators_search_name ON public.creators USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_creators_search_title ON public.creators USING gin(to_tsvector('english', coalesce(title, '')));
CREATE INDEX IF NOT EXISTS idx_creators_search_bio ON public.creators USING gin(to_tsvector('english', coalesce(bio, '')));

-- Composite indexes for filtering
CREATE INDEX IF NOT EXISTS idx_creators_revenue_students ON public.creators(monthly_revenue, total_students);
CREATE INDEX IF NOT EXISTS idx_creators_courses_year ON public.creators(total_courses, year_started);
CREATE INDEX IF NOT EXISTS idx_creators_public_revenue ON public.creators(is_public, monthly_revenue) WHERE is_public = true;

-- Full-text search indexes for story submissions
CREATE INDEX IF NOT EXISTS idx_story_submissions_search_title ON public.story_submissions USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_story_submissions_search_subtitle ON public.story_submissions USING gin(to_tsvector('english', coalesce(subtitle, '')));

-- Array indexes for tags
CREATE INDEX IF NOT EXISTS idx_story_submissions_tags ON public.story_submissions USING gin(tags);

-- Composite indexes for story filtering
CREATE INDEX IF NOT EXISTS idx_story_submissions_status_category ON public.story_submissions(status, category);
CREATE INDEX IF NOT EXISTS idx_story_submissions_revenue_published ON public.story_submissions(revenue_after, published_at) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_story_submissions_published_status ON public.story_submissions(published_at, status) WHERE status = 'published';