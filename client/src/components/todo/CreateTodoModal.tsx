import { FormEvent, useContext, useState } from "react"
import { Button } from "react-bootstrap"
import { Context } from "../../main"
import { observer } from "mobx-react-lite"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

const CreateTodoModal = () => {
	const [showModal, setShowModal] = useState(false)
	const handleClose = () => setShowModal(false)
	const handleShow = () => setShowModal(true)

	const [text, setText] = useState("")
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [loading, setLoading] = useState(false)

	const { todo } = useContext(Context)

	const createTodo = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		try {
			setLoading(true)
			await todo.createTodo({
				email,
				text,
				name,
			})
			closeModal()
		} finally {
			setLoading(false)
		}
	}

	const closeModal = () => {
		setText("")
		setName("")
		setEmail("")
		handleClose()
	}

	return (
		<>
			<div className="d-flex">
				<Button onClick={handleShow} className="mb-3">
					Создать Todo
				</Button>
			</div>
			<Modal show={showModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Создание</Modal.Title>
				</Modal.Header>
				<Form onSubmit={createTodo}>
					<Modal.Body>
						<Form.Group className="mb-3">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								required
								placeholder="Введите текст"
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Имя</Form.Label>
							<Form.Control
								type="text"
								required
								placeholder="Введите имя"
								value={name}
								onChange={e => setName(e.target.value)}
							/>
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
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeModal}>
							Закрыть
						</Button>
						<Button type="submit" variant="primary" disabled={loading}>
							Создать
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}

export default observer(CreateTodoModal)
