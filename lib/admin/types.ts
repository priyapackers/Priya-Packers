export type ReelStatus = "available" | "partial" | "used";
export type UsageType = "partial" | "full";

export interface PaperReel {
  id: string;
  reelId: string;
  date: string;
  gsm: number;
  reelSize: string;
  originalWeightKg: number;
  remainingWeightKg: number;
  source: string;
  status: ReelStatus;
  lastCompanyName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReelUsageEvent {
  id: string;
  paperReelId: string;
  companyName: string;
  usageDate: string;
  usedWeightKg: number;
  usageType: UsageType;
  notes: string | null;
  createdAt: string;
}

export interface StockFilters {
  dateFrom?: string;
  dateTo?: string;
  gsm?: string;
  reelSize?: string;
  source?: string;
  status?: string;
  company?: string;
}
