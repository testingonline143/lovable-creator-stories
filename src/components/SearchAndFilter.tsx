import { useState } from "react";
import { Search, SlidersHorizontal, X, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export interface SearchFilters {
  searchTerm: string;
  categories: string[];
  revenueRange: [number, number];
  studentsRange: [number, number];
  coursesRange: [number, number];
  locations: string[];
  yearStartedRange: [number, number];
  tags: string[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface SearchAndFilterProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
  resultsCount: number;
  totalCount: number;
  availableCategories: string[];
  availableLocations: string[];
  availableTags: string[];
}

const SORT_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'revenue', label: 'Monthly Revenue' },
  { value: 'students', label: 'Total Students' },
  { value: 'courses', label: 'Course Count' },
  { value: 'created_at', label: 'Date Joined' },
  { value: 'year_started', label: 'Years in Business' },
];

const SearchAndFilter = ({
  filters,
  onFiltersChange,
  onClearFilters,
  resultsCount,
  totalCount,
  availableCategories,
  availableLocations,
  availableTags,
}: SearchAndFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilters = (updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  const toggleLocation = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter(l => l !== location)
      : [...filters.locations, location];
    updateFilters({ locations: newLocations });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    updateFilters({ tags: newTags });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.revenueRange[0] > 0 || filters.revenueRange[1] < 1000000) count++;
    if (filters.studentsRange[0] > 0 || filters.studentsRange[1] < 100000) count++;
    if (filters.coursesRange[0] > 0 || filters.coursesRange[1] < 50) count++;
    if (filters.locations.length > 0) count++;
    if (filters.yearStartedRange[0] > 2010 || filters.yearStartedRange[1] < new Date().getFullYear()) count++;
    if (filters.tags.length > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search creators, specialties, keywords..."
          value={filters.searchTerm}
          onChange={(e) => updateFilters({ searchTerm: e.target.value })}
          className="pl-10 pr-4"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <Select
            value={filters.sortBy}
            onValueChange={(value) => updateFilters({ sortBy: value })}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => updateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
            className="px-2"
          >
            {filters.sortOrder === 'asc' ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Advanced Filters Sheet */}
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 min-w-5 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Advanced Filters</SheetTitle>
            </SheetHeader>

            <div className="space-y-6 mt-6">
              {/* Categories */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((category) => (
                    <Button
                      key={category}
                      variant={filters.categories.includes(category) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Revenue Range */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Monthly Revenue: ${filters.revenueRange[0].toLocaleString()} - ${filters.revenueRange[1].toLocaleString()}
                </Label>
                <Slider
                  value={filters.revenueRange}
                  onValueChange={(value) => updateFilters({ revenueRange: value as [number, number] })}
                  max={1000000}
                  step={10000}
                  className="w-full"
                />
              </div>

              {/* Students Range */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Total Students: {filters.studentsRange[0].toLocaleString()} - {filters.studentsRange[1].toLocaleString()}
                </Label>
                <Slider
                  value={filters.studentsRange}
                  onValueChange={(value) => updateFilters({ studentsRange: value as [number, number] })}
                  max={100000}
                  step={1000}
                  className="w-full"
                />
              </div>

              {/* Courses Range */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Course Count: {filters.coursesRange[0]} - {filters.coursesRange[1]}
                </Label>
                <Slider
                  value={filters.coursesRange}
                  onValueChange={(value) => updateFilters({ coursesRange: value as [number, number] })}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              <Separator />

              {/* Locations */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Locations</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {availableLocations.map((location) => (
                    <div key={location} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location}`}
                        checked={filters.locations.includes(location)}
                        onCheckedChange={() => toggleLocation(location)}
                      />
                      <Label htmlFor={`location-${location}`} className="text-sm">
                        {location}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Years in Business */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Started Year: {filters.yearStartedRange[0]} - {filters.yearStartedRange[1]}
                </Label>
                <Slider
                  value={filters.yearStartedRange}
                  onValueChange={(value) => updateFilters({ yearStartedRange: value as [number, number] })}
                  min={2010}
                  max={new Date().getFullYear()}
                  step={1}
                  className="w-full"
                />
              </div>

              <Separator />

              {/* Tags */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Skills & Tags</Label>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                  {availableTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={filters.tags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={onClearFilters}
                className="w-full"
                disabled={activeFiltersCount === 0}
              >
                Clear All Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Clear Search */}
        {filters.searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => updateFilters({ searchTerm: "" })}
            className="gap-1"
          >
            <X className="h-3 w-3" />
            Clear search
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((category) => (
                <Badge key={`cat-${category}`} variant="secondary" className="gap-1">
                  Category: {category}
                  <button onClick={() => toggleCategory(category)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              
              {filters.locations.map((location) => (
                <Badge key={`loc-${location}`} variant="secondary" className="gap-1">
                  Location: {location}
                  <button onClick={() => toggleLocation(location)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              
              {filters.tags.map((tag) => (
                <Badge key={`tag-${tag}`} variant="secondary" className="gap-1">
                  {tag}
                  <button onClick={() => toggleTag(tag)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}

              {(filters.revenueRange[0] > 0 || filters.revenueRange[1] < 1000000) && (
                <Badge variant="secondary" className="gap-1">
                  Revenue: ${filters.revenueRange[0].toLocaleString()} - ${filters.revenueRange[1].toLocaleString()}
                  <button onClick={() => updateFilters({ revenueRange: [0, 1000000] })}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {resultsCount.toLocaleString()} of {totalCount.toLocaleString()} creators
      </div>
    </div>
  );
};

export default SearchAndFilter;