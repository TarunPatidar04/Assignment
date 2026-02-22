export interface User {
  id: number;
  username: string;
  age: number;
  gender: string;
}

export interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface AnalyticsData {
  barChartData: { feature: string; count: number }[];
  lineChartData: { date: string; count: number }[];
}
