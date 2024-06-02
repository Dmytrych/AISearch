import { Item } from 'src/types/item';
import { User } from 'src/types/user';
import { Rate } from 'src/types/rate';

import { BASE_URL, axiosInstance } from './axios';
import { API_ROUTES } from './constants';

type LoginBody = {
  email: string;
  password: string;
}

type RegisterBody = {
  nickname: string;
  email: string; 
  password: string;
}

type RateBody = {
  applicationId: number;
  rating: number;
  comment?: string; 
}

type GenerateLabelsBody = {
  content: string;
}

type GeneratedLabel = {
  keyword: string; 
  score: number;
}

export const api = {
  login: (body: LoginBody): Promise<User> => axiosInstance.post(API_ROUTES.login, body),
  register: (body: RegisterBody) => axiosInstance.post(API_ROUTES.register, body),
  
  getLibrary: (): Promise<Item[]> => axiosInstance.get(API_ROUTES.library),
  saveToLibrary: (id: string) => axiosInstance.post(`${API_ROUTES.saveLibrary}/${id}`),
  deleteFromLibrary: (id: string) => axiosInstance.delete(`${API_ROUTES.library}/${id}`),

  addItem: (body: FormData) => axiosInstance.post(API_ROUTES.items, body),
  editItem: (id: string, body: Partial<Item>) => axiosInstance.put(`${API_ROUTES.items}/${id}`, body),
  deleteItem: (id: string) => axiosInstance.delete(`${API_ROUTES.items}/${id}`),
  viewItem: (id: string) =>  axiosInstance.post(`${API_ROUTES.viewItem}/${id}`),

  getItems: (): Promise<Item[]> => axiosInstance.get(API_ROUTES.items),
  getItem: (id: string): Promise<Item> => axiosInstance.get(`${API_ROUTES.items}/${id}`),
  rateItem: (body: RateBody) => axiosInstance.post(API_ROUTES.rate, body),
  getItemRates: (id: string): Promise<Rate[]> => axiosInstance.get(`${API_ROUTES.getRate}/${id}`),

  getImageUrl: (name: string): string => `${BASE_URL}${API_ROUTES.images}/${name}`,

  getProfile: (): Promise<User> => axiosInstance.get(API_ROUTES.profile),
  editProfile: (body: Partial<RegisterBody>): Promise<User> => axiosInstance.put(API_ROUTES.profile, body),

  getLabels: (body: GenerateLabelsBody): Promise<Array<GeneratedLabel>> => axiosInstance.post(API_ROUTES.labels, body),
};
