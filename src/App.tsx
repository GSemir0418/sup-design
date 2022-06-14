import Router from './router'
import { HashRouter, Link } from 'react-router-dom'
import './App.scss'
// 在这里引入组件库的css
import 'sup-design/style.css'

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Link to="/home">To Home</Link>
        <Link to="/about">To About</Link>
        <Router />
      </HashRouter>
    </div>
  )
}

export default App
