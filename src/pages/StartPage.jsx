import React from 'react'
import {
    Link
} from 'react-router-dom'
import Alert from '../components/Alert'


export default function StartPage() {
    const calendarCreated = localStorage.getItem('calendarCreated')
    const [showViewWarning, setShowViweWarning] = React.useState(false)
    const [showCreateWarning, setShowCreateWarning] = React.useState(false)
    
    function showViewAlert() {
       setShowViweWarning(prevState => !prevState)
    }

    function showCreateAlert() {
        setShowCreateWarning(prevState => !prevState)
     }


    return (
        <div className='start-page--container'>
            <div className='start-page--info'>
                <h1 className='start-page--title'>Den Digitale Adventskalenderen</h1>
                {showViewWarning && 
                <Alert type='view-error' message='Du har jo allerede laget en kalender. Ta heller en titt på den du.' onClick={showViewAlert} />}
                {showCreateWarning && 
                <Alert type='create-error' message='Du har jo ikke laget noen kalender enda. Ta og gjør det først du.' onClick={showCreateAlert} />}
                {calendarCreated ? 
                <Link 
                onClick={showViewAlert}
                className='link--create'
                >Lag kalender</Link>
                : 
                <Link 
                    to='../createCalendar'
                    relative='path'
                    className='link--create'
                >Lag kalender</Link>}
                {!calendarCreated ? 
                <Link 
                    onClick={showCreateAlert}
                    className='link--visit'
                >Se kalender</Link>
                :
                <Link 
                    to='../calendar'
                    relative='path'
                    className='link--visit'
                >Se kalender</Link>}
            </div>
            
        </div>
    )
}