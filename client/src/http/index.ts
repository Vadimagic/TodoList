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
import { addAccessToken, refreshToken } from "./interseptors"

export const API_URL = "http://localhost:5000/api"

const axiosServer: AxiosInstance = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

axiosServer.interceptors.request.use(addAccessToken)
axiosServer.interceptors.response.use(config => config, refreshToken)

export default axiosServer
