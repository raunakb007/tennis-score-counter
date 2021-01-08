const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const Score = require("./models/Score")

//Initialize express app
const app = express()
//Cors
app.use(cors())
//Body-parser
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)
app.use(bodyParser.json())

//Initialize DB URI
const dbUri = "mongodb://localhost/rbi-tennis-assignment"

//Connect to mongodb
mongoose.connect(dbUri, {useNewUrlParser: true})
    .then(() => console.log("MongoDB Connection Established"))
    .catch((err) => console.log(err));

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log("Server now running on port", port)
})

// Get Endpoint for creating a new game.
// Query Params: None
// Return: Game State Object
app.get("/newGame", (req, res) => {

    // Create Score object from model
    const newGame = new Score({
        player1: {
            gameScore: 0,
            setScore: 0,
            matchScore: 0
        },
        player2: {
            gameScore: 0,
            setScore: 0,
            matchScore: 0
        },
        gameNumber: 1,
        setNumber: 1
    })

    // Add game to DB
    Score.create(newGame)
        .then((dbResult) => {
            console.log(dbResult)
            res.status(200).send(dbResult)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send("Failed to create new game")
        })
})

// Get Endpoint for creating a new game.
// Query Params:
//      - id: The unique id of the game
// Return: Game State Object
app.get("/getGame", (req, res) => {
    const gameId = req.query.id

    if (!gameId) {
        res.status(400).send("Game id not found")
    }

    // Query DB by game id and return game document
    Score.findById(gameId)
        .then((score) => {
            console.log(score)
            res.status(200).send(score)
        })
        .catch((err) => {
            console.log(err)
            res.status(400).send(err)
        })
})

// POST Endpoint for resetting the score of a game.
// Request Body:
//      - id: The unique id of the game
// Return: Game State Object
app.post('/resetGame', (req, res) => {
    const gameId = req.body.id

    if (!gameId) {
        res.status(400).send("Game id not found")
    }

    // Initialize game reset data
    const resetGameData = {
        player1: {
            gameScore: 0,
            setScore: 0,
            matchScore: 0
        },
        player2: {
            gameScore: 0,
            setScore: 0,
            matchScore: 0
        },
        gameNumber: 1,
        setNumber: 1
    }

    // Update game with reset data using game id
    Score.findByIdAndUpdate(gameId, resetGameData, {new:true})
        .then((dbResult) => {
            console.log(dbResult)
            res.status(200).send(dbResult)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send("Failed to reset game")
        })
})

// POST Endpoint for changing the score of a game based on who scored.
// Request Body:
//      - id: The unique id of the game
//      - whoScored: The name of the player who scored (player1 or player2)
// Return: Game State Object
app.post("/changeScore", (req, res) => {
    
    // Get request body parameters
    const gameId = req.body.id
    const whoScored = req.body.whoScored
    var opponent;

    if (!gameId || ! whoScored){
        return res.status(400).send("Missing parameters")
    }

    // Determine opponent name based on who scored
    if (whoScored == "player1") {
        opponent = "player2"
    }
    else opponent = "player1"

    // Query DB for game document using game id
    Score.findById(gameId)
        .then((score) => {
            
            // If match is already won, just return the game state
            if (score[whoScored]["matchScore"] == "WINNER" || score[whoScored]["matchScore"] == "LOSER"){
                return res.status(200).send(score)
            }

            var playerScore = score[whoScored]["gameScore"]
            var opponentScore = score[opponent]["gameScore"]

            // If current score is advantage, award game to player who scored
            if (playerScore == "ADV") {
                score[whoScored]["gameScore"] = 0
                score[opponent]["gameScore"] = 0
                score[whoScored]["setScore"] ++
                score["gameNumber"] ++
            }
            // If current score is less than 30, points increment by 15
            else if (playerScore < 30) score[whoScored]["gameScore"] = score[whoScored]["gameScore"] + 15

            // If current score is equal t0 30, points increment by 10
            else if (playerScore == 30) score[whoScored]["gameScore"] = score[whoScored]["gameScore"] + 10

            // If current score is 40...
            else if (playerScore == 40) {

                // Award Advantage if game is in deuce
                if (opponentScore == 40) score[whoScored]["gameScore"] = "ADV"

                // Remove Advantage from opponent if opponent has Advantage
                else if (opponentScore == "ADV") score[opponent]["gameScore"] = 40

                // Else award game to player who scored
                else {
                    score[whoScored]["gameScore"] = 0
                    score[opponent]["gameScore"] = 0
                    score[whoScored]["setScore"] ++
                    score["gameNumber"] ++
                }
            }
            // Award set if player has won 6 games or 7 if tie break occurs
            if (score[whoScored]["setScore"] == 7 || (score[whoScored]["setScore"] == 6 && score[opponent]["setScore"] < 5)) {
                score[whoScored]["setScore"] = 0
                score[opponent]["setScore"] = 0
                score[whoScored]["matchScore"] ++
                score["gameNumber"] = 1
                score["setNumber"] ++
            }
            // Award match if player has won 2 sets
            if (score[whoScored]["matchScore"] == 2){
                score[whoScored]["matchScore"] = "WINNER"
                score[opponent]["matchScore"] = "LOSER"
            }
            // Write updated game state to DB and return game state
            Score.findByIdAndUpdate(gameId, score, {new:true})
                .then((dbResult) => {
                    console.log(dbResult)
                    res.status(200).send(dbResult)
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).send("Failed to change player score")
                })
            
        })
        .catch((err) => {
            console.log(err)
            res.status(400).send("Game not found")
        })
})
