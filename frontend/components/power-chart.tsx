'use client';

import { PowerData } from '@/lib/mock-data';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { ja } from 'date-fns/locale';

interface PowerChartProps {
  data: PowerData[];
  type: 'hourly' | 'daily';
}

export default function PowerChart({ data, type }: PowerChartProps) {
  const formatDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    return type === 'hourly'
      ? format(date, 'H時', { locale: ja })
      : format(date, 'M/d', { locale: ja });
  };

  const formatPower = (value: number) => {
    if (type === 'hourly') {
      return `${value.toLocaleString()} Wh`;
    }
    return `${value.toLocaleString()} kWh`;
  };

  const commonAxisProps = {
    scale: 'auto',
    padding: { left: 20, right: 20 }
  };

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {type === 'hourly' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatDate}
              interval={0}
              {...commonAxisProps}
            />
            <YAxis
              tickFormatter={(value) => `${value} Wh`}
              {...commonAxisProps}
            />
            <Tooltip
              labelFormatter={formatDate}
              formatter={(value: number) => [formatPower(value), '電力量']}
            />
            <ReferenceLine y={0} stroke="#000" />
            <Bar
              dataKey="totalPower"
              fill="hsl(var(--primary))"
              name="1時間あたりの電力量"
            />
          </BarChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatDate}
              interval="preserveStartEnd"
              {...commonAxisProps}
            />
            <YAxis
              tickFormatter={(value) => `${value} kWh`}
              {...commonAxisProps}
            />
            <Tooltip
              labelFormatter={formatDate}
              formatter={(value: number) => [formatPower(value), '電力量']}
            />
            <ReferenceLine y={0} stroke="#000" />
            <Bar
              dataKey="power"
              fill="hsl(var(--primary))"
              name="1日あたりの電力量"
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}