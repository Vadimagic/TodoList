import { useContext, useEffect, useState } from "react"
import { Spinner, Table } from "react-bootstrap"
import { Context } from "../../../main"
import { observer } from "mobx-react-lite"

import styles from "./TodoList.module.css"
import { ITodo } from "../../../models/ITodo"
import EditTodoModal from "../EditTodoModal"
import PaginationTodoList from "../PaginationTodoList"
import SortTodoList from "./SortTodoList"
import CreateTodoModal from "../CreateTodoModal"

const TodoList = () => {
	const { todo, user } = useContext(Context)
	useEffect(() => {
		todo.getTodoList()
	}, [])

	const [showModal, setShowModal] = useState(false)
	const handleClose = () => setShowModal(false)
	const handleShow = () => setShowModal(true)

	const [currentTodo, setCurrentTodo] = useState<ITodo>({} as ITodo)
	const clickRow = (item: ITodo) => {
		if (user.isAdmin) {
			setCurrentTodo(item)
			handleShow()
		}
	}
	const rowClass = user.isAdmin ? styles["table-row"] : ""

	return (
		<>
			<section className="m-3 d-flex flex-column">
				<CreateTodoModal />
				<SortTodoList />
				<div className="position-relative">
					{todo.loadingList ? (
						<div className={styles["spinner-block"]}>
							<Spinner animation="border" variant="primary" />
						</div>
					) : null}
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Email</th>
								<th>Имя</th>
								<th>Текст</th>
								<th>Статус</th>
								<th>Отредактировано администратором</th>
							</tr>
						</thead>
						<tbody>
							{todo.todoList.map((item, index) => (
								<tr
									key={item.id}
									className={rowClass}
									onClick={() => clickRow(item)}
								>
									<td>{(todo.activePage - 1) * 3 + index + 1}</td>
									<td>{item.email}</td>
									<td>{item.name}</td>
									<td>{item.text}</td>
									<td>{item.completed ? "Выполнено" : "Не выполнено"}</td>
									<td>{item.changedText ? "Да" : "Нет"}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
				<PaginationTodoList />
			</section>
			<EditTodoModal
				todo={currentTodo}
				showModal={showModal}
				handleClose={handleClose}
				handleShow={handleShow}
			/>
		</>
	)
}

export default observer(TodoList)
