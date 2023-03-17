import { useContext } from "react"
import { Form } from "react-bootstrap"
import { Context } from "../../../main"
import { observer } from "mobx-react-lite"

import { TodoParamOrderByKeys } from "../../../models/response/TodoResponse"

const SortTodoList = () => {
	const { todo } = useContext(Context)

	const keySort: TodoParamOrderByKeys = Object.keys(
		todo.params.orderBy
	)[0] as TodoParamOrderByKeys
	const updateKey = (key: TodoParamOrderByKeys) => {
		const orderBy = {
			[key as TodoParamOrderByKeys]: todo.params.orderBy[keySort],
		}
		// TODO FIX THIS
		// @ts-ignore
		todo.setParamsOrder(orderBy)
	}
	const updateValue = (value: "asc" | "desc") => {
		const orderBy = {
			[keySort]: value,
		}
		// TODO FIX THIS
		// @ts-ignore
		todo.setParamsOrder(orderBy)
	}

	return (
		<div className="mb-5 d-flex align-items-start flex-column">
			<h3>Сортировка</h3>
			<div className="gap-10">
				<Form.Select
					className="mb-3"
					value={keySort}
					onChange={e => updateKey(e.target.value as TodoParamOrderByKeys)}
				>
					<option value={TodoParamOrderByKeys.CREATED_AT}>Дата создания</option>
					<option value={TodoParamOrderByKeys.UPDATED_AT}>
						Дата последнего редактирования
					</option>
					<option value={TodoParamOrderByKeys.NAME}>Имя пользователя</option>
					<option value={TodoParamOrderByKeys.EMAIL}>Email</option>
					<option value={TodoParamOrderByKeys.TEXT}>Текст</option>
					<option value={TodoParamOrderByKeys.COMPLETED}>Статус</option>
					<option value={TodoParamOrderByKeys.CHANGED_TEXT}>
						Изменена администратором
					</option>
				</Form.Select>
				<Form.Select
					value={todo.params.orderBy[keySort]}
					onChange={e => updateValue(e.target.value as "asc" | "desc")}
				>
					<option value="desc">По возрастанию</option>
					<option value="asc">По убыванию</option>
				</Form.Select>
			</div>
		</div>
	)
}

export default observer(SortTodoList)
