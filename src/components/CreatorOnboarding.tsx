import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, User, Briefcase, Globe, CheckCircle } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar_url: string;
  cover_image_url: string;
  location: string;
  website: string;
  social_links: any;
  is_public: boolean;
  slug: string;
}

interface CreatorOnboardingProps {
  onCreatorCreated: (creator: Creator) => void;
}

const CreatorOnboarding = ({ onCreatorCreated }: CreatorOnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    location: '',
    website: '',
    slug: '',
  });
  const { toast } = useToast();

  const steps = [
    {
      number: 1,
      title: 'Basic Information',
      description: 'Tell us about yourself',
      icon: User,
    },
    {
      number: 2,
      title: 'Professional Details',
      description: 'Share your expertise',
      icon: Briefcase,
    },
    {
      number: 3,
      title: 'Public Profile',
      description: 'Set up your public page',
      icon: Globe,
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const slug = formData.slug || generateSlug(formData.name);
      
      const { data, error } = await supabase
        .from('creators')
        .insert({
          user_id: user.id,
          name: formData.name,
          title: formData.title,
          bio: formData.bio,
          location: formData.location,
          website: formData.website,
          slug,
          is_public: false,
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          throw new Error('This slug is already taken. Please choose a different one.');
        }
        throw error;
      }

      onCreatorCreated(data);
    } catch (error: any) {
      toast({
        title: 'Error creating profile',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '';
      case 2:
        return formData.title.trim() !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Set Up Your Creator Profile
          </CardTitle>
          <CardDescription className="text-center">
            Let's create your professional creator profile in just a few steps
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 mb-2
                    ${isActive 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : isCompleted 
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-muted-foreground text-muted-foreground'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Content */}
          <div className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
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
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself and your journey..."
                    rows={4}
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
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slug">Profile URL</Label>
                  <div className="flex items-center">
                    <span className="text-muted-foreground text-sm mr-1">
                      creatorstory.app/creator/
                    </span>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder={generateSlug(formData.name) || 'your-name'}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    This will be your public profile URL. Leave blank to auto-generate from your name.
                  </p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Profile Summary</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Title:</strong> {formData.title}</p>
                    {formData.location && <p><strong>Location:</strong> {formData.location}</p>}
                    {formData.website && <p><strong>Website:</strong> {formData.website}</p>}
                    {formData.bio && <p><strong>Bio:</strong> {formData.bio}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid() || isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {currentStep === 3 ? 'Create Profile' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorOnboarding;