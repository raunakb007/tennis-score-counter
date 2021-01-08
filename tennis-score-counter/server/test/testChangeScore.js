const changeScore = require("../testChangeScore")
const expect = require("chai").expect


describe('#changeScore()', function() {

    context('First point scored', function() {
        it('should increase player game score by 15', function() {
            expect(changeScore({
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
                setNumber: 1,
                whoScored: 'player1'
            }).player1.gameScore).to.equal(15)
        })
    })


    context('Second point scored', function() {
        it('should increase player game score by 15', function() {
            expect(changeScore({
                player1: {
                    gameScore: 15,
                    setScore: 0,
                    matchScore: 0
                },
                player2: {
                    gameScore: 0,
                    setScore: 0,
                    matchScore: 0
                },
                gameNumber: 1,
                setNumber: 1,
                whoScored: 'player1'
            }).player1.gameScore).to.equal(30)
        })
    })

    context('Third point scored', function() {
        it('should increase player game score by 10', function() {
            expect(changeScore({
                player1: {
                    gameScore: 30,
                    setScore: 0,
                    matchScore: 0
                },
                player2: {
                    gameScore: 0,
                    setScore: 0,
                    matchScore: 0
                },
                gameNumber: 1,
                setNumber: 1,
                whoScored: 'player1'
            }).player1.gameScore).to.equal(40)
        })
    })

    context('Fourth point scored - Game won', function() {
        it('should increase player set score by 1 and reset game score', function() {
            
            const result = changeScore({
                player1: {
                    gameScore: 40,
                    setScore: 0,
                    matchScore: 0
                },
                player2: {
                    gameScore: 0,
                    setScore: 0,
                    matchScore: 0
                },
                gameNumber: 1,
                setNumber: 1,
                whoScored: 'player1'
            })
            
            expect(result.player1.setScore).to.equal(1)
            expect(result.player1.gameScore).to.equal(0)
            expect(result.player2.gameScore).to.equal(0)

        })
    })

    context('Fourth point scored - Game enters deuce', function() {
        it('should award point to player but not the game', function() {
            
            const result = changeScore({
                player1: {
                    gameScore: 40,
                    setScore: 0,
                    matchScore: 0
                },
                player2: {
                    gameScore: 30,
                    setScore: 0,
                    matchScore: 0
                },
                gameNumber: 1,
                setNumber: 1,
                whoScored: 'player2'
            })
            
            expect(result.player1.setScore).to.equal(0)
            expect(result.player1.gameScore).to.equal(40)
            expect(result.player2.gameScore).to.equal(40)

        })
    })


    context('Player gains advantage after deuce', function() {
        it('should change player game score to ADV', function() {
            
            const result = changeScore({
                player1: {
                    gameScore: 40,
                    setScore: 0,
                    matchScore: 0
                },
                player2: {
                    gameScore: 40,
                    setScore: 0,
                    matchScore: 0
                },
                gameNumber: 1,
                setNumber: 1,
                whoScored: 'player1'
            })
            
            expect(result.player1.gameScore).to.equal('ADV')

        })
    })

    context('Player loses advantage in deuce', function() {
        it('should change player game score from ADV back to 40', function() {
            
            const result = changeScore({
                player1: {
                    gameScore: 'ADV',
                    setScore: 0,
                    matchScore: 0
                },
                player2: {
                    gameScore: 40,
                    setScore: 0,
                    matchScore: 0
                },
                gameNumber: 1,
                setNumber: 1,
                whoScored: 'player2'
            })
            
            expect(result.player1.gameScore).to.equal(40)

        })
    })

    context('Game won after deuce', function() {
        it('should increase player set score by 1 and reset game score', function() {
            
            const result = changeScore({
                player1: {
                    gameScore: "ADV",
                    setScore: 0,
                    matchScore: 0
                },
                player2: {
                    gameScore: 40,
                    setScore: 0,
                    matchScore: 0
                },
                gameNumber: 1,
                setNumber: 1,
                whoScored: 'player1'
            })
            
            expect(result.player1.setScore).to.equal(1)
            expect(result.player1.gameScore).to.equal(0)
            expect(result.player2.gameScore).to.equal(0)
            expect(result.gameNumber).to.equal(2)

        })
    })

    context('Set won', function() {
        it('should increase player match score by 1 and reset set score and game score', function() {
            
            const result = changeScore({
                player1: {
                    gameScore: 40,
                    setScore: 5,
                    matchScore: 0
                },
                player2: {
                    gameScore: 30,
                    setScore: 3,
                    matchScore: 0
                },
                gameNumber: 1,
                setNumber: 1,
                whoScored: 'player1'
            })
            
            expect(result.player1.matchScore).to.equal(1)

            expect(result.player1.gameScore).to.equal(0)
            expect(result.player1.setScore).to.equal(0)

            expect(result.player2.gameScore).to.equal(0)
            expect(result.player2.setScore).to.equal(0)


        })
    })

    context('Set goes to win by two', function() {
        it('should not score set, continue to next game', function() {
            
            const result = changeScore({
                player1: {
                    gameScore: 40,
                    setScore: 5,
                    matchScore: 0
                },
                player2: {
                    gameScore: 0,
                    setScore: 5,
                    matchScore: 0
                },
                gameNumber: 11,
                setNumber: 1,
                whoScored: 'player1'
            })
            
            expect(result.player1.matchScore).to.equal(0)
            expect(result.player1.setScore).to.equal(6)

            expect(result.player1.gameScore).to.equal(0)
            expect(result.player2.gameScore).to.equal(0)

            expect(result.gameNumber).to.equal(12)
            expect(result.setNumber).to.equal(1)

        })
    })

    context('Tiebreak Set Won by Two', function() {
        it('should increase player match score by 1 and reset set score and game score', function() {
            
            const result = changeScore({
                player1: {
                    gameScore: 40,
                    setScore: 6,
                    matchScore: 0
                },
                player2: {
                    gameScore: 15,
                    setScore: 5,
                    matchScore: 0
                },
                gameNumber: 13,
                setNumber: 1,
                whoScored: 'player1'
            })
            
            expect(result.player1.matchScore).to.equal(1)

            expect(result.player1.setScore).to.equal(0)
            expect(result.player1.gameScore).to.equal(0)

            expect(result.player2.setScore).to.equal(0)
            expect(result.player2.gameScore).to.equal(0)

            expect(result.gameNumber).to.equal(1)
            expect(result.setNumber).to.equal(2)

        })
    })

    context('Tiebreak Game Won', function() {
        it('should increase player match score by 1 and reset set score and game score', function() {
            
            const result = changeScore({
                player1: {
                    gameScore: 40,
                    setScore: 6,
                    matchScore: 0
                },
                player2: {
                    gameScore: 30,
                    setScore: 6,
                    matchScore: 0
                },
                gameNumber: 13,
                setNumber: 1,
                whoScored: 'player1'
            })
            
            expect(result.player1.matchScore).to.equal(1)

            expect(result.player1.setScore).to.equal(0)
            expect(result.player1.gameScore).to.equal(0)

            expect(result.player2.setScore).to.equal(0)
            expect(result.player2.gameScore).to.equal(0)

            expect(result.gameNumber).to.equal(1)
            expect(result.setNumber).to.equal(2)

        })
    })

    context('Match Won', function() {
        it('should declare winner and reset set score and game score', function() {
            
            const result = changeScore({
                player1: {
                    gameScore: 40,
                    setScore: 5,
                    matchScore: 1
                },
                player2: {
                    gameScore: 30,
                    setScore: 3,
                    matchScore: 0
                },
                gameNumber: 9,
                setNumber: 2,
                whoScored: 'player1'
            })
            
            expect(result.player1.matchScore).to.equal("WINNER")
            expect(result.player2.matchScore).to.equal("LOSER")

            expect(result.player1.setScore).to.equal(0)
            expect(result.player1.gameScore).to.equal(0)

            expect(result.player2.setScore).to.equal(0)
            expect(result.player2.gameScore).to.equal(0)

            expect(result.gameNumber).to.equal(1)
            expect(result.setNumber).to.equal(3)

        })
    })

    context('Match Won from Tied Sets', function() {
        it('should declare winner and reset set score and game score', function() {
            
            const result = changeScore({
                player1: {
                    gameScore: 40,
                    setScore: 5,
                    matchScore: 1
                },
                player2: {
                    gameScore: "ADV",
                    setScore: 6,
                    matchScore: 1
                },
                gameNumber: 12,
                setNumber: 3,
                whoScored: 'player2'
            })
            
            expect(result.player1.matchScore).to.equal("LOSER")
            expect(result.player2.matchScore).to.equal("WINNER")

            expect(result.player1.setScore).to.equal(0)
            expect(result.player1.gameScore).to.equal(0)

            expect(result.player2.setScore).to.equal(0)
            expect(result.player2.gameScore).to.equal(0)

            expect(result.gameNumber).to.equal(1)
            expect(result.setNumber).to.equal(4)

        })
    })

    

    

})
