import style from './App.module.scss'
import { Chat } from './components/chat'

function App() {
  return (
    <div className={style.container}>
      <Chat />
    </div>
  )
}

export default App
