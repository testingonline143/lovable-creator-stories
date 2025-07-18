-- Add sample success stories for Phase 2 showcase with correct enum values

INSERT INTO public.story_submissions (
  user_id, creator_id, title, subtitle, category, status, 
  revenue_before, revenue_after, timeframe_start, timeframe_end,
  featured_image_url, tags, key_metrics, published_at
) VALUES 
(
  gen_random_uuid(),
  (SELECT id FROM public.creators WHERE name = 'Sarah Chen'),
  'From Freelancer to Design Agency: My Journey to $120K/Month',
  'How I transformed my solo design practice into a thriving agency with 15 employees',
  'consulting',
  'published',
  8000,
  120000,
  '2022-01-01',
  '2024-06-01',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
  ARRAY['design', 'agency', 'scaling', 'business'],
  '[{"metric": "Monthly Revenue", "before": "$8K", "after": "$120K"}, {"metric": "Team Size", "before": "1", "after": "15"}, {"metric": "Client Projects", "before": "5/month", "after": "30/month"}]'::jsonb,
  now() - interval '1 month'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.creators WHERE name = 'Elena Rodriguez'),
  'Zero to $50K: Building a Digital Marketing Empire',
  'The exact strategy I used to build a profitable marketing consultancy in 18 months',
  'consulting',
  'published',
  0,
  50000,
  '2023-01-01',
  '2024-07-01',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
  ARRAY['marketing', 'consultancy', 'growth', 'strategy'],
  '[{"metric": "Monthly Revenue", "before": "$0", "after": "$50K"}, {"metric": "Clients", "before": "0", "after": "25"}, {"metric": "Team Members", "before": "1", "after": "8"}]'::jsonb,
  now() - interval '2 weeks'
),
(
  gen_random_uuid(),
  (SELECT id FROM public.creators WHERE name = 'Marcus Johnson'),
  'From Corporate to Course Creator: $75K in First Year',
  'How I left my consulting job to build an online education business',
  'course_creation',
  'published',
  0,
  75000,
  '2023-06-01',
  '2024-06-01',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
  ARRAY['courses', 'education', 'business', 'consulting'],
  '[{"metric": "Annual Revenue", "before": "$0", "after": "$75K"}, {"metric": "Students", "before": "0", "after": "2,500"}, {"metric": "Courses", "before": "0", "after": "3"}]'::jsonb,
  now() - interval '3 days'
);