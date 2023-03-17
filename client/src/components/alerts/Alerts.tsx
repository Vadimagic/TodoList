import { useContext } from "react"
import { Context } from "../../main"
import { observer } from "mobx-react-lite"
import styles from "./Alerts.module.css"

const Alerts = () => {
	const { alerts } = useContext(Context)

	return (
		<div className={styles.alert}>
			{alerts.alerts.map(alert => (
				<div key={alert.id} className={`${styles.body} ${styles[alert.type]}`}>
					<span className={styles.text}>{alert.text}</span>
				</div>
			))}
		</div>
	)
}

export default observer(Alerts)
