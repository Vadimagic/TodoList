import React, { createContext } from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import UserStore from "./store/UserStore"
import TodoStore from "./store/TodoStore"

import "bootstrap/dist/css/bootstrap.min.css"
import AlertsStore from "./store/AlertsStore"

export const Context = createContext({
	user: new UserStore(),
	todo: new TodoStore(),
	alerts: new AlertsStore(),
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	//<React.StrictMode>
	<Context.Provider
		value={{
			user: new UserStore(),
			todo: new TodoStore(),
			alerts: new AlertsStore(),
		}}
	>
		<App />
	</Context.Provider>
	//</React.StrictMode>
)
