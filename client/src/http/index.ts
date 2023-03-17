import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	InternalAxiosRequestConfig,
} from "axios"
import { useContext } from "react"
import { Context } from "../main"
import { IUser } from "../models/IUser"
import { AuthResponse } from "../models/response/AuthResponse"
import UserStore from "../store/UserStore"

export const API_URL = "http://localhost:5000/api"

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
				const { user } = useContext(Context)
				console.log("user", user)
				user.setIsAuth(false)
				user.setUser({} as IUser)
				localStorage.removeItem("token")
				if (axios.isAxiosError(e)) console.error(e.response?.data.message)
			}
		} else {
			throw error
		}
	}
)

export default axiosServer
