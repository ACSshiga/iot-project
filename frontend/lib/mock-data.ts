// モックデータの型定義
export interface PowerData {
  timestamp: string;
  power: number;       // 瞬時電力（W）
  totalPower: number;  // 1時間あたりの電力量（Wh）
}

// 指定された日付の24時間分のモックデータを生成（工場想定）
export function generateHourlyData(date: Date = new Date()): PowerData[] {
  const data: PowerData[] = [];
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const isWeekend = startOfDay.getDay() === 0 || startOfDay.getDay() === 6;

  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(startOfDay);
    timestamp.setHours(i);

    let basePower = 200; // 夜間・週末デフォルト

    // 平日かつ8時〜18時は工場稼働（高め）
    if (!isWeekend && i >= 8 && i < 18) {
      basePower = 1000;
    }

    // ±15%の変動を加える
    const variation = basePower * 0.3 * (Math.random() - 0.5);
    const power = Math.floor(basePower + variation);
    const finalPower = Math.max(100, Math.min(2000, power));

    data.push({
      timestamp: timestamp.toISOString(),
      power: finalPower,
      totalPower: finalPower // 1時間維持を前提にWhとする
    });
  }

  return data;
}

// 指定された月の日次データを生成（工場想定）
export function generateDailyData(date: Date = new Date()): PowerData[] {
  const data: PowerData[] = [];
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  for (let day = new Date(startOfMonth); day <= endOfMonth; day.setDate(day.getDate() + 1)) {
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;

    // 平日: フル稼働、週末: 軽稼働
    const baseUsage = isWeekend ? 15000 : 38000;
    const variation = baseUsage * 0.2 * (Math.random() - 0.5);
    const finalUsage = Math.floor(baseUsage + variation);

    data.push({
      timestamp: new Date(day).toISOString(),
      power: finalUsage,
      totalPower: finalUsage
    });
  }

  return data;
}

// サマリーデータの型定義
export interface PowerSummary {
  totalPower: number;    // 全体の総電力量（Wh）
  averagePower: number;  // 平均瞬時電力（W）
  maxPower: number;      // 最大瞬時電力（W）
}

// サマリーデータの生成（calculate → generateSummary に変更済み）
export function generateSummary(data: PowerData[]): PowerSummary {
  const totalPower = data.reduce((sum, item) => sum + item.totalPower, 0);
  const averagePower = totalPower / data.length;
  const maxPower = Math.max(...data.map(d => d.power));

  return {
    totalPower,
    averagePower: Math.floor(averagePower),
    maxPower
  };
}
