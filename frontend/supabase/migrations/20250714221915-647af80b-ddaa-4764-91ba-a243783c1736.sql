-- Add sample data for Phase 3 showcase
-- First, let's temporarily disable foreign key constraints to add sample data

-- Drop foreign key constraints temporarily
ALTER TABLE public.creators DROP CONSTRAINT IF EXISTS creators_user_id_fkey;
ALTER TABLE public.course_reviews DROP CONSTRAINT IF EXISTS course_reviews_user_id_fkey;
ALTER TABLE public.course_enrollments DROP CONSTRAINT IF EXISTS course_enrollments_user_id_fkey;
ALTER TABLE public.course_wishlist DROP CONSTRAINT IF EXISTS course_wishlist_user_id_fkey;

-- Add some sample creators with realistic data
INSERT INTO public.creators (
  user_id, name, title, bio, avatar_url, cover_image_url, location, website, 
  linkedin_url, twitter_handle, is_public, monthly_revenue, total_students, 
  total_courses, year_started, achievements, badge_text, slug
) VALUES 
(
  gen_random_uuid(), 
  'Sarah Chen', 
  'Full-Stack Developer & Course Creator', 
  'Passionate educator with 8+ years in web development. Helped over 50,000 students build their first applications.',
  'https://images.unsplash.com/photo-1494790108755-2616b612b1e0?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop',
  'San Francisco, CA',
  'https://sarahchen.dev',
  'https://linkedin.com/in/sarahchen',
  'sarahchen_dev',
  true,
  25000,
  52000,
  12,
  2016,
  ARRAY['Top Instructor 2023', 'Student Choice Award', '1M+ Course Views'],
  'Top Instructor',
  'sarah-chen'
),
(
  gen_random_uuid(), 
  'Marcus Johnson', 
  'UI/UX Designer & Product Strategist', 
  'Design thinking expert who transforms complex problems into beautiful, user-friendly solutions.',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=400&fit=crop',
  'New York, NY',
  'https://marcusdesigns.co',
  'https://linkedin.com/in/marcusjohnson',
  'marcus_designs',
  true,
  18000,
  28000,
  8,
  2018,
  ARRAY['Design Excellence Award', 'Featured in Design Weekly'],
  'Design Expert',
  'marcus-johnson'
),
(
  gen_random_uuid(), 
  'Elena Rodriguez', 
  'Digital Marketing Strategist', 
  'Growth hacker who has scaled dozens of businesses from startup to 7-figures through strategic marketing.',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=400&fit=crop',
  'Austin, TX',
  'https://elenamarketing.com',
  'https://linkedin.com/in/elenarodriguez',
  'elena_growth',
  true,
  32000,
  45000,
  15,
  2015,
  ARRAY['Marketing Expert of the Year', '100M+ Campaign Views'],
  'Growth Expert',
  'elena-rodriguez'
);

-- Now add sample courses
INSERT INTO public.courses (
  creator_id, title, description, short_description, cover_image_url, trailer_video_url,
  price, original_price, currency, status, difficulty, duration_hours, total_lessons,
  language, category, tags, prerequisites, learning_outcomes, course_url, platform,
  is_featured, launch_date
) VALUES 
(
  (SELECT id FROM public.creators WHERE slug = 'sarah-chen'),
  'Complete React Developer Bootcamp 2024',
  'Master React from zero to hero with this comprehensive bootcamp. Build 5 real-world projects including an e-commerce platform, social media app, and portfolio website. Learn React Hooks, Context API, Redux, TypeScript, and modern development practices. Perfect for beginners and intermediate developers looking to advance their careers.',
  'Learn React, TypeScript, and modern web development by building 5 real-world projects',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  149.99,
  249.99,
  'USD',
  'published',
  'beginner',
  42,
  156,
  'en',
  'Web Development',
  ARRAY['React', 'TypeScript', 'JavaScript', 'Frontend', 'Web Development'],
  ARRAY['Basic HTML/CSS knowledge', 'Computer with internet access'],
  ARRAY['Build modern React applications', 'Master React Hooks and Context API', 'Implement TypeScript in React projects', 'Deploy applications to production', 'Build a professional portfolio'],
  'https://udemy.com/course/react-bootcamp-2024',
  'udemy',
  true,
  '2024-01-15'
),
(
  (SELECT id FROM public.creators WHERE slug = 'marcus-johnson'),
  'UI/UX Design Masterclass: From Beginner to Pro',
  'Transform your design skills with this comprehensive UI/UX course. Learn design principles, user research, wireframing, prototyping, and visual design. Use industry-standard tools like Figma, Adobe XD, and Sketch to create stunning interfaces. Includes real client projects and portfolio development.',
  'Complete UI/UX design course covering research, wireframing, prototyping, and visual design',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop',
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  199.99,
  299.99,
  'USD',
  'published',
  'intermediate',
  38,
  142,
  'en',
  'Design',
  ARRAY['UI Design', 'UX Design', 'Figma', 'User Research', 'Prototyping'],
  ARRAY['Basic computer skills', 'Interest in design'],
  ARRAY['Master UI/UX design principles', 'Create professional wireframes and prototypes', 'Conduct user research and testing', 'Build a stunning design portfolio', 'Land your first design job'],
  'https://skillshare.com/classes/ui-ux-masterclass',
  'skillshare',
  true,
  '2024-02-01'
),
(
  (SELECT id FROM public.creators WHERE slug = 'elena-rodriguez'),
  'Digital Marketing Blueprint: Scale Any Business',
  'Learn the exact strategies I used to scale businesses from $0 to 7-figures. Covers Facebook Ads, Google Ads, email marketing, content strategy, and conversion optimization. Includes templates, case studies, and step-by-step playbooks.',
  'Complete digital marketing course with proven strategies to scale any business',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  299.99,
  499.99,
  'USD',
  'published',
  'intermediate',
  35,
  128,
  'en',
  'Marketing',
  ARRAY['Digital Marketing', 'Facebook Ads', 'Google Ads', 'Email Marketing', 'Growth Hacking'],
  ARRAY['Basic business understanding', 'Access to advertising budget'],
  ARRAY['Create profitable ad campaigns', 'Build effective sales funnels', 'Master email marketing automation', 'Scale businesses profitably', 'Generate consistent leads'],
  'https://teachable.com/courses/digital-marketing-blueprint',
  'teachable',
  true,
  '2024-01-20'
),
(
  (SELECT id FROM public.creators WHERE slug = 'sarah-chen'),
  'Python for Data Science & Machine Learning',
  'Dive into data science with Python. Learn pandas, NumPy, matplotlib, scikit-learn, and TensorFlow. Build real ML models for classification, regression, and neural networks. Perfect for career switchers and analysts.',
  'Learn Python, data analysis, and machine learning to become a data scientist',
  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop',
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  179.99,
  279.99,
  'USD',
  'published',
  'beginner',
  48,
  165,
  'en',
  'Data Science',
  ARRAY['Python', 'Data Science', 'Machine Learning', 'Pandas', 'TensorFlow'],
  ARRAY['Basic programming knowledge helpful but not required'],
  ARRAY['Master Python for data analysis', 'Build machine learning models', 'Create data visualizations', 'Work with real datasets', 'Launch a data science career'],
  'https://coursera.org/specializations/python-data-science',
  'coursera',
  false,
  '2024-03-01'
),
(
  (SELECT id FROM public.creators WHERE slug = 'marcus-johnson'),
  'Mobile App Design: iOS & Android UI/UX',
  'Design beautiful mobile apps that users love. Learn mobile design patterns, iOS and Android guidelines, responsive design, and app store optimization. Includes Figma templates and real app case studies.',
  'Master mobile app design for iOS and Android with modern UI/UX principles',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop',
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  129.99,
  199.99,
  'USD',
  'published',
  'intermediate',
  28,
  98,
  'en',
  'Mobile Development',
  ARRAY['Mobile Design', 'iOS Design', 'Android Design', 'App Design', 'Figma'],
  ARRAY['Basic design knowledge', 'Figma account'],
  ARRAY['Design professional mobile apps', 'Understand platform-specific guidelines', 'Create responsive mobile interfaces', 'Optimize for app stores', 'Build a mobile design portfolio'],
  'https://udemy.com/course/mobile-app-design',
  'udemy',
  false,
  '2024-02-15'
),
(
  (SELECT id FROM public.creators WHERE slug = 'elena-rodriguez'),
  'Social Media Marketing Mastery 2024',
  'Dominate social media marketing across all platforms. Learn Instagram, TikTok, LinkedIn, and Twitter strategies. Create viral content, build engaged communities, and drive sales through social media.',
  'Complete social media marketing course for all major platforms',
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop',
  'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
  99.99,
  149.99,
  'USD',
  'published',
  'beginner',
  25,
  89,
  'en',
  'Marketing',
  ARRAY['Social Media', 'Instagram', 'TikTok', 'Content Marketing', 'Influencer Marketing'],
  ARRAY['Social media accounts', 'Smartphone or camera'],
  ARRAY['Create viral social media content', 'Build engaged communities', 'Drive sales through social media', 'Master all major platforms', 'Become a social media expert'],
  'https://thinkific.com/courses/social-media-mastery',
  'thinkific',
  false,
  '2024-03-10'
);

-- Add sample course reviews with mock user IDs
INSERT INTO public.course_reviews (course_id, user_id, rating, title, review_text, is_verified, helpful_votes, created_at) VALUES
-- React course reviews
((SELECT id FROM public.courses WHERE title = 'Complete React Developer Bootcamp 2024'), gen_random_uuid(), 5, 'Incredible course! Changed my career', 'This course is absolutely amazing. Sarah explains everything so clearly and the projects are practical and engaging. I went from knowing nothing about React to building my own applications. Highly recommend!', true, 23, now() - interval '2 months'),
((SELECT id FROM public.courses WHERE title = 'Complete React Developer Bootcamp 2024'), gen_random_uuid(), 5, 'Best React course on the internet', 'I have taken many React courses but this one stands out. The structure is perfect, starting from basics and gradually building complexity. The TypeScript integration is excellent.', true, 18, now() - interval '1 month'),
((SELECT id FROM public.courses WHERE title = 'Complete React Developer Bootcamp 2024'), gen_random_uuid(), 4, 'Great content, sometimes moves fast', 'Overall excellent course with high-quality content. Sometimes the pace is a bit quick for complete beginners, but if you pause and practice, it is worth it.', true, 12, now() - interval '3 weeks'),

-- Design course reviews  
((SELECT id FROM public.courses WHERE title = 'UI/UX Design Masterclass: From Beginner to Pro'), gen_random_uuid(), 5, 'From zero to design hero!', 'Marcus is an incredible instructor. This course took me from having no design skills to creating professional-looking interfaces. The Figma tutorials are top-notch.', true, 31, now() - interval '6 weeks'),
((SELECT id FROM public.courses WHERE title = 'UI/UX Design Masterclass: From Beginner to Pro'), gen_random_uuid(), 5, 'Perfect for career transition', 'I was a developer wanting to learn design. This course gave me all the skills I needed to transition into a UX role. The portfolio section was especially valuable.', true, 19, now() - interval '1 month'),
((SELECT id FROM public.courses WHERE title = 'UI/UX Design Masterclass: From Beginner to Pro'), gen_random_uuid(), 4, 'Comprehensive and well-structured', 'Covers everything you need to know about UI/UX design. The real client projects add great practical value. Would recommend to anyone starting in design.', true, 15, now() - interval '2 weeks'),

-- Marketing course reviews
((SELECT id FROM public.courses WHERE title = 'Digital Marketing Blueprint: Scale Any Business'), gen_random_uuid(), 5, 'ROI paid for itself in first week', 'Elena knows what she is talking about. Applied her Facebook ads strategy and got immediate results. This course more than paid for itself in the first week.', true, 42, now() - interval '5 weeks'),
((SELECT id FROM public.courses WHERE title = 'Digital Marketing Blueprint: Scale Any Business'), gen_random_uuid(), 5, 'Game-changing strategies', 'Finally, a marketing course that actually works! The email marketing section alone is worth the price. My business has grown 300% since taking this course.', true, 38, now() - interval '3 weeks'),

-- Python course reviews
((SELECT id FROM public.courses WHERE title = 'Python for Data Science & Machine Learning'), gen_random_uuid(), 4, 'Great introduction to data science', 'Perfect course for beginners in data science. Sarah breaks down complex concepts into digestible pieces. The machine learning projects are fantastic.', true, 16, now() - interval '1 month'),
((SELECT id FROM public.courses WHERE title = 'Python for Data Science & Machine Learning'), gen_random_uuid(), 5, 'Landed my first data science job!', 'This course gave me the foundation I needed to break into data science. The portfolio projects helped me stand out in interviews. Highly recommended!', true, 22, now() - interval '2 months'),

-- Mobile design reviews
((SELECT id FROM public.courses WHERE title = 'Mobile App Design: iOS & Android UI/UX'), gen_random_uuid(), 4, 'Solid mobile design fundamentals', 'Great course for learning mobile design principles. Marcus covers both iOS and Android guidelines thoroughly. The Figma templates are very useful.', true, 14, now() - interval '3 weeks'),

-- Social media reviews
((SELECT id FROM public.courses WHERE title = 'Social Media Marketing Mastery 2024'), gen_random_uuid(), 5, 'My Instagram following exploded!', 'Elena reveals strategies that actually work. My Instagram went from 500 to 50K followers in 3 months using her techniques. This course is gold!', true, 35, now() - interval '1 month');