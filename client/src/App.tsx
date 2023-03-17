import { observer } from "mobx-react-lite"
import { useContext, useEffect } from "react"
import Alerts from "./components/alerts/Alerts"
import Navbar from "./components/navbar/Navbar"
import TodoList from "./components/todo/list/TodoList"
import { Context } from "./main"

function App() {
	const { user } = useContext(Context)
	useEffect(() => {
		if (localStorage.getItem("token")) {
			user.checkAuth()
		}
	}, [])
	return (
		<div className="App">
			<Alerts />
			<Navbar />
			<TodoList />
		</div>
	)
}

export default observer(App)
