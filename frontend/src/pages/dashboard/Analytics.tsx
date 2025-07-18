import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Eye, MousePointer, Users, TrendingUp } from 'lucide-react';

interface AnalyticsData {
  creator_id: string;
  creator_name: string;
  profile_views: number;
  profile_views_7d: number;
  profile_views_30d: number;
  website_clicks: number;
  social_clicks: number;
  contact_clicks: number;
  total_clicks_7d: number;
  total_clicks_30d: number;
}

interface CourseAnalytics {
  course_id: string;
  course_title: string;
  page_views: number;
  page_views_7d: number;
  course_clicks: number;
  course_clicks_7d: number;
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [courseAnalytics, setCourseAnalytics] = useState<CourseAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        // Get creator analytics
        const { data: creatorData, error: creatorError } = await supabase
          .from('creator_analytics')
          .select('*')
          .limit(1);

        if (creatorError) throw creatorError;

        if (creatorData && creatorData.length > 0) {
          setAnalytics(creatorData[0]);

          // Get course analytics for this creator
          const { data: courseData, error: courseError } = await supabase
            .from('course_analytics')
            .select('*')
            .eq('creator_id', creatorData[0].creator_id);

          if (courseError) throw courseError;
          setCourseAnalytics(courseData || []);
        }
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Track your profile views and link clicks to understand your audience.
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">
              No analytics data available yet. Start getting traffic to see your stats!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const clickData = [
    { name: 'Website', value: analytics.website_clicks },
    { name: 'Social', value: analytics.social_clicks },
    { name: 'Contact', value: analytics.contact_clicks },
  ];

  const conversionRate = analytics.profile_views_30d > 0 
    ? ((analytics.total_clicks_30d / analytics.profile_views_30d) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Track your profile views and link clicks to understand your audience.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.profile_views}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.profile_views_7d} in last 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.website_clicks + analytics.social_clicks + analytics.contact_clicks}
            </div>
            <p className="text-xs text-muted-foreground">
              {analytics.total_clicks_7d} in last 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              Views to clicks (30 days)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseAnalytics.length}</div>
            <p className="text-xs text-muted-foreground">
              Total courses tracked
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Link Clicks Breakdown</CardTitle>
            <CardDescription>Distribution of clicks by link type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clickData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>Views and clicks for your courses</CardDescription>
          </CardHeader>
          <CardContent>
            {courseAnalytics.length > 0 ? (
              <div className="space-y-4">
                {courseAnalytics.slice(0, 5).map((course) => (
                  <div key={course.course_id} className="flex justify-between items-center">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{course.course_title}</p>
                      <p className="text-xs text-muted-foreground">
                        {course.page_views} views • {course.course_clicks} clicks
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {course.page_views_7d > 0 && `+${course.page_views_7d} this week`}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No course data available yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key metrics and recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Website Clicks</h4>
              <p className="text-2xl font-bold text-primary">{analytics.website_clicks}</p>
              <p className="text-sm text-muted-foreground">People visiting your website</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Social Engagement</h4>
              <p className="text-2xl font-bold text-primary">{analytics.social_clicks}</p>
              <p className="text-sm text-muted-foreground">Social media clicks</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Contact Inquiries</h4>
              <p className="text-2xl font-bold text-primary">{analytics.contact_clicks}</p>
              <p className="text-sm text-muted-foreground">People wanting to connect</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}