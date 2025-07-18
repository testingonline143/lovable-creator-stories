import { useState, useMemo, useCallback } from 'react';
import { SearchFilters } from '@/components/SearchAndFilter';

const DEFAULT_FILTERS: SearchFilters = {
  searchTerm: '',
  categories: [],
  revenueRange: [0, 1000000],
  studentsRange: [0, 100000],
  coursesRange: [0, 50],
  locations: [],
  yearStartedRange: [2010, new Date().getFullYear()],
  tags: [],
  sortBy: 'name',
  sortOrder: 'asc',
};

export interface Creator {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar_url: string | null;
  location: string | null;
  monthly_revenue: number;
  total_students: number;
  total_courses: number;
  year_started: number;
  badge_text: string;
  created_at: string;
  tags?: string[];
  category?: string;
}

export const useSearchAndFilter = (creators: Creator[]) => {
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    const categories = new Set<string>();
    const locations = new Set<string>();
    const tags = new Set<string>();

    creators.forEach(creator => {
      if (creator.category) categories.add(creator.category);
      if (creator.location) locations.add(creator.location);
      if (creator.tags) creator.tags.forEach(tag => tags.add(tag));
    });

    return {
      categories: Array.from(categories).sort(),
      locations: Array.from(locations).sort(),
      tags: Array.from(tags).sort(),
    };
  }, [creators]);

  // Filter and sort creators
  const filteredCreators = useMemo(() => {
    let result = creators.filter(creator => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          creator.name.toLowerCase().includes(searchLower) ||
          creator.title?.toLowerCase().includes(searchLower) ||
          creator.bio?.toLowerCase().includes(searchLower) ||
          creator.badge_text?.toLowerCase().includes(searchLower) ||
          creator.tags?.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.categories.length > 0) {
        if (!creator.category || !filters.categories.includes(creator.category)) {
          return false;
        }
      }

      // Revenue range filter
      const revenue = creator.monthly_revenue || 0;
      if (revenue < filters.revenueRange[0] || revenue > filters.revenueRange[1]) {
        return false;
      }

      // Students range filter
      const students = creator.total_students || 0;
      if (students < filters.studentsRange[0] || students > filters.studentsRange[1]) {
        return false;
      }

      // Courses range filter
      const courses = creator.total_courses || 0;
      if (courses < filters.coursesRange[0] || courses > filters.coursesRange[1]) {
        return false;
      }

      // Location filter
      if (filters.locations.length > 0) {
        if (!creator.location || !filters.locations.includes(creator.location)) {
          return false;
        }
      }

      // Year started filter
      const yearStarted = creator.year_started || new Date().getFullYear();
      if (yearStarted < filters.yearStartedRange[0] || yearStarted > filters.yearStartedRange[1]) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        if (!creator.tags || !filters.tags.some(tag => creator.tags!.includes(tag))) {
          return false;
        }
      }

      return true;
    });

    // Sort results
    result.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'revenue':
          aValue = a.monthly_revenue || 0;
          bValue = b.monthly_revenue || 0;
          break;
        case 'students':
          aValue = a.total_students || 0;
          bValue = b.total_students || 0;
          break;
        case 'courses':
          aValue = a.total_courses || 0;
          bValue = b.total_courses || 0;
          break;
        case 'created_at':
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        case 'year_started':
          aValue = a.year_started || 0;
          bValue = b.year_started || 0;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (filters.sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return result;
  }, [creators, filters]);

  return {
    filters,
    setFilters,
    clearFilters,
    filteredCreators,
    filterOptions,
    resultsCount: filteredCreators.length,
    totalCount: creators.length,
  };
};