import React from 'react'

export default function Opening(props) {
  return (
    <div className="openingDesign">
      <div className="headerTextContainer">

        <p className="headerTitle">Quizzical</p>
        <p className="subHeaderTitle">how much do you know?</p>
        
        <button className="headerButton"
                onClick={(event) => props.start(event)}>
                  Start quiz
        </button>

      </div>
    </div>
  )
}