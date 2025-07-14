import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Calendar, Plus, Edit, Trash2 } from 'lucide-react';

const Revenue = () => {
  const [revenueData, setRevenueData] = useState([
    { month: 'January 2024', amount: 0, growth: 0 },
    { month: 'February 2024', amount: 0, growth: 0 },
    { month: 'March 2024', amount: 0, growth: 0 },
    { month: 'April 2024', amount: 0, growth: 0 },
    { month: 'May 2024', amount: 0, growth: 0 },
    { month: 'June 2024', amount: 0, growth: 0 },
  ]);

  const [isAddingRevenue, setIsAddingRevenue] = useState(false);
  const [newRevenue, setNewRevenue] = useState({
    month: '',
    amount: '',
  });

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);
  const currentMonth = revenueData[revenueData.length - 1]?.amount || 0;
  const previousMonth = revenueData[revenueData.length - 2]?.amount || 0;
  const monthlyGrowth = previousMonth > 0 ? ((currentMonth - previousMonth) / previousMonth) * 100 : 0;

  const handleAddRevenue = () => {
    if (newRevenue.month && newRevenue.amount) {
      const amount = parseFloat(newRevenue.amount);
      const growth = revenueData.length > 0 ? 
        ((amount - revenueData[revenueData.length - 1].amount) / revenueData[revenueData.length - 1].amount) * 100 : 0;
      
      setRevenueData([...revenueData, { 
        month: newRevenue.month, 
        amount, 
        growth 
      }]);
      setNewRevenue({ month: '', amount: '' });
      setIsAddingRevenue(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Revenue Tracking</h1>
          <p className="text-muted-foreground mt-1">
            Track and showcase your transparent revenue journey
          </p>
        </div>
        <Button onClick={() => setIsAddingRevenue(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Revenue
        </Button>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Month</p>
                <p className="text-2xl font-bold">${currentMonth.toLocaleString()}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Growth</p>
                <p className="text-2xl font-bold">{monthlyGrowth.toFixed(1)}%</p>
              </div>
              <TrendingUp className={`h-8 w-8 ${monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Revenue Form */}
      {isAddingRevenue && (
        <Card>
          <CardHeader>
            <CardTitle>Add Revenue Data</CardTitle>
            <CardDescription>
              Add your monthly revenue to track your growth journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <Input
                  id="month"
                  type="month"
                  value={newRevenue.month}
                  onChange={(e) => setNewRevenue({ ...newRevenue, month: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Revenue Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="5000"
                  value={newRevenue.amount}
                  onChange={(e) => setNewRevenue({ ...newRevenue, amount: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddRevenue}>Add Revenue</Button>
              <Button variant="outline" onClick={() => setIsAddingRevenue(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Revenue History */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue History</CardTitle>
          <CardDescription>
            Your monthly revenue breakdown and growth metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.month}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.amount.toLocaleString()} revenue
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={item.growth >= 0 ? 'default' : 'destructive'}>
                    {item.growth >= 0 ? '+' : ''}{item.growth.toFixed(1)}%
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transparency Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Transparency Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-blue-600 text-sm font-bold">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Be Honest About Your Numbers</h4>
                <p className="text-sm text-muted-foreground">
                  Share your real revenue data, including both highs and lows. This builds trust with your audience.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-green-600 text-sm font-bold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Update Regularly</h4>
                <p className="text-sm text-muted-foreground">
                  Keep your revenue data current. Monthly updates help show consistent growth and transparency.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                <span className="text-purple-600 text-sm font-bold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Share Your Story</h4>
                <p className="text-sm text-muted-foreground">
                  Explain the context behind your revenue changes. What strategies worked? What didn't?
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Revenue;