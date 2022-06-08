import React from 'react'
import { dataExamples } from '../data/data'

export default function Questions() {

  const questionBlocks = dataExamples.map((block) => {
     return (
       <div className="questionRow">
         <div className="question">{block.question}</div>
         <div className="choices">
           <button className="choiceButton">{block.choices[0]}</button>
           <button className="choiceButton">{block.choices[1]}</button>
           <button className="choiceButton">{block.choices[2]}</button>
           <button className="choiceButton">{block.choices[3]}</button>
         </div>
       </div>
     )
  })

  return (
  <div>
    <div className="questionsBackground">
      <div className="questionParts">
        <div>{questionBlocks}</div>
        <div className="checkButtonContainer">
          <button className="checkButton">Check answers</button>
        </div>
      </div>
    </div>
  </div>
  )
}