import './App.css';
import Die from './components/Die';
import React, { useState, useEffect } from "react"
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [trackRolls, setTrackRolls] = useState(0)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld === true)
    const pivotValue = dice[0].value
    const allSameNumber = dice.every(die => die.value === pivotValue)
    if(allHeld && allSameNumber){
      setTenzies(true)
      console.log("you WON!")
    }
    
  }, [dice])
  
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function rollDice(){
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld === false ? generateNewDie() : die
    }))
    setTrackRolls(prevState => prevState + 1)
  }

  function holdDice(id){
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
      {...die, isHeld: !die.isHeld} :
      die
    }))
  }

  function newGame(){
    setDice(allNewDice)
    setTenzies(false)
    setTrackRolls(0)
  }

  const diceElements = dice.map(die =>
    <Die
      key={die.id}
      value={die.value}
      id={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />)


  return (
    <div className="App">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same.
        Click each dice to freeze it at its current value between rolls.</p>
      <p className='track-rolls'>You spent {trackRolls} rolls</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button className='roll-dice' onClick={tenzies ? newGame : rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
