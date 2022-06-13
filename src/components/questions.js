import React from 'react'
import { nanoid } from "nanoid"

export default function Questions() {

  const numberOfQuestions = 5

  const [resetButton, setResetButton] = React.useState(false)
  const [checkAnswers, setCheckAnswers] = React.useState(false)
  const [triviaData, setTriviaData] = React.useState([])
  const [userAnswers, setUserAnswers] = React.useState(
    [...Array(numberOfQuestions).keys()]
    .map(() => undefined))
  const [correctAnswers, setCorrectAnswers] = React.useState([])

  React.useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&difficulty=easy`)
      .then(res => res.json())
      .then(triviaApiData => {

        setTriviaData(
          
          triviaApiData.results.map((result) => {

            return {
              id: nanoid(),
              question: Parser(result.question),
              answers: 
                [
                ...result.incorrect_answers.map((answer) => Parser(answer)), 
                Parser(result.correct_answer)
                ]
                .sort(() => Math.random() - 0.5),
              correctAnswer: Parser(result.correct_answer),
            }
          })
        )
      })
  }, [resetButton])

  React.useEffect(() => {
  },[correctAnswers])

  function CheckAnswers() {
    console.log("check answers click!")
    setCheckAnswers(true)
    setCorrectAnswers(triviaData.map((question) => question.correctAnswer))
  }

  function Reset() {
    setResetButton(() => !resetButton)
    setCheckAnswers(false)
    setUserAnswers([...Array(numberOfQuestions).keys()])
  }
  
  function Parser(str) {
    return new DOMParser().parseFromString(str, "text/html")
    .documentElement.textContent
  }

  function SelectAnswer(event) {
    const {id, value} = event.target
    setUserAnswers((prevUserAnswers) => {
       return prevUserAnswers.map((answer, index) => {
         if (+id === index) {
           if (answer === undefined) {
             return Parser(value)
           } else if (value !== answer) {
             return Parser(value)
           } else if (value === answer) {
             return undefined
           } else {
             return undefined
           }
         } else {
           return answer
         }
      })
    })
  }

  function Score() {
    return (
    <div className="score">
      {`You scored ${userAnswers.filter((answer, idx) => 
      (answer === correctAnswers[idx])).length}/${numberOfQuestions} correct answers`}
    </div>
    )
  }

  const qOrA = !checkAnswers ?

    triviaData.map((item, itemIdx) => {
      const choiceButtons = item.answers.map((answer, answerIdx) => {
        
        return answer === userAnswers[itemIdx]
        ?
          <button onClick={SelectAnswer}
                  key={String(itemIdx) + String(answerIdx)}
                  id={itemIdx}
                  value={answer}
                  className="choiceButton selected">
                    {answer}
          </button>
        :
          <button onClick={SelectAnswer}
                  key={String(itemIdx) + String(answerIdx)}
                  id={itemIdx}
                  value={answer}
                  className="choiceButton">
                    {answer}
          </button>
      })
      return (
        <div key={nanoid()} className="questionRow">
          <div className="question">{`${item.question}`}</div>
          <div className="choices">
            {choiceButtons}
          </div>
        </div>
      )
    })

    :

    triviaData.map((item, itemIdx) => {
      const choiceButtons = item.answers.map((answer, answerIdx) => {

        if (answer === userAnswers[itemIdx] && userAnswers[itemIdx] !== correctAnswers[itemIdx]) {
          return (
          <button
                  key={String(itemIdx) + String(answerIdx)}
                  id={itemIdx}
                  value={answer}
                  className="choiceButton incorrectAnswer">
                    {answer}
          </button>
          )
        } else if (answer === correctAnswers[itemIdx]) {
          return (
          <button 
                  key={String(itemIdx) + String(answerIdx)}
                  id={itemIdx}
                  value={answer}
                  className="choiceButton correctAnswer">
                    {answer}
          </button>
          )
        } else {
          return (
          <button 
                  key={String(itemIdx) + String(answerIdx)}
                  id={itemIdx}
                  value={answer}
                  className="choiceButton">
                    {answer}
          </button>
          )
        }
      })
      return (
        <div key={nanoid()} className="questionRow">
          <div className="question">{`${item.question}`}</div>
          <div className="choices">
            {choiceButtons}
          </div>
        </div>
      )
    })
  
  const checkOrScore = !checkAnswers
  ?
  <button onClick={CheckAnswers} className="checkButton">Check Answers</button>
  :
  <Score />

  return (
  <div>
    <div className="questionsBackground">
      <div className="questionParts">
        {qOrA}
        <div className="checkButtonContainer">
          {checkOrScore}
          <button onClick={Reset}
                  className="checkButton">
                    New Quiz
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}