export interface BreachSummary {
  totalBreaches: number;
  verifiedBreaches: number;
  domainsAffected: number;
  totalChecks: number;
  lastCheck: string | null;
}

export interface RecentBreach {
  id: string;
  breachName: string;
  domain: string;
  breachDate: string;
  addedDate: string;
  isVerified: boolean;
  pwnCount: number;
}

export interface CheckHistory {
  id: string;
  checkedAt: string;
  newBreaches: number;
}

export interface DashboardData {
  user: {
    email: string;
  };
  summary: BreachSummary;
  recentBreaches: RecentBreach[];
  checkHistory: CheckHistory[];
}
