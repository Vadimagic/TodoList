import { AxiosResponse } from "axios"
import axiosServer from "../http"
import { ITodo, ITodoData } from "../models/ITodo"
import {
	GetTodoListParams,
	TodoResponse,
} from "../models/response/TodoResponse"

export default class TodoService {
	static async createTodo(todo: ITodoData): Promise<AxiosResponse<ITodo>> {
		return axiosServer.post<ITodo>("/todo/create", todo)
	}

	static async getTodoList(
		params: GetTodoListParams
	): Promise<AxiosResponse<TodoResponse>> {
		return axiosServer.post<TodoResponse>("/todo/list", params)
	}

	static async updateTodo(
		id: number,
		data: Partial<ITodo>
	): Promise<AxiosResponse<ITodo>> {
		return axiosServer.patch<ITodo>(`/todo/${id}`, data)
	}
}
