// モックデータの型定義
export interface PowerData {
  timestamp: string;
  power: number;
  totalPower: number; // 1時間あたりの電力量（Wh）を追加
}

// 指定された日付の24時間分のモックデータを生成
export function generateHourlyData(date: Date = new Date()): PowerData[] {
  const data: PowerData[] = [];
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(startOfDay);
    timestamp.setHours(i);
    
    // 時間帯によって電力使用量のパターンを変える
    let basePower = 300; // 基本電力（W）
    if (i >= 7 && i <= 9) { // 朝の時間帯
      basePower = 1000;
    } else if (i >= 17 && i <= 22) { // 夕方〜夜の時間帯
      basePower = 200;
    }
    
    // ±20%の範囲でランダムな変動を加える
    const variation = basePower * 0.4 * (Math.random() - 0.5);
    const power = Math.floor(basePower + variation);
    const finalPower = Math.max(300, Math.min(2000, power));
    
    data.push({
      timestamp: timestamp.toISOString(),
      power: finalPower, // 瞬時電力（W）
      totalPower: finalPower // 1時間あたりの電力量（Wh）
    });
  }
  
  return data;
}

// 指定された月の日次データを生成
export function generateDailyData(date: Date = new Date()): PowerData[] {
  const data: PowerData[] = [];
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  
  for (let day = new Date(startOfMonth); day <= endOfMonth; day.setDate(day.getDate() + 1)) {
    // 平日と週末で使用量を変える
    const isWeekend = day.getDay() === 0 || day.getDay() === 6;
    const baseUsage = isWeekend ? 32000 : 38000;
    const variation = baseUsage * 0.2 * (Math.random() - 0.5);
    
    data.push({
      timestamp: new Date(day).toISOString(),
      power: Math.floor(baseUsage + variation),
      totalPower: Math.floor(baseUsage + variation)
    });
  }
  
  return data;
}

// サマリーデータの型定義
export interface PowerSummary {
  totalPower: number;
  averagePower: number;
  maxPower: number;
}

// サマリーデータの生成
export function generateSummary(): PowerSummary {
  return {
    totalPower: 145200, // kWh
    averagePower: 850,  // W
    maxPower: 2100,     // W
  };
}