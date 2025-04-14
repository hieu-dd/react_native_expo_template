import { BASE_API_URL } from '@/config/env';
import axiosInstance from './axiosInstance';
import { BaseResponse, SignInResponse } from '@/types/index.types';
import { storeAuthTokens } from '@/utils/storage';

export const getNonce = async (address: string): Promise<string> => {
  const formData = new FormData();
  formData.append('address', address);

  const res = await axiosInstance.post<{ data: { nonce: string } }>(
    `${BASE_API_URL}/briky/api/auth/nonce`,
    formData,
    {
      headers: {
        'content-type': 'multipart/form-data',
      },
    },
  );

  return res.data.data.nonce;
};

export const login = async (
  address: string,
  nonce: string,
  signature: string,
): Promise<boolean> => {
  const formData = new FormData();
  formData.append('address', address);
  formData.append('nonce', nonce);
  formData.append('signature', signature);

  const res = await axiosInstance.post<BaseResponse<SignInResponse>>(
    `${BASE_API_URL}/briky/api/auth/sign-in`,
    formData,
    {
      headers: {
        'content-type': 'multipart/form-data',
      },
    },
  );
  if (res.data.data) {
    const { token, refreshToken } = res.data.data;
    // Store tokens in AsyncStorage return true;
    await storeAuthTokens(token, refreshToken);
    return true;
  }
  return false;
};

export const refreshToken = async (refreshToken: string): Promise<boolean> => {
  const formData = new FormData();
  formData.append('refreshToken', refreshToken);
  const res = await axiosInstance.post<BaseResponse<SignInResponse>>(
    `${BASE_API_URL}/briky/api/auth/refresh`,
    formData,
    {
      headers: {
        'content-type': 'multipart/form-data',
      },
    },
  );
  if (res.data.data) {
    const { token } = res.data.data;
    // Store tokens in AsyncStorage return true;
    await storeAuthTokens(token);
    return true;
  }
  return false;
};
