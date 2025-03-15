
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockProducts, getInventoryStats } from '@/data/mock-data';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const stats = getInventoryStats();
  
  const monthlySales = [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 19000 },
    { month: 'Mar', sales: 15000 },
    { month: 'Apr', sales: 21000 },
    { month: 'May', sales: 18000 },
    { month: 'Jun', sales: 23000 }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer 
                config={{
                  sales: {
                    label: "Sales",
                    color: "#3b82f6"
                  }
                }}
              >
                <BarChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent
                            active={active}
                            payload={payload}
                          />
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Inventory Value by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer 
                config={{
                  value: {
                    label: "Value",
                    color: "#10b981"
                  }
                }}
              >
                <BarChart data={stats.categories}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent
                            active={active}
                            payload={payload}
                            formatter={(value) => [`$${value.toFixed(2)}`, 'Value']}
                          />
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Reports;
