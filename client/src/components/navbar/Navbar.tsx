import { Navbar as NavbarBootstrap } from "react-bootstrap"
import Container from "react-bootstrap/esm/Container"
import Button from "react-bootstrap/esm/Button"
import { useContext, useState } from "react"
import { Context } from "../../main"
import AuthModal from "../navbar/AuthModal"
import { observer } from "mobx-react-lite"

const Navbar = () => {
	const { user } = useContext(Context)

	const [showModal, setShowModal] = useState(false)

	const handleClose = () => setShowModal(false)
	const handleShow = () => setShowModal(true)

	return (
		<>
			<AuthModal
				showModal={showModal}
				handleClose={handleClose}
				handleShow={handleShow}
			/>
			<NavbarBootstrap bg="dark" variant="dark">
				<Container>
					<div className="w-100 d-flex justify-content-between align-items-center">
						<h2 className="text-light">TodoList</h2>
						{user.isAuth ? (
							<Button variant="light" onClick={() => user.logout()}>
								Выйти
							</Button>
						) : (
							<Button variant="light" onClick={handleShow}>
								Админ
							</Button>
						)}
					</div>
				</Container>
			</NavbarBootstrap>
		</>
	)
}

export default observer(Navbar)
