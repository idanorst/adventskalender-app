import React from "react"
import '../style.css'
import CalendarBox from "../components/CalendarBox"
import { 
    useOutletContext,
    useLocation, 
    Link
} from 'react-router-dom'

export default function SharedCalendar() {
    const [emptyCalendar, setEmptyCalendar] = React.useState(false)
    const [ day ] = useOutletContext()
    const [date, setDate] = React.useState()
    const [calendarData, setCalendarData] = React.useState(restoreCalendarData)
    const [earlyDate, setEarlyDate] = React.useState()
    const [showPopup, setShowPopup] = React.useState(false)
    const [showEarlyPopup, setShowEarlyPopup] = React.useState(false)
    const [showWarningPopup, setShowWarningPopup] = React.useState(false)
    const [wrongDate, setWrongDate] = React.useState()
    const [dateStatus, setDateStatus] = React.useState()
    const [earlyDateStatus, setEarlyDateStatus] = React.useState()
    let december = true
    const [godJul, setGodJul] = React.useState(localStorage.getItem('god-jul') || false) 

    function setTodaysDate(data) {
        for (let i = 0; i < data.length; i++) {
            if (parseInt(data[i].props.date) === day) {
                setDate(data[i])
            }
        }
    }

    function restoreCalendarData() {
        const calendarData = JSON.parse(localStorage.getItem('calendar-data'))
        if (calendarData === null) {
            setEmptyCalendar(true)
        } else {
        const calendarElements = []
        for (let i = 0; i < calendarData.length; i++) {
            calendarElements.push(
                <CalendarBox 
                    id={calendarData[i].id} 
                    key={calendarData[i].id}
                    date={calendarData[i].id}
                    data={calendarData[i]}
                    onClick={calendarBoxClicked}
                />
            )
        }
        setTodaysDate(calendarElements)
        return calendarElements
        }
    }

    function calendarBoxClicked(date) {
        if ((day === parseInt(date)) && december != false) {
            for (let i = 0; i < calendarData.length; i++){
                if (calendarData[i].props.date === date){
                    setShowPopup(true)
                    document.getElementById(calendarData[i].props.id).innerHTML = ''
                }
            }
        } else if ((date < day) && december != false) {
            for (let i = 0; i < calendarData.length; i++){
                if (calendarData[i].props.date === date){
                    setEarlyDate(calendarData[i])
                    setShowEarlyPopup(true)
                    document.getElementById(calendarData[i].props.id).innerHTML = ''
                }
            }
        } else {
            setShowWarningPopup(true)
            setWrongDate(date)
        }
    }

    function closePopup() {
        setShowPopup(false)
        if (dateStatus) {
            document.getElementById(date.props.id).innerHTML = date.props.data.icon
        } else {
            document.getElementById(date.props.id).innerHTML = date.props.date
        }
    }

    function closeEarlyPopup() {
        setShowEarlyPopup(false)
        if (earlyDateStatus) {
            document.getElementById(earlyDate.props.id).innerHTML = earlyDate.props.data.icon
        } else {
            document.getElementById(earlyDate.props.id).innerHTML = earlyDate.props.date
        }
    }

    function closeWarningPopup() {
        setShowWarningPopup(false)
    }

    function setTodaysDateChecked() {
        if (localStorage.getItem(date.props.date)){
            localStorage.removeItem(date.props.date)
            setDateStatus(false)
            setShowPopup(false)
            document.getElementById(date.props.id).innerHTML = date.props.date
        } else {
            localStorage.setItem(date.props.date, true)
            setDateStatus(true)
            setShowPopup(false)
            document.getElementById(date.props.id).innerHTML = date.props.data.icon
            document.getElementById(date.props.id).style.backdropFilter = 'blur(5px)'
        }
    }

    function setEarlyDateChecked() {
        if (localStorage.getItem(earlyDate.props.date)){
            setEarlyDateStatus(false)
            localStorage.removeItem(earlyDate.props.date)
            setShowEarlyPopup(false)
            document.getElementById(earlyDate.props.id).innerHTML = earlyDate.props.date
        } else {
            localStorage.setItem(earlyDate.props.date, true)
            setEarlyDateStatus(true)
            setShowEarlyPopup(false)
            document.getElementById(earlyDate.props.id).innerHTML = earlyDate.props.data.icon
            document.getElementById(earlyDate.props.id).style.backdropFilter = 'blur(5px)'
        }
        
    }

    /* function checkIfChecked(date) {
        if (localStorage.getItem(date)){
            return 'checked'
        } else {
            return ''
        }
    } */

    function closeGodJul() {
        setGodJul(true)
        localStorage.setItem('god-jul', true)
    }

    function clearCalendar(){
        localStorage.clear()
    }

    return (
        <div className="calendar-page--container shared-container">
            <div className='calendar-page--content'>
                 {emptyCalendar && 
                    <div className='pop-up' id='empty'>
                        <h2 id='empty-heading'>Kalenderen er dessverre utdatert</h2>
                        <p id='empty-icon'>🎄</p>
                        <Link to='..' id='empty-link' onClick={clearCalendar}>Lag ny kalender</Link>
                    </div> }
                {(!godJul && december && day === 24) && 
                    <div className='pop-up' id='god-jul'>
                        <button className='close-button' onClick={closeGodJul}>
                            &times;
                        </button>
                        <h2 id='god-jul-heading'>God jul!</h2>
                        <p id='god-jul-icon'>🎄</p>
                    </div> }
                {showPopup && <div className='pop-up-container'>
                    <div className='pop-up'>
                        <button className='close-button' onClick={closePopup}>
                            &times;
                        </button>
                        <h2>{(parseInt(date.props.date) === 24) ? 'Juleaften' : `${date.props.date}. desember`}</h2>
                        <h4>Dagens aktvitet er: </h4>
                        <p className='pop-up--activity'>{date.props.data.activity}</p>
                        <p className='icon'>{date.props.data.icon}</p>
                        <div className='checkbox-container'>
                            <p>Aktivitet utført: </p>
                            {localStorage.getItem(date.props.date) ? 
                                <input 
                                    type='checkbox' 
                                    checked={dateStatus}
                                    onChange={setTodaysDateChecked}
                                ></input>
                                :
                                <input 
                                    type='checkbox'
                                    onChange={setTodaysDateChecked}></input>}
                        </div>
                    </div>
                </div>}
                {showEarlyPopup && <div className='pop-up-container'>
                    <div className='pop-up'>
                        <button className='close-button' onClick={closeEarlyPopup}>
                            &times;
                        </button>
                        <h2>{(parseInt(earlyDate.props.date) === 24) ? 'Juleaften' : `${earlyDate.props.date}. desember`}</h2>
                        <h4>Dagens aktvitet er: </h4>
                        <p className='pop-up--activity'>{earlyDate.props.data.activity}</p>
                        <p className='icon'>{earlyDate.props.data.icon}</p>
                        <div className='checkbox-container'>
                            <p>Aktivitet utført: </p>
                            {localStorage.getItem(earlyDate.props.date) ? 
                                <input 
                                    type='checkbox' 
                                    checked={earlyDateStatus} 
                                    onChange={setEarlyDateChecked}
                                ></input>
                                :
                                <input 
                                    type='checkbox'
                                    onChange={setEarlyDateChecked}></input>}
                        </div>
                    </div>
                </div>}
                {showWarningPopup && <div className='pop-up-container'>
                    <div className='pop-up warning-pop-up'>
                        <button className='close-button' onClick={closeWarningPopup}>
                            &times;
                        </button>
                        <h2>Å nei du, det er ikke {parseInt(wrongDate) === 24 ? 'Juleaften' : `${wrongDate}. desember`} idag.</h2>
                        <p className='warning-icon'>🎅</p>
                    </div>
                </div>}
                {calendarData}
            </div>
        </div>
        
    )
}
