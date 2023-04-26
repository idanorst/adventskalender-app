import React from 'react'
import {
    Link
} from 'react-router-dom'

export default function StartPage() {
    return (
        <div className='start-page--container'>
            <div className='start-page--info'>
                <h1 className='start-page--title'>Den Digitale Adventskalenderen</h1>
                {/* <Link 
                    to='../createCalendar'
                    relative='path'
                    className='link--create'
                >Lag kalender</Link> */}
                <Link 
                    to='../calendar'
                    relative='path'
                    className='link--visit'
                >Se kalender</Link>
            </div>
            
        </div>
    )
}