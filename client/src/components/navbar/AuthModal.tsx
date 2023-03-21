import { FormEvent, useContext, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import { Context } from "../../main"
import { observer } from "mobx-react-lite"
import axios from "axios"

interface IProps {
	showModal: boolean
	handleShow: () => void
	handleClose: () => void
}

const AuthModal = ({ showModal, handleShow, handleClose }: IProps) => {
	const { user, alerts } = useContext(Context)
	const [name, setName] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)

	const closeModal = () => {
		handleClose()
		setName("")
		setPassword("")
	}

	const submitFormAuth = async (event: FormEvent<HTMLFormElement>) => {
		try {
			setLoading(true)
			event.preventDefault()
			await user.login(name, password)
			closeModal()
		} catch (e) {
			alerts.addAlert({
				text: "Ошибка авторизации",
				type: "danger",
				timeout: 5000,
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<Modal show={showModal} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>Авторизация</Modal.Title>
			</Modal.Header>
			<Form onSubmit={submitFormAuth}>
				<Modal.Body>
					<Form.Group className="mb-3">
						<Form.Label>Имя пользователя</Form.Label>
						<Form.Control
							type="text"
							required
							placeholder="Введите имя"
							onChange={e => setName(e.target.value)}
							value={name}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Пароль</Form.Label>
						<Form.Control
							type="password"
							required
							placeholder="Введите пароль"
							onChange={e => setPassword(e.target.value)}
							value={password}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeModal}>
						Закрыть
					</Button>
					<Button type="submit" variant="primary" disabled={loading}>
						Авторизоваться
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default observer(AuthModal)
