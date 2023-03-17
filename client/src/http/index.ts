import axios, { AxiosInstance } from "axios"
import { addAccessToken, refreshToken } from "./interseptors"

export const API_URL = "https://todo-list-vadimagic.onrender.com"

const axiosServer: AxiosInstance = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

axiosServer.interceptors.request.use(addAccessToken)
axiosServer.interceptors.response.use(config => config, refreshToken)

export default axiosServer
