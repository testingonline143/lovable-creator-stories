-- Add additional fields to creators table for public page customization
ALTER TABLE public.creators 
ADD COLUMN IF NOT EXISTS monthly_revenue INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_students INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_courses INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS year_started INTEGER DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
ADD COLUMN IF NOT EXISTS badge_text TEXT DEFAULT 'Creator',
ADD COLUMN IF NOT EXISTS twitter_handle TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS achievements TEXT[];