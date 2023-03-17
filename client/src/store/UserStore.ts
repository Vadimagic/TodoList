import axios from "axios"
import { makeAutoObservable } from "mobx"
import { API_URL } from "../http"
import { IUser } from "../models/IUser"
import { AuthResponse } from "../models/response/AuthResponse"
import AuthService from "../services/AuthService"

export default class UserStore {
	_isAuth = false
	_user = {} as IUser

	constructor() {
		makeAutoObservable(this)
	}

	setIsAuth(auth: boolean) {
		this._isAuth = auth
	}

	setUser(user: IUser) {
		this._user = user
	}

	get isAuth() {
		return this._isAuth
	}

	get user() {
		return this._user
	}

	get isAdmin() {
		return this._user.role === "admin"
	}

	auth(data: AuthResponse) {
		localStorage.setItem("token", data.accessToken)
		this.setIsAuth(true)
		this.setUser(data.user)
	}

	async login(name: string, password: string) {
		try {
			const { data } = await AuthService.login(name, password)
			this.auth(data)
		} catch (e) {
			if (axios.isAxiosError(e)) {
				throw new Error(e.response?.data?.message)
			}
		}
	}

	async register(name: string, password: string) {
		try {
			const { data } = await AuthService.register(name, password)
			this.auth(data)
		} catch (e) {
			if (axios.isAxiosError(e)) console.error(e.response?.data?.message)
		}
	}

	async logout() {
		try {
			await AuthService.logout()
		} catch (e) {
			if (axios.isAxiosError(e)) console.error(e.response?.data?.message)
		} finally {
			localStorage.removeItem("token")
			this.setIsAuth(false)
			this.setUser({} as IUser)
		}
	}

	async checkAuth() {
		try {
			const { data } = await axios.get<AuthResponse>(
				`${API_URL}/auth/refresh`,
				{
					withCredentials: true,
				}
			)
			this.auth(data)
		} catch (e) {
			localStorage.removeItem("token")
			this.setIsAuth(false)
			this.setUser({} as IUser)
			if (axios.isAxiosError(e)) console.error(e.response?.data?.message)
		}
	}
}
