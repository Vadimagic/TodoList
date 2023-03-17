export interface ITodo {
	id: number
	createdAt: string
	updatedAt: string
	name: string
	email: string
	text: string
	completed: boolean
	changedText: boolean
}

export interface ITodoData {
	name: string
	email: string
	text: string
}
