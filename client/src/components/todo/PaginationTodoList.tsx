import { useContext } from "react"
import Pagination from "react-bootstrap/Pagination"
import { Context } from "../../main"
import { observer } from "mobx-react-lite"

const PaginationTodoList = () => {
	const { todo } = useContext(Context)

	const clickPagination = async (page: number) => {
		await todo.setParams({
			...todo.params,
			page,
		})
		todo.setActivePage(page)
	}

	return (
		<Pagination className="mt-3 mb-0">
			{new Array(todo.pagesCount).fill(0).map((_, index) => (
				<Pagination.Item
					key={index}
					active={index + 1 === todo.params.page}
					onClick={() => clickPagination(index + 1)}
				>
					{index + 1}
				</Pagination.Item>
			))}
		</Pagination>
	)
}

export default observer(PaginationTodoList)
