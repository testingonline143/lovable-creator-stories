-- Create analytics tables for tracking page views and link clicks

-- Page views table to track all page visits
CREATE TABLE public.page_views (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_type TEXT NOT NULL, -- 'creator', 'course', 'story', 'directory', 'home'
  resource_id UUID, -- creator_id, course_id, story_id (null for general pages)
  user_agent TEXT,
  referrer TEXT,
  ip_hash TEXT, -- hashed IP for privacy
  country_code TEXT, -- 2-letter country code
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Link clicks table to track external link clicks
CREATE TABLE public.link_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  link_type TEXT NOT NULL, -- 'website', 'social', 'course_url', 'contact'
  link_url TEXT NOT NULL,
  source_page TEXT NOT NULL, -- page where click originated
  resource_id UUID, -- creator_id, course_id, story_id
  user_agent TEXT,
  ip_hash TEXT, -- hashed IP for privacy
  country_code TEXT, -- 2-letter country code
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Analytics summary view for creators
CREATE VIEW public.creator_analytics AS
SELECT 
  c.id as creator_id,
  c.name as creator_name,
  -- Page view stats
  COUNT(DISTINCT pv.id) FILTER (WHERE pv.page_type = 'creator') as profile_views,
  COUNT(DISTINCT pv.id) FILTER (WHERE pv.page_type = 'creator' AND pv.created_at >= CURRENT_DATE - INTERVAL '7 days') as profile_views_7d,
  COUNT(DISTINCT pv.id) FILTER (WHERE pv.page_type = 'creator' AND pv.created_at >= CURRENT_DATE - INTERVAL '30 days') as profile_views_30d,
  -- Link click stats
  COUNT(DISTINCT lc.id) FILTER (WHERE lc.link_type = 'website') as website_clicks,
  COUNT(DISTINCT lc.id) FILTER (WHERE lc.link_type = 'social') as social_clicks,
  COUNT(DISTINCT lc.id) FILTER (WHERE lc.link_type = 'contact') as contact_clicks,
  COUNT(DISTINCT lc.id) FILTER (WHERE lc.created_at >= CURRENT_DATE - INTERVAL '7 days') as total_clicks_7d,
  COUNT(DISTINCT lc.id) FILTER (WHERE lc.created_at >= CURRENT_DATE - INTERVAL '30 days') as total_clicks_30d
FROM public.creators c
LEFT JOIN public.page_views pv ON c.id = pv.resource_id
LEFT JOIN public.link_clicks lc ON c.id = lc.resource_id
GROUP BY c.id, c.name;

-- Course analytics view
CREATE VIEW public.course_analytics AS
SELECT 
  co.id as course_id,
  co.title as course_title,
  co.creator_id,
  COUNT(DISTINCT pv.id) as page_views,
  COUNT(DISTINCT pv.id) FILTER (WHERE pv.created_at >= CURRENT_DATE - INTERVAL '7 days') as page_views_7d,
  COUNT(DISTINCT lc.id) FILTER (WHERE lc.link_type = 'course_url') as course_clicks,
  COUNT(DISTINCT lc.id) FILTER (WHERE lc.link_type = 'course_url' AND lc.created_at >= CURRENT_DATE - INTERVAL '7 days') as course_clicks_7d
FROM public.courses co
LEFT JOIN public.page_views pv ON co.id = pv.resource_id AND pv.page_type = 'course'
LEFT JOIN public.link_clicks lc ON co.id = lc.resource_id
GROUP BY co.id, co.title, co.creator_id;

-- Story analytics view
CREATE VIEW public.story_analytics AS
SELECT 
  ss.id as story_id,
  ss.title as story_title,
  ss.creator_id,
  COUNT(DISTINCT pv.id) as page_views,
  COUNT(DISTINCT pv.id) FILTER (WHERE pv.created_at >= CURRENT_DATE - INTERVAL '7 days') as page_views_7d,
  COUNT(DISTINCT pv.id) FILTER (WHERE pv.created_at >= CURRENT_DATE - INTERVAL '30 days') as page_views_30d
FROM public.story_submissions ss
LEFT JOIN public.page_views pv ON ss.id = pv.resource_id AND pv.page_type = 'story'
GROUP BY ss.id, ss.title, ss.creator_id;

-- Enable Row Level Security
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_clicks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for page_views (creators can view analytics for their content)
CREATE POLICY "Creators can view analytics for their content" 
ON public.page_views FOR SELECT 
USING (
  resource_id IN (
    SELECT id FROM public.creators WHERE user_id = auth.uid()
    UNION
    SELECT id FROM public.courses WHERE creator_id IN (
      SELECT id FROM public.creators WHERE user_id = auth.uid()
    )
    UNION
    SELECT id FROM public.story_submissions WHERE creator_id IN (
      SELECT id FROM public.creators WHERE user_id = auth.uid()
    )
  )
);

-- RLS Policies for link_clicks (creators can view analytics for their content)
CREATE POLICY "Creators can view link analytics for their content" 
ON public.link_clicks FOR SELECT 
USING (
  resource_id IN (
    SELECT id FROM public.creators WHERE user_id = auth.uid()
    UNION
    SELECT id FROM public.courses WHERE creator_id IN (
      SELECT id FROM public.creators WHERE user_id = auth.uid()
    )
    UNION
    SELECT id FROM public.story_submissions WHERE creator_id IN (
      SELECT id FROM public.creators WHERE user_id = auth.uid()
    )
  )
);

-- Allow anonymous inserts for tracking (no authentication required)
CREATE POLICY "Allow anonymous tracking inserts" 
ON public.page_views FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow anonymous link click inserts" 
ON public.link_clicks FOR INSERT 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_page_views_resource_type ON public.page_views(resource_id, page_type);
CREATE INDEX idx_page_views_created_at ON public.page_views(created_at);
CREATE INDEX idx_link_clicks_resource_type ON public.link_clicks(resource_id, link_type);
CREATE INDEX idx_link_clicks_created_at ON public.link_clicks(created_at);