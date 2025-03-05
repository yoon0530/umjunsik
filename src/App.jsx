import { useState } from 'react'
import Guestbook from "./Guestbook.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <Guestbook />
      </div>
  )
}

export default App
