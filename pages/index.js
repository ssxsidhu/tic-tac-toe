import Head from 'next/head';
import { useState, useEffect } from 'react'
import GridSvg from '../public/grid.svg'

const WINNING_COMBO = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const intialState = {
  iXTurn: true,
  iWon: false,
  iIsDraw: false,
  iWonCombo: [],
  iModalTitle: "",
  iBoardData: Array(9).fill(null)
}


export default function Home() {

  const [xTurn, setXTurn] = useState(intialState.iXTurn);
  const [won, setWon] = useState(intialState.iWon);
  const [isDraw, setIsDraw] = useState(intialState.iIsDraw);
  const [wonCombo, setWonCombo] = useState(intialState.iWonCombo);
  const [modalTitle, setModalTitle] = useState(intialState.iModalTitle);
  const [boardData, setBoardData] = useState(intialState.iBoardData);

  useEffect(() => {
    checkWinner();
    checkDraw();
  }, [boardData]);

  const reset = () => {
    setBoardData(intialState.iBoardData)
    setXTurn(intialState.iXTurn);
    setWon(intialState.iWon);
    setWonCombo(intialState.iWonCombo);
    setIsDraw(intialState.iIsDraw);
    setModalTitle(intialState.iModalTitle);
  };

  const updateBoardData = (idx) => {
    if (!boardData[idx]) {
      let value = xTurn === true ? "X" : "O";
      setBoardData({ ...boardData, [idx]: value });
      setXTurn(!xTurn);
    }
  }

  const checkDraw = () => {
    let check = Object.keys(boardData).every((v) => boardData[v]);
    setIsDraw(check);
    if (check) setModalTitle("Match Draw!!!");
  };


  const checkWinner = () => {
    WINNING_COMBO.map((bd) => {
      const [a, b, c] = bd;
      if (
        boardData[a] &&
        boardData[a] === boardData[b] &&
        boardData[a] === boardData[c]
      ) {
        setWon(true);
        setWonCombo([a, b, c]);
        setModalTitle(`Player ${!xTurn ? "X" : "O"} Won!!!`);
        return;
      }
    });
  };
  
  return (
    <div>
      <Head>
        <title>
          Tic-Tac-Toe
        </title>
      </Head>
      <h1>Tic Tac Toe</h1>
      <div className='game'>
        <div className='game_menu'>
          <p>{xTurn ? "X Turn" : "O Turn"}</p>
        </div> 
        <GridSvg className={`svg_board`}/>
        <div className={`game_board`}>
          {[...Array(9)].map((v, idx) => (
            <Square
              key={idx}
              value={boardData[idx]}
              onClick={() => updateBoardData(idx)}
              highlight={wonCombo.includes(idx)}
            />
          ))}
        </div>
      </div>
      <div className={`overlay ${modalTitle ? "show" : ""}`}></div>
      <div className={`modal ${modalTitle ? "show" : ""}`}>
        <div className="modal_title">{modalTitle}</div>
        <button onClick={reset}>New Game</button>
      </div>
    </div >

  )
}

function Square(props) {
  return (
    <div
      className={
        `square ${props.highlight ? "highlight" : ""
        }`}
      onClick={() => { props.onClick() }}>
      {props.value}
    </div>
  )
}



