import React from 'react'
import Calculator from './components/calculator'
import Timer from './components/timer'
import Drum from './components/drum'
import Markdown from './components/markdown'
import Quote from './components/quote'
import Navbar from './components/navbar'
import Foot from './components/foot'

function App(props) {
  return(
    <div>
      <Navbar />
      <Calculator />
      <Foot />
    </div>
  )
}

export default App
