'use client';

import React, { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, addDays } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const hours = Array.from({ length: 25 }, (_, i) => i.toString().padStart(2, '0'));

const dataByDate: Record<string, { time: string; energy: number }[]> = {
  '2025-03-08': [
    { time: '00', energy: 0.8 },
    { time: '01', energy: 0.6 },
    { time: '02', energy: 0.5 },
    { time: '03', energy: 0.4 },
    { time: '04', energy: 0.3 },
    { time: '05', energy: 0.5 },
    { time: '07', energy: 1.2 },
    { time: '08', energy: 1.2 },
  ],
  '2025-03-09': [
    { time: '00', energy: 0.2 },
    { time: '01', energy: 0.5 },
    { time: '02', energy: 0.9 },
    { time: '03', energy: 1.0 },
    { time: '04', energy: 0.1 },
    { time: '05', energy: 0.5 },
    { time: '07', energy: 1.2 },
    { time: '08', energy: 1.2 },
    { time: '12', energy: 1.2 },
  ],
};

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  // 24時間分のデータを生成
  const selectedData = useMemo(() => {
    const dailyData = dataByDate[formattedDate] || [];
    return hours.map((hour) => {
      const found = dailyData.find((d) => d.time === hour);
      return { time: `${hour}:00`, energy: found ? found.energy : 0 };
    });
  }, [formattedDate]);

  // 総使用電力量
  const totalEnergy = useMemo(
    () => selectedData.reduce((sum: number, entry) => sum + entry.energy, 0).toFixed(2),
    [selectedData]
  );

  // 前後の日付へ移動
  const goPreviousDay = () => setSelectedDate((prev) => addDays(prev, -1));
  const goNextDay = () => setSelectedDate((prev) => addDays(prev, 1));

  return (
    <div className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-4xl shadow-lg rounded-2xl bg-white">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <CardTitle className="text-2xl font-bold text-gray-800">
            電力量推移ダッシュボード
          </CardTitle>
          <div className="flex items-center gap-2">
            <button
              onClick={goPreviousDay}
              className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              <ChevronLeft />
            </button>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
              dateFormat="yyyy年MM月dd日"
              locale={ja}
              className="border p-2 rounded-lg shadow text-center cursor-pointer"
              calendarClassName="my-datepicker" // ★ カレンダー用カスタムクラス
              onKeyDown={(e) => e.preventDefault()}
              onFocus={(e) => e.target.blur()}
            />
            <button
              onClick={goNextDay}
              className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            >
              <ChevronRight />
            </button>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">
              {format(selectedDate, 'yyyy年MM月dd日', { locale: ja })} の総使用電力量: {totalEnergy} kWh
            </span>
          </div>

          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={selectedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis unit=" kWh" domain={[0, 'dataMax + 1']} />
              <Tooltip formatter={(value) => `${value} kWh`} />
              <Bar dataKey="energy" fill="#4CAF50" />
              {/* 折れ線グラフ: 補助表示のみ */}
              <Line type="monotone" dataKey="energy" stroke="#4CAF50" dot={false} activeDot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
