import React from 'react'
import '../style.css'

export default function CalendarBox(props) {


    const opened = localStorage.getItem(`${props.date}`)

    if (!opened) {
        return (
            <button 
                id={props.id}
                key={props.id} 
                className='calendar-box' 
                /* onClick={!props.boxClicked && (() => props.onClick(props.date))} */
                onClick={() => props.onClick(props.date)}
                activity={props.activity}
            >{props.date}</button>
        )
    } else {
        return (
            <button 
                id={props.id} 
                key={props.id} 
                className='calendar-box opened-calendar-box'
                onClick={() => props.onClick(props.date)}
                /* onClick={!props.boxClicked && (() => props.onClick(props.date))} */
                activity={props.activity}
            >{props.data.icon}</button>
        )
    } 
}