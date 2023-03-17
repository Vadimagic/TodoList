import { FormEvent, useContext, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { Context } from "../../main"
import { observer } from "mobx-react-lite"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

import { ITodo } from "../../models/ITodo"

interface IProps {
	todo: ITodo
	showModal: boolean
	handleShow: () => void
	handleClose: () => void
}

const EditTodoModal = ({ todo: todoProp, showModal, handleClose }: IProps) => {
	const [completed, setCompleted] = useState(todoProp.completed)
	const [text, setText] = useState(todoProp.text)
	const [loading, setLoading] = useState(false)

	const { todo, user } = useContext(Context)

	useEffect(() => {
		setCompleted(todoProp.completed)
		setText(todoProp.text)
	}, [todoProp])

	const updateTodo = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		if (user.isAdmin) {
			try {
				setLoading(true)
				await todo.updateTodo(todoProp.id, {
					completed,
					text,
				})
				handleClose()
			} finally {
				setLoading(false)
			}
		}
	}

	return (
		<Modal show={showModal} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Редактирование</Modal.Title>
			</Modal.Header>
			<Form onSubmit={updateTodo}>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" disabled value={todoProp.email} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Имя</Form.Label>
						<Form.Control type="text" disabled value={todoProp.name} />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Текст</Form.Label>
						<Form.Control
							type="text"
							required
							placeholder="Введите текст"
							onChange={e => setText(e.target.value)}
							value={text}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Check
							type="checkbox"
							label="Выполнено"
							onChange={e => setCompleted(e.target.checked)}
							checked={completed}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Закрыть
					</Button>
					<Button type="submit" variant="primary" disabled={loading}>
						Обновить
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default observer(EditTodoModal)
