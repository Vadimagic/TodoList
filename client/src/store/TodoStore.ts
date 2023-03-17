import axios from "axios"
import { makeAutoObservable } from "mobx"
import { ITodo, ITodoData } from "../models/ITodo"
import {
	GetTodoListParams,
	TodoParamOrderByKeys,
} from "../models/response/TodoResponse"
import TodoService from "../services/TodoService"

export default class TodoStore {
	_todoList = [] as ITodo[]
	_loadingList = false
	_pagesCount = 1
	_activePage = 1
	_params = {
		page: 1,
		orderBy: {
			createdAt: "asc",
		},
	} as GetTodoListParams

	constructor() {
		makeAutoObservable(this)
	}

	setTodoList(todoList: ITodo[]) {
		this._todoList = todoList
	}

	async setParams(params: GetTodoListParams) {
		this._params = params
		await this.getTodoList()
	}

	async setParamsOrder(orderBy: {
		[key in TodoParamOrderByKeys]: "asc" | "desc"
	}) {
		this.setParams({
			...this.params,
			orderBy,
		})
	}

	setPagesCount(pages: number) {
		this._pagesCount = pages
	}

	setActivePage(page: number) {
		this._activePage = page
	}

	setLoadingList(loading: boolean) {
		this._loadingList = loading
	}

	get todoList() {
		return this._todoList
	}

	get params() {
		return this._params
	}

	get pagesCount() {
		return this._pagesCount
	}

	get activePage() {
		return this._activePage
	}

	get loadingList() {
		return this._loadingList
	}

	async getTodoList() {
		try {
			this.setLoadingList(true)
			const { data } = await TodoService.getTodoList(this.params)
			this.setTodoList(data.todoList)
			this.setPagesCount(data.pagesCount)
		} catch (e) {
			if (axios.isAxiosError(e)) console.error(e.response?.data?.message)
		} finally {
			this.setLoadingList(false)
		}
	}

	async createTodo(todo: ITodoData) {
		try {
			await TodoService.createTodo(todo)
			this.setParams({
				orderBy: {
					createdAt: "desc",
				},
				page: 1,
			})
		} catch (e) {
			if (axios.isAxiosError(e)) console.error(e.response?.data?.message)
		}
	}

	async updateTodo(id: number, todo: Partial<ITodo>) {
		try {
			await TodoService.updateTodo(id, todo)
			this.getTodoList()
		} catch (e) {
			if (axios.isAxiosError(e)) console.error(e.response?.data?.message)
		}
	}
}
