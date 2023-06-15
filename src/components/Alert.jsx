import '../style.css'
import React from 'react'

export default function Alert(props) {
  
    return (
        <div className='alert'>
            <span className='closebtn' onClick={() => props.onClick()}>
                &times;
            </span>
            <div className='alert-container'>
                <p className='alert-first-line'>🎅 Ho, ho, ho! 🎅</p>
                <p>{props.message}</p>
            </div>
           
        </div>
    )
}