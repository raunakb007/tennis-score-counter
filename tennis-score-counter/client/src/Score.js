import React, {useState, useEffect} from 'react';
import "./Score.css"

function Score() {

    const apiUrl = "http://localhost:8000/"
  
    useEffect(() => {
      // If game id not found create new game else get game
      if (!localStorage.getItem("gameId")) createGame();
      else {
        console.log("getting game data...")
        getGame();
      }
    }, [])
  
    const [score, setScore] = useState({})
  
    // Calls API to create game and sets state
    const createGame = async () => {
      const data = await fetch(apiUrl + "newGame");
      const game = await data.json()
      localStorage.setItem("gameId", game._id)
      console.log(game)
      setScore(game)
  
    }
    
    // Calls API to get game data and sets state
    const getGame = async () => {
      const data = await fetch(apiUrl + `getGame?id=${localStorage.getItem("gameId")}`);
      const game = await data.json()
      console.log(game)
      setScore(game)
  
    }
  
    // Calls API to update score and sets state
    const scorePoint = async (whoScored) => {
      const reqOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            "id": localStorage.getItem("gameId"),
            "whoScored": whoScored
          }
        )
      }
  
      const data = await fetch(apiUrl + "changeScore", reqOptions)
      const updatedScore = await data.json()
      setScore(updatedScore)
    }
    
    // Calls API to reset score and sets state
    const resetScore = async () => {
      const reqOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            "id": localStorage.getItem("gameId")
          }
        )
      }
  
      const data = await fetch(apiUrl + "resetGame", reqOptions)
      const updatedScore = await data.json()
      setScore(updatedScore)
    }
  
    return(
      <div>
        <table className="score-table">
          <thead>
            <tr>
              <th></th>
              <th>Sets</th>
              <th>Games</th>
              <th>Game {score.gameNumber}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="PlayerOneHeader">Player 1</th>
              {Object.keys(score).length && <th>{score.player1.matchScore}</th>}
              {Object.keys(score).length && <th>{score.player1.setScore}</th>}
              {Object.keys(score).length && <th>{score.player1.gameScore}</th>}
            </tr>
            <tr>
              <th className="PlayerTwoHeader">Player 2</th>
              {Object.keys(score).length && <th>{score.player2.matchScore}</th>}
              {Object.keys(score).length && <th>{score.player2.setScore}</th>}
              {Object.keys(score).length && <th>{score.player2.gameScore}</th>}
            </tr>
          </tbody>
  
        </table>

        {Object.keys(score).length && score.player1.matchScore==="WINNER" && <h2 className="winner">Player 1 is the Winner!</h2>}
        {Object.keys(score).length && score.player2.matchScore==="WINNER" && <h2 className="winner">Player 2 is the Winner!</h2>}

        <div className="Buttons">
            <button className="PlayerOneButton" onClick={() => scorePoint("player1")}>Player 1 Scores</button>
            <button className="PlayerTwoButton" onClick={() => scorePoint("player2")}>Player 2 Scores</button>
            <button style={{color:'black'}} onClick={resetScore}>Reset Game</button>
        </div>
      </div>
    )
  
  }
  
  export default Score;
  