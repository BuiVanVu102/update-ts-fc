import React, { createContext, useMemo, useState } from 'react'
import { Todo, Value } from '../utils/common'

//set up interface for context
interface TodoContextInterface {
  listTodo: Todo[]
  setListTodo: (listTodo: Todo[]) => void
  filter: string
  setFilter: (filter: string) => void
  handleSubmit: (values: Value) => void
  handleCheckTodoClick: (todo: object, idx: number) => void
  handleOnChange: (e: any) => void
  handleTodoDelete: (id: number) => void
  renderTodoList: Todo[]
}
//init initialState
const listTodoData = {
  listTodo: [
    { id: 1, title: 'Buy groceries for next week', status: 'completed', date: '12/12/2021' },
    { id: 2, title: 'Renew car insurance', status: 'active', date: '13/12/2021' },
    { id: 3, title: 'Sign up for online course', status: 'active', date: '14/12/2021' },
  ],
  setListTodo: () => {},
  filter: 'all',
  setFilter: () => {},
  handleSubmit: () => {},
  handleCheckTodoClick: () => {},
  handleOnChange: () => {},
  handleTodoDelete: () => {},
  renderTodoList: [],
}
//init ContextAPI Typescript
export const TodoContextProvider = createContext<TodoContextInterface>(listTodoData)

const TodoContext: React.FC = (props) => {
  //init State Filter
  const [filter, setFilter] = useState<string>(listTodoData.filter)
  //init State TodoList
  const [listTodo, setListTodo] = useState<Todo[]>(listTodoData.listTodo)

  //handleSubmit Form
  const handleSubmit = (values: Value) => {
    const newTodo = {
      id: listTodo.length + 1,
      title: values.title,
      status: 'active',
      date: values?.date ? values.date.toLocaleString().split(',')[0] : undefined,
    }
    const newTodoList = [...listTodo, newTodo]
    values.title.trim() ? setListTodo(newTodoList) : alert('not thing!!! Please enter again')
  }
  //handle CheckTodoClick
  const handleCheckTodoClick = (todo: object, idx: number) => {
    const newList = [...listTodo]
    newList[idx] = {
      ...newList[idx],
      status: newList[idx].status === 'active' ? 'completed' : 'active',
    }
    setListTodo(newList)
  }
  //handle Filter OnChange
  const handleOnChange = (e: any) => {
    console.log(e.target.value)
    setFilter(e.target.value)
  }

  //handleTodoDelete
  const handleTodoDelete = (id: number) => {
    const newList = [...listTodo]
    const newCurrentTodo = newList.filter((item) => item.id != id)
    setListTodo(newCurrentTodo)
  }
  //handle Render List
  const renderTodoList = useMemo(
    () => listTodo.filter((todo) => filter === 'all' || filter === todo.status),
    [listTodo, filter]
  )

  //export data for value context
  const TodoContextData = {
    listTodo,
    setListTodo,
    filter,
    setFilter,
    handleSubmit,
    handleCheckTodoClick,
    handleOnChange,
    handleTodoDelete,
    renderTodoList,
  }
  return (
    <TodoContextProvider.Provider value={TodoContextData}>
      {props.children}
    </TodoContextProvider.Provider>
  )
}

export default TodoContext
