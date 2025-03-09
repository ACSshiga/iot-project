'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CalendarIcon, Zap } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import PowerChart from '@/components/power-chart';
import { generateHourlyData, generateDailyData, generateSummary } from '@/lib/mock-data';

export default function Dashboard() {
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [hourlyData, setHourlyData] = useState(() => generateHourlyData(date));
  const [dailyData, setDailyData] = useState(() => generateDailyData(date));
  const [summary, setSummary] = useState(() => generateSummary());

  // 日付が変更されたときにデータを更新
  useEffect(() => {
    setHourlyData(generateHourlyData(date));
    setDailyData(generateDailyData(date));
  }, [date]);

  // 自動更新はサマリーのみに適用
  useEffect(() => {
    if (!autoUpdate) return;

    const interval = setInterval(() => {
      setSummary(generateSummary());
    }, 10000);

    return () => clearInterval(interval);
  }, [autoUpdate]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">電力モニタリングダッシュボード</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-update"
                checked={autoUpdate}
                onCheckedChange={setAutoUpdate}
              />
              <Label htmlFor="auto-update">自動更新</Label>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(date, 'PPP', { locale: ja })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  locale={ja}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">総使用電力量</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalPower.toLocaleString()} kWh</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均電力</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.averagePower.toLocaleString()} W</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">最大電力</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.maxPower.toLocaleString()} W</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="hourly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="hourly">時間別</TabsTrigger>
            <TabsTrigger value="daily">日別</TabsTrigger>
          </TabsList>
          <TabsContent value="hourly" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {format(date, 'yyyy年M月d日', { locale: ja })}の時間別電力量
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PowerChart data={hourlyData} type="hourly" />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="daily" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {format(date, 'yyyy年M月', { locale: ja })}の日別電力量
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PowerChart data={dailyData} type="daily" />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}