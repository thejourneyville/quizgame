import React from 'react'
import { nanoid } from "nanoid"

export default function Questions() {

  const numberOfQuestions = 5

  const [resetButton, setResetButton] = React.useState(false)
  const [triviaData, setTriviaData] = React.useState([])
  const [userAnswers, setUserAnswers] = React.useState(
    [...Array(numberOfQuestions).keys()]
    .map(() => undefined))
  const [correctAnswers, setCorrectAnswers] = React.useState(
    [...Array(numberOfQuestions).keys()]
    .map(() => undefined))

  React.useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}`)
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
              correctAnswer: result.correct_answer,
            }
          })
        )
      })
    setUserAnswers([...Array(numberOfQuestions).keys()].map(() => undefined))
  }, [resetButton])

  function Parser(str) {
    return new DOMParser().parseFromString
    (
    str, "text/html"
    )
    .documentElement.textContent
  }

  function SelectAnswer(event) {
    const {id, value} = event.target
    setUserAnswers((prevUserAnswers) => {
       return prevUserAnswers.map((answer, index) => {
         if (+id === index) {
           if (answer === undefined) {
             return value
           } else if (value !== answer) {
             return value
           } else if (value === answer) {
             return undefined
           }
         } else {
           return answer
         }
      })
    })
  }

  console.log(userAnswers)

  const questionItem = triviaData.map((item, itemIdx) => {
    const choiceButtons = item.answers.map((answer, answerIdx) => {

      console.log(answer)
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

  return (
  <div>
    <div className="questionsBackground">
      <div className="questionParts">
        {questionItem}
        <div className="checkButtonContainer">
          <button className="checkButton">Check answers</button>
          <button onClick={() => setResetButton(() => !resetButton)}
                  className="checkButton">
                    reset
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}