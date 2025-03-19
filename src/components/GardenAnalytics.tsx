
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Leaf, TrendingUp, CalendarDays, LayoutGrid } from 'lucide-react';

// Sample analytics data
const monthlyGrowthData = [
  { name: 'Jan', growth: 10 },
  { name: 'Feb', growth: 15 },
  { name: 'Mar', growth: 25 },
  { name: 'Apr', growth: 40 },
  { name: 'May', growth: 65 },
  { name: 'Jun', growth: 80 },
  { name: 'Jul', growth: 85 },
  { name: 'Aug', growth: 75 },
  { name: 'Sep', growth: 60 },
  { name: 'Oct', growth: 40 },
  { name: 'Nov', growth: 25 },
  { name: 'Dec', growth: 15 },
];

const plantDistributionData = [
  { name: 'Vegetables', value: 45 },
  { name: 'Herbs', value: 20 },
  { name: 'Flowers', value: 25 },
  { name: 'Fruits', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const gardenActivityData = [
  { day: 'Monday', hours: 1.5 },
  { day: 'Tuesday', hours: 0.5 },
  { day: 'Wednesday', hours: 2 },
  { day: 'Thursday', hours: 0 },
  { day: 'Friday', hours: 1 },
  { day: 'Saturday', hours: 3.5 },
  { day: 'Sunday', hours: 2.5 },
];

const GardenAnalytics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <TrendingUp className="h-5 w-5 mr-2" />
          Garden Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="growth" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="growth" className="flex items-center">
              <Leaf className="h-4 w-4 mr-2" />
              Plant Growth
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex items-center">
              <LayoutGrid className="h-4 w-4 mr-2" />
              Distribution
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="growth">
            <div className="space-y-4">
              <h3 className="text-base font-medium">Monthly Plant Growth</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Track the overall growth of your garden throughout the year
              </p>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="growth"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="distribution">
            <div className="space-y-4">
              <h3 className="text-base font-medium">Plant Distribution</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Breakdown of plant types in your garden
              </p>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={plantDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {plantDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="space-y-4">
              <h3 className="text-base font-medium">Weekly Gardening Activity</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hours spent gardening over the last week
              </p>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gardenActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hours" fill="#82ca9d" name="Hours Spent" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GardenAnalytics;
