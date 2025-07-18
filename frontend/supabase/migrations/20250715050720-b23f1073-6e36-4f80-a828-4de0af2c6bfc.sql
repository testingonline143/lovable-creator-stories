-- Fix analytics views security issues properly
-- Views inherit security from underlying tables, so we don't need RLS on views themselves

-- Drop existing views first
DROP VIEW IF EXISTS public.creator_analytics;
DROP VIEW IF EXISTS public.course_analytics; 
DROP VIEW IF EXISTS public.story_analytics;

-- Create a security definer function to get current user's creator ID
-- This prevents infinite recursion in RLS policies
CREATE OR REPLACE FUNCTION public.get_current_user_creator_id()
RETURNS UUID AS $$
  SELECT id FROM public.creators WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

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
WHERE c.user_id = auth.uid() -- Only show data for current user's creator profile
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
LEFT JOIN public.creators cr ON co.creator_id = cr.id
WHERE cr.user_id = auth.uid() -- Only show data for current user's courses
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
LEFT JOIN public.creators cr ON ss.creator_id = cr.id
WHERE cr.user_id = auth.uid() -- Only show data for current user's stories
GROUP BY ss.id, ss.title, ss.creator_id;

-- Grant proper permissions
GRANT SELECT ON public.creator_analytics TO authenticated;
GRANT SELECT ON public.course_analytics TO authenticated;
GRANT SELECT ON public.story_analytics TO authenticated;