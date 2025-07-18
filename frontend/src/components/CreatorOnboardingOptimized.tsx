import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Loader2, 
  User, 
  Briefcase, 
  Globe, 
  CheckCircle,
  Youtube,
  Mail,
  Mic,
  BookOpen,
  Camera,
  Users,
  Zap,
  Calendar,
  ExternalLink,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  TrendingUp,
  Target,
  Award,
  PlusCircle
} from 'lucide-react';

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
  twitter_handle?: string;
  linkedin_url?: string;
  monthly_revenue?: number;
  year_started?: number;
  total_courses?: number;
  total_students?: number;
  badge_text?: string;
  achievements?: string[];
}

interface CreatorOnboardingOptimizedProps {
  onCreatorCreated: (creator: Creator) => void;
}

const CreatorOnboardingOptimized = ({ onCreatorCreated }: CreatorOnboardingOptimizedProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [checkingExisting, setCheckingExisting] = useState(true);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    name: '',
    location: '',
    bio: '',
    
    // Step 2: Creator Profile & Niche
    title: '',
    niche: '',
    experience_level: '',
    year_started: new Date().getFullYear(),
    primary_goal: '',
    
    // Step 3: Integrations & Links
    website: '',
    slug: '',
    twitter_handle: '',
    linkedin_url: '',
    instagram_url: '',
    github_url: '',
    
    // Integration placeholders
    calendly_url: '',
    beehiiv_url: '',
    substack_url: '',
    course_platforms: [] as string[],
    
    // Additional fields
    monthly_revenue: '',
    total_students: '',
    achievements: [] as string[],
  });
  
  const { toast } = useToast();

  // Creator niches with icons
  const creatorNiches = [
    { value: 'youtube', label: 'YouTube Creator', icon: Youtube, color: 'text-red-500' },
    { value: 'newsletter', label: 'Newsletter Creator', icon: Mail, color: 'text-blue-500' },
    { value: 'podcast', label: 'Podcaster', icon: Mic, color: 'text-purple-500' },
    { value: 'course', label: 'Course Creator', icon: BookOpen, color: 'text-green-500' },
    { value: 'content', label: 'Content Creator', icon: Camera, color: 'text-pink-500' },
    { value: 'community', label: 'Community Builder', icon: Users, color: 'text-indigo-500' },
    { value: 'saas', label: 'SaaS Creator', icon: Zap, color: 'text-orange-500' },
    { value: 'coach', label: 'Coach/Consultant', icon: Target, color: 'text-teal-500' },
  ];

  const experienceLevels = [
    { value: 'beginner', label: 'Just Starting (0-1 years)', description: 'Building my first audience' },
    { value: 'intermediate', label: 'Growing (1-3 years)', description: 'Scaling my creator business' },
    { value: 'advanced', label: 'Established (3+ years)', description: 'Successful creator with proven track record' },
  ];

  const primaryGoals = [
    { value: 'audience', label: 'Grow My Audience', icon: TrendingUp },
    { value: 'revenue', label: 'Increase Revenue', icon: Target },
    { value: 'courses', label: 'Launch Courses', icon: BookOpen },
    { value: 'brand', label: 'Build Personal Brand', icon: Award },
  ];

  const coursePlatforms = [
    { value: 'udemy', label: 'Udemy' },
    { value: 'teachable', label: 'Teachable' },
    { value: 'thinkific', label: 'Thinkific' },
    { value: 'gumroad', label: 'Gumroad' },
    { value: 'own_platform', label: 'Own Platform' },
  ];

  // Check if user already has a creator profile on component mount
  useEffect(() => {
    checkExistingProfile();
  }, []);

  const checkExistingProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: existingCreator } = await supabase
        .from('creators')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existingCreator) {
        onCreatorCreated(existingCreator);
        return;
      }
    } catch (error) {
      console.error('Error checking existing profile:', error);
    } finally {
      setCheckingExisting(false);
    }
  };

  const steps = [
    {
      number: 1,
      title: 'About You',
      description: 'Basic information',
      icon: User,
    },
    {
      number: 2,
      title: 'Creator Profile',
      description: 'Your niche & goals',
      icon: Briefcase,
    },
    {
      number: 3,
      title: 'Integrations',
      description: 'Links & platforms',
      icon: Globe,
    },
  ];

  const handleInputChange = (field: string, value: string | number | string[]) => {
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
      
      // Check if slug is already taken
      const { data: existingSlug } = await supabase
        .from('creators')
        .select('slug')
        .eq('slug', slug)
        .single();

      if (existingSlug) {
        throw new Error('This slug is already taken. Please choose a different one.');
      }

      // Check if user already has a creator profile
      const { data: existingCreator } = await supabase
        .from('creators')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (existingCreator) {
        throw new Error('You already have a creator profile.');
      }

      // Prepare social links object
      const socialLinks = {
        twitter: formData.twitter_handle,
        linkedin: formData.linkedin_url,
        instagram: formData.instagram_url,
        github: formData.github_url,
        calendly: formData.calendly_url,
        beehiiv: formData.beehiiv_url,
        substack: formData.substack_url,
        course_platforms: formData.course_platforms,
        niche: formData.niche,
        experience_level: formData.experience_level,
        primary_goal: formData.primary_goal,
      };

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
          twitter_handle: formData.twitter_handle,
          linkedin_url: formData.linkedin_url,
          monthly_revenue: formData.monthly_revenue ? parseFloat(formData.monthly_revenue) : null,
          year_started: formData.year_started,
          total_students: formData.total_students ? parseInt(formData.total_students) : null,
          social_links: socialLinks,
          achievements: formData.achievements,
          badge_text: formData.niche ? creatorNiches.find(n => n.value === formData.niche)?.label : null,
          is_public: false,
        })
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          if (error.message.includes('creators_user_id_key')) {
            throw new Error('You already have a creator profile.');
          } else if (error.message.includes('creators_slug_key')) {
            throw new Error('This slug is already taken. Please choose a different one.');
          }
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
        return formData.name.trim() !== '' && formData.bio.trim() !== '';
      case 2:
        return formData.title.trim() !== '' && formData.niche !== '' && formData.experience_level !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  const addAchievement = (achievement: string) => {
    if (achievement.trim() && !formData.achievements.includes(achievement)) {
      handleInputChange('achievements', [...formData.achievements, achievement]);
    }
  };

  const removeAchievement = (index: number) => {
    const newAchievements = formData.achievements.filter((_, i) => i !== index);
    handleInputChange('achievements', newAchievements);
  };

  if (checkingExisting) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Checking existing profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-card via-card to-card/80 border-border/50 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
            Create Your Creator Profile
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Let's build your professional creator presence in just a few steps
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex flex-col items-center flex-1">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-2 mb-3 transition-all duration-300
                    ${isActive 
                      ? 'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/50' 
                      : isCompleted 
                        ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/50'
                        : 'border-border text-muted-foreground bg-card'
                    }
                  `}>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <Icon className="h-6 w-6" />
                    )}
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-semibold ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`absolute top-6 left-1/2 w-full h-0.5 -z-10 ${isCompleted ? 'bg-green-500' : 'bg-border'}`} 
                         style={{ transform: `translateX(${index * 100}%)`, width: '100%' }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step Content */}
          <div className="space-y-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Tell us about yourself</h3>
                  <p className="text-muted-foreground">Let's start with the basics</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="e.g., San Francisco, CA"
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">Bio *</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself and your creator journey. What makes you unique?"
                    rows={4}
                    className="resize-none"
                    required
                  />
                  <p className="text-xs text-muted-foreground">This will be shown on your public profile</p>
                </div>
              </div>
            )}

            {/* Step 2: Creator Profile & Niche */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Define your creator identity</h3>
                  <p className="text-muted-foreground">Help others understand what you do</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">Professional Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Full Stack Developer, Content Creator, Business Coach"
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Creator Niche *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {creatorNiches.map((niche) => {
                      const Icon = niche.icon;
                      const isSelected = formData.niche === niche.value;
                      return (
                        <button
                          key={niche.value}
                          type="button"
                          onClick={() => handleInputChange('niche', niche.value)}
                          className={`
                            p-4 rounded-lg border-2 transition-all duration-200 text-left
                            ${isSelected 
                              ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' 
                              : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                            }
                          `}
                        >
                          <Icon className={`h-6 w-6 mb-2 ${isSelected ? 'text-primary' : niche.color}`} />
                          <p className={`font-medium text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                            {niche.label}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Experience Level *</Label>
                  <div className="space-y-2">
                    {experienceLevels.map((level) => {
                      const isSelected = formData.experience_level === level.value;
                      return (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => handleInputChange('experience_level', level.value)}
                          className={`
                            w-full p-4 rounded-lg border-2 transition-all duration-200 text-left
                            ${isSelected 
                              ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' 
                              : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                {level.label}
                              </p>
                              <p className="text-sm text-muted-foreground">{level.description}</p>
                            </div>
                            {isSelected && <CheckCircle className="h-5 w-5 text-primary" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="year_started" className="text-sm font-medium">Year Started</Label>
                    <Input
                      id="year_started"
                      type="number"
                      value={formData.year_started}
                      onChange={(e) => handleInputChange('year_started', parseInt(e.target.value))}
                      placeholder="2020"
                      className="h-11"
                      min="2000"
                      max={new Date().getFullYear()}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Primary Goal</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {primaryGoals.map((goal) => {
                        const Icon = goal.icon;
                        const isSelected = formData.primary_goal === goal.value;
                        return (
                          <button
                            key={goal.value}
                            type="button"
                            onClick={() => handleInputChange('primary_goal', goal.value)}
                            className={`
                              p-3 rounded-lg border-2 transition-all duration-200 text-center
                              ${isSelected 
                                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' 
                                : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
                              }
                            `}
                          >
                            <Icon className={`h-5 w-5 mx-auto mb-1 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                            <p className={`text-xs font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                              {goal.label}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Integrations & Links */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Connect your platforms</h3>
                  <p className="text-muted-foreground">Link your existing content and booking systems</p>
                </div>

                {/* Basic Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Basic Information</h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-sm font-medium">Website</Label>
                      <Input
                        id="website"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="h-11"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="slug" className="text-sm font-medium">Profile URL</Label>
                      <div className="flex items-center">
                        <span className="text-muted-foreground text-sm mr-1 bg-muted px-3 py-2 rounded-l-md border border-r-0">
                          creatorstory.app/
                        </span>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => handleInputChange('slug', e.target.value)}
                          placeholder={generateSlug(formData.name) || 'your-name'}
                          className="h-11 rounded-l-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Social Media Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Social Media
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitter" className="text-sm font-medium flex items-center gap-2">
                        <Twitter className="h-4 w-4" />
                        Twitter Handle
                      </Label>
                      <Input
                        id="twitter"
                        value={formData.twitter_handle}
                        onChange={(e) => handleInputChange('twitter_handle', e.target.value)}
                        placeholder="@yourusername"
                        className="h-11"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="text-sm font-medium flex items-center gap-2">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn URL
                      </Label>
                      <Input
                        id="linkedin"
                        value={formData.linkedin_url}
                        onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className="h-11"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="text-sm font-medium flex items-center gap-2">
                        <Instagram className="h-4 w-4" />
                        Instagram URL
                      </Label>
                      <Input
                        id="instagram"
                        value={formData.instagram_url}
                        onChange={(e) => handleInputChange('instagram_url', e.target.value)}
                        placeholder="https://instagram.com/yourusername"
                        className="h-11"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="github" className="text-sm font-medium flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub URL
                      </Label>
                      <Input
                        id="github"
                        value={formData.github_url}
                        onChange={(e) => handleInputChange('github_url', e.target.value)}
                        placeholder="https://github.com/yourusername"
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Creator Platform Integrations */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Platform Integrations
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="calendly" className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Calendly URL
                      </Label>
                      <Input
                        id="calendly"
                        value={formData.calendly_url}
                        onChange={(e) => handleInputChange('calendly_url', e.target.value)}
                        placeholder="https://calendly.com/yourusername"
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground">For booking calls and consultations</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="beehiiv" className="text-sm font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Beehiiv Newsletter
                      </Label>
                      <Input
                        id="beehiiv"
                        value={formData.beehiiv_url}
                        onChange={(e) => handleInputChange('beehiiv_url', e.target.value)}
                        placeholder="https://yourusername.beehiiv.com"
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground">Your Beehiiv newsletter URL</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="substack" className="text-sm font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Substack Newsletter
                      </Label>
                      <Input
                        id="substack"
                        value={formData.substack_url}
                        onChange={(e) => handleInputChange('substack_url', e.target.value)}
                        placeholder="https://yourusername.substack.com"
                        className="h-11"
                      />
                      <p className="text-xs text-muted-foreground">Your Substack newsletter URL</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Course Platforms
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {coursePlatforms.map((platform) => (
                          <button
                            key={platform.value}
                            type="button"
                            onClick={() => {
                              const currentPlatforms = formData.course_platforms || [];
                              const isSelected = currentPlatforms.includes(platform.value);
                              if (isSelected) {
                                handleInputChange('course_platforms', currentPlatforms.filter(p => p !== platform.value));
                              } else {
                                handleInputChange('course_platforms', [...currentPlatforms, platform.value]);
                              }
                            }}
                            className={`
                              p-2 text-xs rounded-md border transition-all duration-200
                              ${(formData.course_platforms || []).includes(platform.value)
                                ? 'border-primary bg-primary/10 text-primary' 
                                : 'border-border bg-card hover:border-primary/50'
                              }
                            `}
                          >
                            {platform.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">Where you sell your courses</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Optional Statistics */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Your Success (Optional)
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="monthly_revenue" className="text-sm font-medium">Monthly Revenue ($)</Label>
                      <Input
                        id="monthly_revenue"
                        type="number"
                        value={formData.monthly_revenue}
                        onChange={(e) => handleInputChange('monthly_revenue', e.target.value)}
                        placeholder="5000"
                        className="h-11"
                        min="0"
                      />
                      <p className="text-xs text-muted-foreground">Helps build transparency and trust</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="total_students" className="text-sm font-medium">Total Students/Followers</Label>
                      <Input
                        id="total_students"
                        type="number"
                        value={formData.total_students}
                        onChange={(e) => handleInputChange('total_students', e.target.value)}
                        placeholder="1000"
                        className="h-11"
                        min="0"
                      />
                      <p className="text-xs text-muted-foreground">Across all your platforms</p>
                    </div>
                  </div>
                </div>

                {/* Profile Summary */}
                <div className="bg-muted/30 p-6 rounded-lg border border-border/50">
                  <h4 className="font-semibold mb-3 text-foreground">Profile Summary</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><span className="font-medium">Name:</span> {formData.name}</p>
                      <p><span className="font-medium">Title:</span> {formData.title}</p>
                      <p><span className="font-medium">Niche:</span> {formData.niche ? creatorNiches.find(n => n.value === formData.niche)?.label : 'Not selected'}</p>
                      {formData.location && <p><span className="font-medium">Location:</span> {formData.location}</p>}
                    </div>
                    <div>
                      {formData.website && <p><span className="font-medium">Website:</span> {formData.website}</p>}
                      {formData.twitter_handle && <p><span className="font-medium">Twitter:</span> {formData.twitter_handle}</p>}
                      {formData.calendly_url && <p><span className="font-medium">Booking:</span> Calendly connected</p>}
                      {(formData.beehiiv_url || formData.substack_url) && <p><span className="font-medium">Newsletter:</span> Connected</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-6 border-t border-border/50">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6"
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleNext}
                disabled={!isStepValid() || isLoading}
                className="px-8"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {currentStep === 3 ? 'Create Profile' : 'Next'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatorOnboardingOptimized;