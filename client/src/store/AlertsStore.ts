import { makeAutoObservable } from "mobx"

interface IAlert {
	id: number
	text: string
	type: string
	timeout?: number
}

export default class AlertsStore {
	_alerts = [] as IAlert[]
	_idForAlert = 0

	constructor() {
		makeAutoObservable(this)
	}

	setAlerts(alerts: IAlert[]) {
		this._alerts = alerts
	}

	setIdForAlert(idForAlert: number) {
		this._idForAlert = idForAlert
	}

	get alerts() {
		return this._alerts
	}

	get idForAlert() {
		return this._idForAlert
	}

	addAlert(alert: Omit<IAlert, "id">) {
		const id = this.idForAlert
		const timeout = alert.timeout ?? 3000
		this.setAlerts([
			...this.alerts,
			{
				...alert,
				id,
				timeout,
			},
		])
		setTimeout(() => {
			this.removeAlert(id)
		}, timeout)
		this.setIdForAlert(this.idForAlert + 1)
	}

	removeAlert(id: number) {
		this.setAlerts(this.alerts.filter(({ id: _id }) => _id !== id))
	}
}
