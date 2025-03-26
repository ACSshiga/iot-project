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
    
    // 平日と週末を判定
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    // 時間帯によって電力使用量のパターンを変える
    let basePower = isWeekend ? 300 : 500; // 週末は基本電力が低い
    if (i >= 6 && i <= 7) { // 早朝の時間帯
      basePower = isWeekend ? 400 : 800 + (i - 6) * 200; // 週末は上昇幅が小さい
    } else if (i >= 8 && i <= 17) { // 日中（工場稼働時間）
      basePower = isWeekend ? 500 : 2000; // 週末は低電力
    } else if (i >= 18 && i <= 19) { // 夕方の時間帯
      basePower = isWeekend ? 400 : 1500 - (i - 18) * 500; // 週末は低電力
    } else if (i >= 20 && i <= 23) { // 夜間
      basePower = isWeekend ? 300 : 500; // 週末は低電力
    }
    
    // ±10%の範囲でランダムな変動を加える
    const variation = basePower * 0.2 * (Math.random() - 0.5);
    const power = Math.floor(basePower + variation);
    const finalPower = Math.max(200, Math.min(isWeekend ? 600 : 2500, power)); // 週末は最大電力も低い
    
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
    const baseUsage = isWeekend ? 15000 : 45000; // 週末は大幅に低く
    const variation = baseUsage * 0.1 * (Math.random() - 0.5);
    
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
    totalPower: 45000, // kWh（1日の合計）
    averagePower: 1875,  // W（平均電力）
    maxPower: 2500,     // W（最大電力）
  };
}