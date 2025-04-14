export type WalletAddress = `0x${string}` | undefined;

export type SignInResponse = {
  token: string;
  tokenExpiredTimeInSeconds: number;
  refreshToken?: string;
  refreshTokenExpiredTimeInSeconds?: number;
};

export type User = {
  id: string;
  address: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  isBroker: boolean;
  isModerator: boolean;
  isManager: boolean;
  isVerified: boolean;
  nationality: string;
  dob: number;
  alias: string;
  status: string;
};

// Base response type for API responses
export type BaseResponse<T = any> = {
  success: boolean;
  code: number;
  message?: string;
  data?: T;
  error?: string;
};

// Base list response type for paginated data
export type BaseListResponse<T = any> = {
  success: boolean;
  code: number;
  message?: string;
  data?: {
    list: T[];
  };
  error?: string;
};
