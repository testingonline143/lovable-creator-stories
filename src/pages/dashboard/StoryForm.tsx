import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Send, Plus, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface StorySection {
  id?: string;
  section_type: string;
  content: string;
  metadata: any;
  sort_order: number;
}

type StoryCategory = 'course_creation' | 'coaching' | 'digital_products' | 'saas' | 'consulting' | 'content_creation' | 'ecommerce' | 'other';
type StoryStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'published';

interface StoryFormData {
  title: string;
  subtitle: string;
  category: StoryCategory;
  timeframe_start: string;
  timeframe_end: string;
  revenue_before: number;
  revenue_after: number;
  key_metrics: Array<{ label: string; before: string; after: string }>;
  tags: string[];
  featured_image_url: string;
}

const categories = [
  { value: 'course_creation', label: 'Course Creation' },
  { value: 'coaching', label: 'Coaching' },
  { value: 'digital_products', label: 'Digital Products' },
  { value: 'saas', label: 'SaaS' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'content_creation', label: 'Content Creation' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'other', label: 'Other' },
];

const sectionTypes = [
  { value: 'heading', label: 'Heading' },
  { value: 'paragraph', label: 'Paragraph' },
  { value: 'quote', label: 'Quote' },
  { value: 'takeaway', label: 'Key Takeaway' },
];

const StoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basics");
  
  const [formData, setFormData] = useState<StoryFormData>({
    title: "",
    subtitle: "",
    category: "other",
    timeframe_start: "",
    timeframe_end: "",
    revenue_before: 0,
    revenue_after: 0,
    key_metrics: [],
    tags: [],
    featured_image_url: "",
  });

  const [sections, setSections] = useState<StorySection[]>([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (isEditing) {
      loadStory();
    }
  }, [id]);

  const loadStory = async () => {
    if (!id) return;

    try {
      const { data: story, error: storyError } = await supabase
        .from('story_submissions')
        .select('*')
        .eq('id', id)
        .single();

      if (storyError) throw storyError;

      const { data: sectionsData, error: sectionsError } = await supabase
        .from('story_sections')
        .select('*')
        .eq('story_id', id)
        .order('sort_order');

      if (sectionsError) throw sectionsError;

      setFormData({
        title: story.title || "",
        subtitle: story.subtitle || "",
        category: (story.category as StoryCategory) || "other",
        timeframe_start: story.timeframe_start || "",
        timeframe_end: story.timeframe_end || "",
        revenue_before: story.revenue_before || 0,
        revenue_after: story.revenue_after || 0,
        key_metrics: Array.isArray(story.key_metrics) ? story.key_metrics as Array<{ label: string; before: string; after: string }> : [],
        tags: Array.isArray(story.tags) ? story.tags : [],
        featured_image_url: story.featured_image_url || "",
      });

      setSections(sectionsData || []);
    } catch (error) {
      console.error('Error loading story:', error);
      toast({
        title: "Error",
        description: "Failed to load story",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addMetric = () => {
    setFormData(prev => ({
      ...prev,
      key_metrics: [...prev.key_metrics, { label: "", before: "", after: "" }]
    }));
  };

  const updateMetric = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      key_metrics: prev.key_metrics.map((metric, i) => 
        i === index ? { ...metric, [field]: value } : metric
      )
    }));
  };

  const removeMetric = (index: number) => {
    setFormData(prev => ({
      ...prev,
      key_metrics: prev.key_metrics.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const addSection = () => {
    const newSection: StorySection = {
      section_type: 'paragraph',
      content: '',
      metadata: {},
      sort_order: sections.length
    };
    setSections(prev => [...prev, newSection]);
  };

  const updateSection = (index: number, field: string, value: any) => {
    setSections(prev => prev.map((section, i) => 
      i === index ? { ...section, [field]: value } : section
    ));
  };

  const removeSection = (index: number) => {
    setSections(prev => prev.filter((_, i) => i !== index));
  };

  const saveDraft = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const storyData = {
        ...formData,
        user_id: user.id,
        status: 'draft' as StoryStatus
      };

      let storyId = id;

      if (isEditing) {
        const { error } = await supabase
          .from('story_submissions')
          .update(storyData)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('story_submissions')
          .insert(storyData)
          .select()
          .single();
        if (error) throw error;
        storyId = data.id;
      }

      // Save sections
      if (storyId) {
        // Delete existing sections if editing
        if (isEditing) {
          await supabase
            .from('story_sections')
            .delete()
            .eq('story_id', storyId);
        }

        // Insert new sections
        const sectionsToInsert = sections
          .filter(section => section.content.trim())
          .map((section, index) => ({
            story_id: storyId,
            section_type: section.section_type,
            content: section.content,
            metadata: section.metadata,
            sort_order: index
          }));

        if (sectionsToInsert.length > 0) {
          const { error } = await supabase
            .from('story_sections')
            .insert(sectionsToInsert);
          if (error) throw error;
        }
      }

      toast({
        title: "Draft saved",
        description: "Your story has been saved as a draft",
      });

      if (!isEditing && storyId) {
        navigate(`/dashboard/stories/edit/${storyId}`);
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Error",
        description: "Failed to save draft",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const submitStory = async () => {
    if (!formData.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your story",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      await saveDraft();
      
      const { error } = await supabase
        .from('story_submissions')
        .update({ 
          status: 'submitted',
          submitted_at: new Date().toISOString()
        })
        .eq('id', id || '');
      
      if (error) throw error;

      toast({
        title: "Story submitted",
        description: "Your story has been submitted for review",
      });

      navigate('/dashboard/stories');
    } catch (error) {
      console.error('Error submitting story:', error);
      toast({
        title: "Error",
        description: "Failed to submit story",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
          <div className="h-96 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/stories')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Stories
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEditing ? 'Edit Story' : 'Create New Story'}
          </h1>
          <p className="text-muted-foreground">
            Share your creator journey and inspire others
          </p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={saveDraft}
          disabled={saving}
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save Draft'}
        </Button>
        
        {isEditing && (
          <Button 
            onClick={submitStory}
            disabled={saving}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            Submit for Review
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basics">Basic Info</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="content">Story Content</TabsTrigger>
          <TabsTrigger value="tags">Tags & Finish</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="How I built a $100k online course business"
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="From zero to six figures in 18 months"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as StoryCategory }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timeframe_start">Journey Start Date</Label>
                  <Input
                    id="timeframe_start"
                    type="date"
                    value={formData.timeframe_start}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeframe_start: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="timeframe_end">Journey End Date</Label>
                  <Input
                    id="timeframe_end"
                    type="date"
                    value={formData.timeframe_end}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeframe_end: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="revenue_before">Revenue Before ($)</Label>
                  <Input
                    id="revenue_before"
                    type="number"
                    value={formData.revenue_before}
                    onChange={(e) => setFormData(prev => ({ ...prev, revenue_before: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <Label htmlFor="revenue_after">Revenue After ($)</Label>
                  <Input
                    id="revenue_after"
                    type="number"
                    value={formData.revenue_after}
                    onChange={(e) => setFormData(prev => ({ ...prev, revenue_after: Number(e.target.value) }))}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Key Metrics</Label>
                  <Button variant="outline" size="sm" onClick={addMetric} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Metric
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {formData.key_metrics.map((metric, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1">
                        <Input
                          placeholder="Metric name (e.g., Students)"
                          value={metric.label}
                          onChange={(e) => updateMetric(index, 'label', e.target.value)}
                        />
                      </div>
                      <div className="w-24">
                        <Input
                          placeholder="Before"
                          value={metric.before}
                          onChange={(e) => updateMetric(index, 'before', e.target.value)}
                        />
                      </div>
                      <div className="w-24">
                        <Input
                          placeholder="After"
                          value={metric.after}
                          onChange={(e) => updateMetric(index, 'after', e.target.value)}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeMetric(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Story Content</CardTitle>
                <Button variant="outline" size="sm" onClick={addSection} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Section
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {sections.map((section, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={section.section_type}
                      onValueChange={(value) => updateSection(index, 'section_type', value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sectionTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeSection(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Textarea
                    value={section.content}
                    onChange={(e) => updateSection(index, 'content', e.target.value)}
                    placeholder={`Enter your ${section.section_type} content here...`}
                    className="min-h-24"
                  />
                </div>
              ))}
              
              {sections.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No content sections yet.</p>
                  <p>Click "Add Section" to start writing your story.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tags" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tags & Featured Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  value={formData.featured_image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured_image_url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button variant="outline" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoryForm;