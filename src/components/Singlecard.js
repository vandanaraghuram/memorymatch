import React from 'react'
import './Singlecard.css'



function Singlecard({card,handleChoice,flipped,disabled}) {

const handleClick=()=>{
  if(!disabled){
    handleChoice(card)
  }

}


  return (
    <div>
         <div className='card'>
          <div className={flipped?"flipped":""}>
            <img className='front' src={card.src}/>
            <img className='back' src="/memgame/cover.gif" onClick={handleClick} alt="card back" />
          </div>
          </div>
          
    </div>
  )
}

export default Singlecard