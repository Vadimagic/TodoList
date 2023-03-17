import { ITodo } from "../ITodo"

export interface TodoResponse {
	todoList: ITodo[]
	currentPage: number
	pagesCount: number
}

export enum TodoParamOrderByKeys {
	CREATED_AT = "createdAt",
	UPDATED_AT = "updatedAt",
	NAME = "name",
	EMAIL = "email",
	TEXT = "text",
	COMPLETED = "completed",
	CHANGED_TEXT = "changedText",
}

export interface GetTodoListParams {
	page: number
	orderBy: Partial<{
		[key in TodoParamOrderByKeys]: "asc" | "desc"
	}>
}
