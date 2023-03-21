import { AxiosResponse } from "axios"
import axiosServer from "../http/index"
import { AuthResponse } from "../models/response/AuthResponse"

export default class AuthService {
	static async login(
		name: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		const response = await axiosServer.post<AuthResponse>("/auth/login", {
			name,
			password,
		})
		return response
	}

	static async register(
		name: string,
		password: string
	): Promise<AxiosResponse<AuthResponse>> {
		const response = await axiosServer.post<AuthResponse>("/auth/register", {
			name,
			password,
		})
		return response
	}

	static async logout(): Promise<void> {
		await axiosServer.get("/auth/logout")
	}
}
