import React from 'react'
import ReactDOM from 'react-dom/client' // 수정된 import 경로
import App from './App'
import { UserContextProvider } from './context/userContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
)
