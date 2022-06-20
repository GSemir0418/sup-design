import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// 在 src/main.ts 内引入svg雪碧图插件的注册脚本
import 'virtual:svg-icons-register'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
