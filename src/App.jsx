import { useState } from 'react'
import umjunsik from './assets/umjunsik.jpeg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src={umjunsik} alt="react logo" />
      </div>
      <h1>엄준식은 살아있다</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
