import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios"
import axiosServer, { API_URL } from ".."
import { AuthResponse } from "../../models/response/AuthResponse"

export const addAccessToken = (config: InternalAxiosRequestConfig) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

	return config
}

export const refreshToken = async (error: any) => {
	const originalRequest: AxiosRequestConfig = error.config
	if (error.response.status === 401) {
		try {
			const { data } = await axios.get<AuthResponse>(
				`${API_URL}/auth/refresh`,
				{
					withCredentials: true,
					baseURL: API_URL,
				}
			)
			localStorage.setItem("token", data.accessToken)
			return axiosServer.request(originalRequest)
		} catch (e) {
			localStorage.removeItem("token")
			if (axios.isAxiosError(e)) console.error(e.response?.data.message)
		}
	} else {
		throw error
	}
}
