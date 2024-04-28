import axios from 'axios';
import {getApiUrl} from "../utils/api/url";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
    applications: (queryParams) => getApiUrl(`${BASE_URL}/applications`, queryParams).toString(),
};

const apiClient = axios.create({
    baseURL: BASE_URL,
});

export async function fetcher(url) {
    return apiClient.get(url).then((response) => response.data)
}