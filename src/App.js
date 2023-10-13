
import { useEffect, useState } from 'react';
import './App.css';

import Singlecard from './components/Singlecard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import background from './assets/background.mp4';

const cardImages=[

  {"src":"/memgame/balu.png",matched:false},
  {"src":"/memgame/girl.png",matched:false},
  {"src":"/memgame/cow.png",matched:false},
  {"src":"/memgame/elephant.png",matched:false},
  {"src":"/memgame/fly.png",matched:false}, 
  {"src":"/memgame/panda.png",matched:false},
 
  {"src":"/memgame/sun.png",matched:false},
  {"src":"/memgame/monkey.png",matched:false},

]
function App() {


  const [cards,setCards]=useState([])
  const [turns,setTurns]=useState(0)
const [choiceone,setChoiceone]=useState(null)
const [choicetwo,setChoicetwo]=useState(null)
const [disabled,setDisabled]=useState(false)
const [won,setWon]=useState(false)


  //shuffle card
    const shuffleCards=()=>{
      const shuffledCards=[...cardImages,...cardImages]
      .sort(()=>Math.random()-0.5)
      .map((card)=>({...card,id:Math.random()}))
      setChoiceone(null)
      setChoicetwo(null)
      setCards(shuffledCards)
      setTurns(0)
    }

//handle a choice
const handleChoice=(card)=>{
 choiceone? setChoicetwo(card):setChoiceone(card)
}


//compare 2 selected cards
useEffect(()=>{
  
if(choiceone && choicetwo){
  setDisabled(true)
  if(choiceone.src===choicetwo.src){
    // console.log('cards matched');
    setCards(prevCards =>{
      return prevCards.map(card=>{
        if (card.src===choiceone.src){
          return{...card,matched:true};
        }
        else{
          return card
        }
      })
    })
    resetTurn()
}
else{
  
          setTimeout(() => resetTurn(), 1000);
}
}
}, [choiceone,choicetwo])
console.log(cards);


// reset choice and increase turn
const resetTurn=()=>{
  setChoiceone(null)
  setChoicetwo(null)
  setTurns(prevTurns=>prevTurns+1)
  setDisabled(false)
}

//start game automatically
useEffect(()=>{
shuffleCards()
},[])


useEffect(() => {
  const allMatched = cards.every((card) => card.matched);
  if (allMatched && cards.length > 0) {
    setWon(true);
  }
}, [cards]);


useEffect(() => {
  if (won) {
   
    toast.success("Congratulations! You've won the game", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
}, [won]);



    // console.log(cards,turns);
  return (
    <div className="App">
     
     <h1 className='text-center'>MATCH MEMORY</h1>
     <button className='btn' onClick={shuffleCards}>NEW GAME</button>
     


     <div className="card-grid">
      {cards.map(card=>(
      
       <Singlecard handleChoice={handleChoice} flipped={card===choiceone ||card===choicetwo|| card.matched}
       disabled={disabled}
       key={card.id} card={card}></Singlecard>
      
      ))}
     </div>
     <p className="text-center mt-4">turns:{turns}</p>
     <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </div>
    
  );
 
}

export default App;
