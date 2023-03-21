import { AxiosResponse } from "axios"
import axiosServer from "../http"
import { ITodo, ITodoData } from "../models/ITodo"
import {
	GetTodoListParams,
	TodoResponse,
} from "../models/response/TodoResponse"

export default class TodoService {
	static async createTodo(todo: ITodoData): Promise<AxiosResponse<ITodo>> {
		const response = await axiosServer.post<ITodo>("/todo/create", todo)
		return response
	}

	static async getTodoList(
		params: GetTodoListParams
	): Promise<AxiosResponse<TodoResponse>> {
		const response = await axiosServer.post<TodoResponse>("/todo/list", params)
		return response
	}

	static async updateTodo(
		id: number,
		data: Partial<ITodo>
	): Promise<AxiosResponse<ITodo>> {
		const response = await axiosServer.patch<ITodo>(`/todo/${id}`, data)
		return response
	}
}
