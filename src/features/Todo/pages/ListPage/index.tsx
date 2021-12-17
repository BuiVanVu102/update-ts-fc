import React, { ReactElement, useContext, useMemo } from 'react'
import { FaSortAmountDownAlt } from 'react-icons/fa'
import { EditTodoContext } from '../../../../context/EditContext'
import { TodoContextProvider } from '../../../../context/TodoContext'
import TodoForm from '../../components/TodoForm'
import TodoList from '../../components/TodoList'
import './style.scss'
interface Props {}

function ListPage({}: Props): ReactElement {
  //Init TodoContext
  const {
    listTodo,
    setListTodo,
    filter,
    handleSubmit,
    handleCheckTodoClick,
    handleOnChange,
    handleTodoDelete,
    renderTodoList,
  } = useContext(TodoContextProvider)
  //Init EditContext
  const { editTodo, setEditTodo } = useContext(EditTodoContext)
  //handleTodoEdit
  const handleTodoEdit = (id: number) => {
    let emptyObj = Object.keys(editTodo).length === 0
    if (emptyObj === false && editTodo.id === id) {
      const newListTd = [...listTodo]
      let idx = newListTd.findIndex((todo) => todo.id === id)
      newListTd[idx].title = editTodo.value
      setListTodo(newListTd)
      setEditTodo({})
      //toggle
      return
    }
    //handle save
    const newEditTd = [...listTodo]
    let idx = newEditTd.findIndex((todo) => todo.id === id)
    setEditTodo(newEditTd[idx])
  }
  return (
    <div className="Container">
      <TodoForm onSubmit={handleSubmit}></TodoForm>
      <hr />
      <div className="main">
        <div className="main__filter">
          <label htmlFor="" className="main__filter--lb">
            Filter
          </label>
          <select
            name=""
            id=""
            className="main__filter--sl"
            onChange={handleOnChange}
            value={filter}
          >
            <option value="all" selected>
              All
            </option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
            <option value="has-due-date">Has-due-date</option>
          </select>
        </div>
        <div className="main__sort">
          <label htmlFor="" className="main__sort--lb">
            Sort
          </label>
          <select name="" id="" className="main__sort--sl">
            <option value="added-date-asc" selected>
              Added date
            </option>
            <option value="due-date-desc">Due date</option>
          </select>
          <FaSortAmountDownAlt
            className="main__sort--icon"
            style={{}}
            size={'1em'}
            color={'#007bff'}
          />
        </div>
      </div>
      <TodoList
        // listTodo={renderTodoList}
        onTodoClick={handleCheckTodoClick}
        onTodoDelete={handleTodoDelete}
        onTodoEdit={handleTodoEdit}
      ></TodoList>
    </div>
  )
}

export default ListPage
