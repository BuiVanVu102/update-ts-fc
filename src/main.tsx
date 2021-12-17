import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import TodoContext from './context/TodoContext'
import EditContext from './context/EditContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <TodoContext>
        <EditContext>
          <App />
        </EditContext>
      </TodoContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
