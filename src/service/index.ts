import { BASE_API_URL } from '@/config/env';
import axiosInstance from './axiosInstance';
import { SignInResponse } from '@/types/index.types';

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
): Promise<SignInResponse> => {
  const formData = new FormData();
  formData.append('address', address);
  formData.append('nonce', nonce);
  formData.append('signature', signature);

  const res = await axiosInstance.post(`${BASE_API_URL}/briky/api/auth/sign-in`, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

  return res.data.data;
};
