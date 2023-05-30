import React from 'react'
import {
    Link
} from 'react-router-dom'
import Alert from '../components/Alert'


export default function StartPage() {
    const calendarCreated = localStorage.getItem('calendarCreated')
    const [isShow, setIsShow] = React.useState(false)
    
    function showAlert() {
       setIsShow(prevState => !prevState)
    }

    console.log(isShow)

    return (
        <div className='start-page--container'>
            <div className='start-page--info'>
                <h1 className='start-page--title'>Den Digitale Adventskalenderen</h1>
                {isShow && 
                <Alert type='error' message='Error' onClick={showAlert} />}
                {calendarCreated ? 
                <Link 
                onClick={showAlert}
                className='link--create'
                >Lag kalender</Link>
                : 
                <Link 
                    to='../createCalendar'
                    relative='path'
                    className='link--create'
                >Lag kalender</Link>}
                <Link 
                    to='../calendar'
                    relative='path'
                    className='link--visit'
                >Se kalender</Link>
            </div>
            
        </div>
    )
}