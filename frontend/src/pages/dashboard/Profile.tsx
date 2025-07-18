import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, User, Globe, Save, Eye, Edit } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  title: string;
  bio: string;
  location: string;
  website: string;
  is_public: boolean;
  slug: string;
  avatar_url: string;
  cover_image_url: string;
  social_links: any;
}

const Profile = () => {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    location: '',
    website: '',
    slug: '',
    avatar_url: '',
    cover_image_url: '',
    monthly_revenue: 0,
    total_students: 0,
    total_courses: 0,
    year_started: new Date().getFullYear(),
    badge_text: 'Creator',
    twitter_handle: '',
    linkedin_url: '',
    achievements: [] as string[],
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCreatorData();
  }, []);

  const fetchCreatorData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
        return;
      }

      setCreator(data);
      setFormData({
        name: data.name || '',
        title: data.title || '',
        bio: data.bio || '',
        location: data.location || '',
        website: data.website || '',
        slug: data.slug || '',
        avatar_url: data.avatar_url || '',
        cover_image_url: data.cover_image_url || '',
        monthly_revenue: data.monthly_revenue || 0,
        total_students: data.total_students || 0,
        total_courses: data.total_courses || 0,
        year_started: data.year_started || new Date().getFullYear(),
        badge_text: data.badge_text || 'Creator',
        twitter_handle: data.twitter_handle || '',
        linkedin_url: data.linkedin_url || '',
        achievements: data.achievements || [],
      });
    } catch (error) {
      console.error('Error fetching creator data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      if (field === 'achievements') {
        return {
          ...prev,
          [field]: value.split('\n').filter(line => line.trim() !== ''),
        };
      }
      if (['monthly_revenue', 'total_students', 'total_courses', 'year_started'].includes(field)) {
        return {
          ...prev,
          [field]: parseInt(value) || 0,
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!creator) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('creators')
        .update({
          name: formData.name,
          title: formData.title,
          bio: formData.bio,
          location: formData.location,
          website: formData.website,
          slug: formData.slug,
          avatar_url: formData.avatar_url,
          cover_image_url: formData.cover_image_url,
          monthly_revenue: formData.monthly_revenue,
          total_students: formData.total_students,
          total_courses: formData.total_courses,
          year_started: formData.year_started,
          badge_text: formData.badge_text,
          twitter_handle: formData.twitter_handle,
          linkedin_url: formData.linkedin_url,
          achievements: formData.achievements,
        })
        .eq('id', creator.id);

      if (error) {
        if (error.code === '23505') {
          throw new Error('This slug is already taken. Please choose a different one.');
        }
        throw error;
      }

      toast({
        title: 'Profile updated successfully!',
        description: 'Your creator profile has been updated.',
      });

      await fetchCreatorData();
    } catch (error: any) {
      toast({
        title: 'Error updating profile',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const togglePublicStatus = async () => {
    if (!creator) return;

    try {
      const { error } = await supabase
        .from('creators')
        .update({ is_public: !creator.is_public })
        .eq('id', creator.id);

      if (error) throw error;

      setCreator(prev => prev ? { ...prev, is_public: !prev.is_public } : null);
      toast({
        title: creator.is_public ? 'Profile is now private' : 'Profile is now public!',
        description: creator.is_public 
          ? 'Your profile is no longer visible to the public.'
          : 'Your profile is now visible to the public.',
      });
    } catch (error: any) {
      toast({
        title: 'Error updating profile status',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Creator profile not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your creator profile and public page settings
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={togglePublicStatus} variant="outline">
            {creator.is_public ? (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Make Private
              </>
            ) : (
              <>
                <Globe className="mr-2 h-4 w-4" />
                Make Public
              </>
            )}
          </Button>
          {creator.is_public && (
            <Button asChild variant="outline">
              <a href={`/creator/${creator.slug}`} target="_blank" rel="noopener noreferrer">
                <Eye className="mr-2 h-4 w-4" />
                View Public Page
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Profile Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={creator.is_public ? 'default' : 'secondary'}>
                  {creator.is_public ? 'Public' : 'Private'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Slug: {creator.slug}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {creator.is_public 
                  ? `Your profile is live at /creator/${creator.slug}`
                  : 'Your profile is private and not visible to the public'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Profile
          </CardTitle>
          <CardDescription>
            Update your creator profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Full Stack Developer, Content Creator"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell your story and share your journey..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Profile URL</Label>
              <div className="flex items-center">
                <span className="text-muted-foreground text-sm mr-2">
                  creatorstory.app/creator/
                </span>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="your-name"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                This will be your public profile URL. Use lowercase letters, numbers, and hyphens only.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="avatar_url">Avatar URL</Label>
                <Input
                  id="avatar_url"
                  value={formData.avatar_url}
                  onChange={(e) => handleInputChange('avatar_url', e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cover_image_url">Cover Image URL</Label>
                <Input
                  id="cover_image_url"
                  value={formData.cover_image_url}
                  onChange={(e) => handleInputChange('cover_image_url', e.target.value)}
                  placeholder="https://example.com/cover.jpg"
                />
              </div>
            </div>

            {/* Statistics Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Profile Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthly_revenue">Monthly Revenue ($)</Label>
                  <Input
                    id="monthly_revenue"
                    type="number"
                    value={formData.monthly_revenue}
                    onChange={(e) => handleInputChange('monthly_revenue', e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total_students">Total Students</Label>
                  <Input
                    id="total_students"
                    type="number"
                    value={formData.total_students}
                    onChange={(e) => handleInputChange('total_students', e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total_courses">Total Courses</Label>
                  <Input
                    id="total_courses"
                    type="number"
                    value={formData.total_courses}
                    onChange={(e) => handleInputChange('total_courses', e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="year_started">Teaching Since (Year)</Label>
                  <Input
                    id="year_started"
                    type="number"
                    value={formData.year_started}
                    onChange={(e) => handleInputChange('year_started', e.target.value)}
                    placeholder="2020"
                    min="1980"
                    max={new Date().getFullYear()}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="badge_text">Badge Text</Label>
                  <Input
                    id="badge_text"
                    value={formData.badge_text}
                    onChange={(e) => handleInputChange('badge_text', e.target.value)}
                    placeholder="Creator"
                  />
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Social Media Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="twitter_handle">Twitter Handle</Label>
                  <Input
                    id="twitter_handle"
                    value={formData.twitter_handle}
                    onChange={(e) => handleInputChange('twitter_handle', e.target.value)}
                    placeholder="@yourusername"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Achievements</h3>
              <div className="space-y-2">
                <Label htmlFor="achievements">Achievements (one per line)</Label>
                <Textarea
                  id="achievements"
                  value={formData.achievements.join('\n')}
                  onChange={(e) => handleInputChange('achievements', e.target.value)}
                  placeholder="Built 3 successful companies&#10;Generated $2M+ in business revenue&#10;Mentored 500+ entrepreneurs"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Enter each achievement on a new line. These will appear as bullet points on your profile.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;