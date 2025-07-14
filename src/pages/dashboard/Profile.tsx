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
      });
    } catch (error) {
      console.error('Error fetching creator data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
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