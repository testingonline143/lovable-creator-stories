-- Comprehensive fix for analytics views security issues
-- Drop and recreate views with proper security settings and RLS policies

-- Drop existing views first
DROP VIEW IF EXISTS public.creator_analytics;
DROP VIEW IF EXISTS public.course_analytics; 
DROP VIEW IF EXISTS public.story_analytics;

-- Create creator analytics view with proper security
CREATE VIEW public.creator_analytics 
WITH (security_invoker=true) AS
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

-- Create course analytics view with proper security
CREATE VIEW public.course_analytics 
WITH (security_invoker=true) AS
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

-- Create story analytics view with proper security
CREATE VIEW public.story_analytics 
WITH (security_invoker=true) AS
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

-- Enable RLS on all analytics views
ALTER VIEW public.creator_analytics ENABLE ROW LEVEL SECURITY;
ALTER VIEW public.course_analytics ENABLE ROW LEVEL SECURITY;
ALTER VIEW public.story_analytics ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for creator analytics - creators can only see their own analytics
CREATE POLICY "Creators can view their own analytics" 
ON public.creator_analytics FOR SELECT 
USING (creator_id IN (
  SELECT id FROM public.creators WHERE user_id = auth.uid()
));

-- Add RLS policies for course analytics - creators can only see analytics for their courses
CREATE POLICY "Creators can view their course analytics" 
ON public.course_analytics FOR SELECT
USING (creator_id IN (
  SELECT id FROM public.creators WHERE user_id = auth.uid()
));

-- Add RLS policies for story analytics - creators can only see analytics for their stories  
CREATE POLICY "Creators can view their story analytics"
ON public.story_analytics FOR SELECT
USING (creator_id IN (
  SELECT id FROM public.creators WHERE user_id = auth.uid()
));

-- Create a security definer function to get current user's creator ID
CREATE OR REPLACE FUNCTION public.get_current_user_creator_id()
RETURNS UUID AS $$
  SELECT id FROM public.creators WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Update the RLS policies to use the security definer function to avoid recursion
DROP POLICY IF EXISTS "Creators can view their own analytics" ON public.creator_analytics;
DROP POLICY IF EXISTS "Creators can view their course analytics" ON public.course_analytics;  
DROP POLICY IF EXISTS "Creators can view their story analytics" ON public.story_analytics;

CREATE POLICY "Creators can view their own analytics" 
ON public.creator_analytics FOR SELECT 
USING (creator_id = public.get_current_user_creator_id());

CREATE POLICY "Creators can view their course analytics" 
ON public.course_analytics FOR SELECT
USING (creator_id = public.get_current_user_creator_id());

CREATE POLICY "Creators can view their story analytics"
ON public.story_analytics FOR SELECT  
USING (creator_id = public.get_current_user_creator_id());