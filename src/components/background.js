import React from 'react'
import blob5 from "../images/blob5.png"
import blobs from "../images/blobs.png"

export default function Background() {
  return (
    <div>
      <div className="backgroundDesign">
        <img src={blobs} alt="broken" className="backgroundDesignYellow"></img>
        <div className="headerTextContainer">
          <p className="headerTitle">Quizzical</p>
          <p className="subHeaderTitle">some description if needed</p>
          <button className="headerButton">Start quiz</button>
        </div>
        <img src={blob5} alt="broken" className="backgroundDesignBlue"></img>
      </div>
    </div>
  )
}