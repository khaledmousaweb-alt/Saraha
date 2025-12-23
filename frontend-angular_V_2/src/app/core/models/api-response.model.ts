// Generic API Response
export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  result?: T;
  token?: string;
  user?: any;
  status?: number;
}
