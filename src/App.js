import React from 'react'
import "./style.css"
import Opening from './components/opening'
import Questions from './components/questions'

export default function App() {

  const [startGame, setStartGame] = React.useState(false)

  function Start() {
    setStartGame(true)
  }

  return (
    <>
      <main className="outerBorder">
        {!startGame
        ?
        <Opening start={Start}/>
        :
        <Questions />}
      </main>
    </>
  )
}
