import { useState } from 'react'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <h1>Welcome to GoTravel</h1>
      <Button>click me</Button>

    </>
  )
}

export default App
