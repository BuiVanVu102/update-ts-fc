import React, { createContext, ReactNode, useState } from 'react'
import { Edit } from '../utils/common'

interface Props {
  children: ReactNode
}
interface EditInterFace {
  editTodo: Edit
  setEditTodo: (editTodo: Edit) => void
}
const editData = {
  editTodo: {},
  setEditTodo: () => {},
}

export const EditTodoContext = createContext<EditInterFace>(editData)

const EditContext = (props: Props) => {
  const [editTodo, setEditTodo] = useState<Edit>(editData.editTodo)

  const EditContextData = {
    editTodo,
    setEditTodo,
  }
  return (
    <EditTodoContext.Provider value={EditContextData}>{props.children}</EditTodoContext.Provider>
  )
}

export default EditContext
