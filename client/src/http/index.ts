import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	InternalAxiosRequestConfig,
} from "axios"
import { AuthResponse } from "../models/response/AuthResponse"

export const API_URL = "https://todo-list-vadimagic.cyclic.app/api"

const axiosServer: AxiosInstance = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

const addAccessToken = (config: InternalAxiosRequestConfig) => {
	config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`

	return config
}

axiosServer.interceptors.request.use(addAccessToken)
axiosServer.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest: AxiosRequestConfig = error.config
		if (error.response.status === 401) {
			try {
				const { data } = await axios.get<AuthResponse>(
					`${API_URL}/auth/refresh`,
					{
						withCredentials: true,
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
)

export default axiosServer
