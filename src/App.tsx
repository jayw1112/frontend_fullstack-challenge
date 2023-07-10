import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import Image from './components/Image'

function App() {
  return (
    <Provider store={store}>
      <h1>Fullstack Challenge</h1>
      <Image />
    </Provider>
  )
}

export default App
