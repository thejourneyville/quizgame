import React from 'react'
import { nanoid } from "nanoid"

export default function Questions() {


  const [resetButton, setResetButton] = React.useState(false)
  const [triviaData, setTriviaData] = React.useState([])

  React.useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5`)
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
              correctAnswer: result.correct_answer
            }
          })
        )
      })
    }, [resetButton]
  )

  function Parser(str) {
    return new DOMParser().parseFromString
    (
    str, "text/html"
    )
    .documentElement.textContent
  }

  function Select(event) {
    const {id, value} = event.target
    console.log(id, value)
  }

  const questionItem = triviaData.map((item) => {
    const choiceButtons = item.answers.map((answer, idx) => {
      return (
      <button onClick={Select}
              key={idx}
              id={idx}
              value={answer}
              className="choiceButton">
                {answer}
      </button>
      )
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