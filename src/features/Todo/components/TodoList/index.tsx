import classNames from 'classnames'
import React, { ReactElement, useContext, useState } from 'react'
import { FaInfoCircle, FaPencilAlt, FaSave, FaTrashAlt } from 'react-icons/fa'
import { FiCheckSquare } from 'react-icons/fi'
import { GiSandsOfTime } from 'react-icons/gi'
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md'
import { EditTodoContext } from '../../../../context/EditContext'
import { TodoContextProvider } from '../../../../context/TodoContext'
import { Edit } from '../../../../utils/common'
import './style.scss'

interface Props {
  onTodoClick: (todo: object, idx: number) => void
  onTodoDelete: (id: number) => void
  onTodoEdit: (id: number) => void
}

function TodoList(props: Props): ReactElement {
  //init props
  const { renderTodoList } = useContext(TodoContextProvider)

  //init state
  const { editTodo, setEditTodo } = useContext(EditTodoContext)

  //init variable boolean
  let isEmpty = Object.keys(editTodo).length === 0
  //init variable Time
  const times = new Date()
  //handleClickCheck
  const handleTodoClick = (todo: object, idx: number) => {
    const { onTodoClick } = props
    if (!onTodoClick) return
    onTodoClick(todo, idx)
  }
  //handleDelete
  const handleDelete = (id: number) => {
    const { onTodoDelete } = props
    if (!onTodoDelete) return
    onTodoDelete(id)
  }
  //handleEdit
  const handleEdit = (id: number) => {
    const { onTodoEdit } = props
    if (!onTodoEdit) return
    onTodoEdit(id)
  }
  //handleOnChangeEdit
  const handleOnChangeEdit = (e: any) => {
    const newValue = { ...editTodo }
    newValue.value = e.target.value
    setEditTodo(newValue)
  }
  return (
    <>
      <div className="list">
        {renderTodoList.map((todo, idx) => (
          <div className="list__todo" key={todo.id}>
            <div className="list__todo--head">
              <div onClick={() => handleTodoClick(todo, idx)} className="list__todo--head---icon">
                {todo.status === 'completed' ? (
                  <FiCheckSquare style={{}} size={'2em'} color={'#007bff'} />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank style={{}} size={'2em'} color={'#007bff'} />
                )}
              </div>
              {isEmpty === true ? (
                <input
                  type="text"
                  value={todo.title}
                  disabled
                  className={classNames({
                    'list__todo--head---text': true,
                    completed: todo.status === 'completed',
                  })}
                />
              ) : (
                <input
                  type="text"
                  value={editTodo.value}
                  className={classNames({
                    'list__todo--head---text': true,
                    completed: todo.status === 'completed',
                  })}
                  // onChange={(e) => this.handleOnchangeEdit(e)}
                  onChange={handleOnChangeEdit}
                />
              )}
            </div>
            <div className="list__todo--due">
              {todo.date === times.toLocaleString().split(',')[0] ? (
                <GiSandsOfTime
                  style={{ padding: '9px', border: '1px solid #ffc107' }}
                  size={'2em'}
                  color={'#ffc107'}
                />
              ) : undefined}
            </div>
            <div className="list__todo--action">
              <div className="list__todo--action---icon">
                {isEmpty === false && editTodo.id === todo.id ? (
                  <FaSave
                    style={{}}
                    size={'.8em'}
                    color={'#007bff'}
                    onClick={() => handleEdit(todo.id)}
                  />
                ) : (
                  <FaPencilAlt
                    style={{}}
                    size={'.8em'}
                    color={'#007bff'}
                    onClick={() => handleEdit(todo.id)}
                  />
                )}

                <FaTrashAlt
                  style={{}}
                  size={'.8em'}
                  color={'#dc3545'}
                  onClick={() => handleDelete(todo.id)}
                />
              </div>
              <div className="list__todo--action---time">
                <FaInfoCircle style={{}} size={'.6em'} color={'#6c757d'} />
                <label htmlFor="" className="list__todo--action---time-lb">
                  {todo.date}
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TodoList
