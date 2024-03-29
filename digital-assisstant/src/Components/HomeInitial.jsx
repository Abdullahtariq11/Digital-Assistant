import React from 'react'
import './HomeInitial.css'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';


function HomeInitial() {
    
    const[cardIndex,setcardIndex]=useState(0);
  
    var cardObject=[
        {
            imageDetail:"task-hi.png",
            textDetail:"Create Individual tasks and manage them timely"

        },
        {
            imageDetail:"appointment.jpg",
            textDetail:"Manage your appointments or deadlines by a custom calendar"
        },
        {
            imageDetail:"project1.jpg",
            textDetail:"Manage your projects, and keep track of the progress, plus get the statistics on the completion and pending"
        }
    ]
  return (
    <div className='HomeInital'>
        
        <h4>Join Focus craft, for managing your project for better productivity.</h4>
        <div className='card'>          
                <img src={cardObject[cardIndex].imageDetail} alt="task picture" />
                <p className="nanum-myeongjo-regular">{cardObject[cardIndex].textDetail}</p>
        </div>
        <div className="changeCard">
                <p onClick={()=>{cardIndex<1?setcardIndex(1):setcardIndex(2)}} className='previous'>⬅️</p>
                <p onClick={()=>{cardIndex>1?setcardIndex(1):setcardIndex(0)}} className='next'>➡️</p>
            </div>
        
    </div>
  )
}
export default HomeInitial;
