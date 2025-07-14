import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, Edit, Trash2, ExternalLink, Users, DollarSign, Star } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  students: number;
  rating: number;
  url: string;
  status: 'draft' | 'published';
  category: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Complete React Developer Course',
      description: 'Learn React from scratch with hands-on projects and real-world examples.',
      price: 99,
      students: 1250,
      rating: 4.8,
      url: 'https://example.com/react-course',
      status: 'published',
      category: 'Web Development'
    },
    {
      id: '2',
      title: 'Advanced JavaScript Mastery',
      description: 'Master advanced JavaScript concepts and modern ES6+ features.',
      price: 149,
      students: 890,
      rating: 4.9,
      url: 'https://example.com/js-course',
      status: 'published',
      category: 'Web Development'
    }
  ]);

  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    price: '',
    url: '',
    category: '',
  });

  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const totalRevenue = courses.reduce((sum, course) => sum + (course.price * course.students), 0);
  const avgRating = courses.reduce((sum, course) => sum + course.rating, 0) / courses.length;

  const handleAddCourse = () => {
    if (newCourse.title && newCourse.description && newCourse.price && newCourse.url) {
      const course: Course = {
        id: Date.now().toString(),
        title: newCourse.title,
        description: newCourse.description,
        price: parseFloat(newCourse.price),
        students: 0,
        rating: 0,
        url: newCourse.url,
        status: 'draft',
        category: newCourse.category || 'General'
      };
      
      setCourses([...courses, course]);
      setNewCourse({ title: '', description: '', price: '', url: '', category: '' });
      setIsAddingCourse(false);
    }
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const toggleCourseStatus = (id: string) => {
    setCourses(courses.map(course => 
      course.id === id 
        ? { ...course, status: course.status === 'published' ? 'draft' : 'published' }
        : course
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="text-muted-foreground mt-1">
            Showcase your courses and attract students
          </p>
        </div>
        <Button onClick={() => setIsAddingCourse(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Course Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Course Form */}
      {isAddingCourse && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
            <CardDescription>
              Add a new course to showcase on your creator profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="Complete React Developer Course"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="Web Development"
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what students will learn in this course..."
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="99"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">Course URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com/my-course"
                    value={newCourse.url}
                    onChange={(e) => setNewCourse({ ...newCourse, url: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={handleAddCourse}>Add Course</Button>
              <Button variant="outline" onClick={() => setIsAddingCourse(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Courses List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Courses</CardTitle>
          <CardDescription>
            Manage and showcase your course offerings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="border rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{course.title}</h3>
                      <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                        {course.status}
                      </Badge>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{course.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-semibold">${course.price}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Students</p>
                        <p className="font-semibold">{course.students.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="font-semibold">{course.rating > 0 ? `${course.rating}/5` : 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="font-semibold">${(course.price * course.students).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCourseStatus(course.id)}
                    >
                      {course.status === 'published' ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={course.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course Success Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Course Success Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                <span className="text-primary text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Clear Value Proposition</h4>
                <p className="text-sm text-muted-foreground">
                  Clearly describe what students will learn and achieve after completing your course.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mt-1">
                <span className="text-accent text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Update Student Numbers</h4>
                <p className="text-sm text-muted-foreground">
                  Keep your student counts and ratings current to build social proof and credibility.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-secondary/50 rounded-full flex items-center justify-center mt-1">
                <span className="text-primary text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Link to Course Platform</h4>
                <p className="text-sm text-muted-foreground">
                  Make sure your course URLs are working and lead to the actual course purchase page.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Courses;