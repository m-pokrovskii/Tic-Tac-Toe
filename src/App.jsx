import { useState } from 'react'
import './App.css'


function App() {
  const blankBoard = Array(9).fill(null);
  const [board, setBoard] = useState(blankBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [combinationWin, setCombinationWin] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const winningCombinations = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  const newGame = () => {
    setBoard(blankBoard);
    setCurrentPlayer("X");
    setWinner(null);
    setGameOver(false);
    setCombinationWin([]);
  }

  const checkWinner = (board) => {
    for (let combination of winningCombinations) {
      const [a,b,c] = combination;
      const player = board[a];
      if (player && player === board[b] && player === board[c]) {
        return {player, combination};
      }
    }
    return null;
  }
 
  const handleSquareClick = (index) => {
    if (board[index] || gameOver) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const winner = checkWinner(newBoard);
    if (winner) {
      setWinner(winner.player);
      setCombinationWin(winner.combination);
      setGameOver(true);
    }
    else if (newBoard.every(square => square !== null)) {
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }
  return (
    <div className="TicTacToe">
      <h1>Tic Tac Toe</h1>
      <div class="currentPlayerNotification">
        {winner ? (
          <div className='shakeIt'>Player {winner} Wins!</div>
        ) : gameOver ? (
          <div className='shakeIt'>It's a Tie!</div>
        ) 
        :(
          <div>
            Current Player : <span className = {(currentPlayer === "X") ? 'isX' : 'isO'}>
            {currentPlayer}</span>
          </div>
        )}
      </div>
      <div className='board'>
        {board.map((square, index) => {
          console.log({combinationWin, index});
          const isWinning = combinationWin && combinationWin.includes(index);
          const delay = isWinning ? `${(combinationWin.indexOf(index)) * 100}ms` : '0ms';          
          return (
            <button 
            onClick={() => handleSquareClick(index)} 
            className={
              isWinning 
              ? 'ttt-button -won'
              : 'ttt-button'
            }
            style={{transitionDelay: delay}}
            key={index}>
              <span className={(square === "X") ? 'squareValue isX' : 'squareValue isO'} >{square}</span>
          </button>
          )
        })}
      </div>
      <div>
        <button 
          className={`${(winner || gameOver) ? "shakeIt" : ""} newGameButton`}>
            New Game
        </button>
      </div>
      <div>Player X goes first. <br /> Click on a square to make your move</div>
    </div>
  )
}

export default App
