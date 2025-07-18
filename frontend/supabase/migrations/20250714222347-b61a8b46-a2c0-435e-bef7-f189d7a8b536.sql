-- Fix revenue data consistency for Govardhan
UPDATE public.creators 
SET 
  monthly_revenue = 38000,
  total_courses = 9,
  total_students = 9800,
  name = 'Govardhan'  -- Fix capitalization
WHERE LOWER(name) = 'govardhan';