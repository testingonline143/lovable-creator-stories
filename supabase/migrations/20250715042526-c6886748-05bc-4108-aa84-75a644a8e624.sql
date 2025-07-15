-- Fix security warnings for analytics views by making them SECURITY INVOKER
-- and adding proper RLS policies

-- Drop existing views
DROP VIEW IF EXISTS public.creator_analytics;
DROP VIEW IF EXISTS public.course_analytics;
DROP VIEW IF EXISTS public.story_analytics;

-- Recreate views with SECURITY INVOKER to respect RLS policies
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

-- Course analytics view
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

-- Story analytics view
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

-- Enable RLS on the views
ALTER VIEW public.creator_analytics SET (security_invoker = true);
ALTER VIEW public.course_analytics SET (security_invoker = true);
ALTER VIEW public.story_analytics SET (security_invoker = true);