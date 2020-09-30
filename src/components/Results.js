import React from "react";

const Results = ({score , PlayAgain}) =>(
    <div className="score-board">
    <div className="score">Your Score is {score} / 5 Correct Ansers.!!</div>
    <button className="playBtn" onClick={PlayAgain}>
        PlayAgain.!!
    </button>
    </div>
) 

export default Results;