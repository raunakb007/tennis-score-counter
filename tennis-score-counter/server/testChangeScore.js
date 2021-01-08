/* 

The following function follows the exact same logic as the "/changeScore" endpoint in server.js

The only modifications made were for testing puposes and are as follows:
 - Added gameState parameter to be able to pass a game state to adjust the score
 - Removed database interactions

*/

module.exports = (gameState) => {
    const whoScored = gameState.whoScored
    var opponent;

    if (whoScored == "player1") {
        opponent = "player2"
    }
    else opponent = "player1"
            
    if (gameState[whoScored]["matchScore"] == "WINNER" || gameState[whoScored]["matchScore"] == "LOSER"){
        return gameState
    }

    var playerScore = gameState[whoScored]["gameScore"]
    var opponentScore = gameState[opponent]["gameScore"]

    if (playerScore == "ADV") {
        gameState[whoScored]["gameScore"] = 0
        gameState[opponent]["gameScore"] = 0
        gameState[whoScored]["setScore"] ++
        gameState["gameNumber"] ++
    }
    else if (playerScore < 30) gameState[whoScored]["gameScore"] = gameState[whoScored]["gameScore"] + 15

    else if (playerScore == 30) gameState[whoScored]["gameScore"] = gameState[whoScored]["gameScore"] + 10

    else if (playerScore == 40) {

        if (opponentScore == 40) gameState[whoScored]["gameScore"] = "ADV"

        else if (opponentScore == "ADV") gameState[opponent]["gameScore"] = 40

        else {
            gameState[whoScored]["gameScore"] = 0
            gameState[opponent]["gameScore"] = 0
            gameState[whoScored]["setScore"] ++
            gameState["gameNumber"] ++
        }
    }
    if (gameState[whoScored]["setScore"] == 7 || (gameState[whoScored]["setScore"] == 6 && gameState[opponent]["setScore"] < 5)) {
        gameState[whoScored]["setScore"] = 0
        gameState[opponent]["setScore"] = 0
        gameState[whoScored]["matchScore"] ++
        gameState["gameNumber"] = 1
        gameState["setNumber"] ++
    }

    if (gameState[whoScored]["matchScore"] == 2){
        gameState[whoScored]["matchScore"] = "WINNER"
        gameState[opponent]["matchScore"] = "LOSER"
    }

    return gameState;
        
}
