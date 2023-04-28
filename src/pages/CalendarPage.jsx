import '../style.css'
import React from 'react'
import { useOutletContext } from 'react-router'
import { data } from '../data'
import CalendarBox from '../components/CalendarBox'

export default function CalenderPage() {
    const [showPopup, setShowPopup] = React.useState(false)
    const [showWarningPopup, setShowWarningPopup] = React.useState(false)
    const [date, setDate] = React.useState()
    const [ day ] = useOutletContext()
    const [wrongDate, setWrongDate] = React.useState()

    /* console.log(date) */
    
    const randomOrder = [23, 7, 12, 8, 4, 10, 24, 16, 22, 3, 9, 6, 14, 19, 1, 18, 15, 20, 11, 17, 13, 2, 5, 21]

    const calendarElements = []
    for (let i = 0; i < randomOrder.length; i++) {
        calendarElements.push(
            <CalendarBox 
                id={randomOrder[i]} 
                key={i}
                date={randomOrder[i]}
                data={data[randomOrder[i]]}
                onClick={calendarBoxClicked} 
            />
        )
    }

    React.useEffect(() => {
        for (let i = 0; i < calendarElements.length; i++) {
            if (calendarElements[i].props.id === day) {
                setDate(calendarElements[i].props)
            }
        }
    }, [])

  /*   if (typeof date === 'undefined' || date.id !== day ) {
        for (let i = 0; i < calendarElements.length; i++) {
            if (calendarElements[i].props.id === day) {
                console.log(calendarElements[i])
                setDate(calendarElements[i])
            }
        }
    } */
    
    /* console.log(calendarElements) */

    /* const calendarElements = data.map(e => {

        const opened = localStorage.getItem(`${e.id}`)

        if (!opened) {
            return (
                <button 
                    id={e.id} 
                    key={e.id} 
                    className='calendar-box' 
                    onClick={() => calendarBoxClicked(e)}
                    activity={e.activity}
                    date={e.date}
                    icon={e.icon}
                >{e.id}</button>
            )
        } else {
            return (
                <button 
                    id={e.id} 
                    key={e.id} 
                    className='calendar-box'
                >{e.icon}</button>
            )
        }
    })*/

    /* console.log(calendarElements)

    for (let i = calendarElements.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * i)
        let k = calendarElements[i]
        calendarElements[i] = calendarElements[j]
        calendarElements[j] = k
        }
    
    console.log(calendarElements)  */

    function calendarBoxClicked(date) {
        console.log(day, date)
        if (day === date) {
            for (let i = 0; i < calendarElements.length; i++){
                if (calendarElements[i].props.date === date){
                    console.log(calendarElements[i])
                    localStorage.setItem(date, true)
                    setShowPopup(true)
                    document.getElementById(calendarElements[i].props.id).style.backdropFilter = 'blur(5px)';
                    document.getElementById(calendarElements[i].props.id).innerHTML = ''
                }
            }
        } else {
            setShowWarningPopup(true)
            setWrongDate(date)
        }

        /* setDate(e)
        if (day === e.id) {
            localStorage.setItem(`${e.id}`, true)
            setShowPopup(true)
            document.getElementById(e.id).style.backdropFilter = 'blur(5px)';
            document.getElementById(e.id).innerHTML = ''
        } else {
            setShowWarningPopup(true)
        } */
    }

    function closePopup() {
        setShowPopup(false)
        document.getElementById(date.id).innerHTML = date.data.icon
    }

    function closeWarningPopup() {
        setShowWarningPopup(false)
    }

    return (
        <div className='calendar-page--container'>
            <div className='calendar-page--content'>
                {showPopup && <div className='pop-up'>
                    <button className='close-button' onClick={closePopup}>
                        &times;
                    </button>
                    <h2>{date.date}. desember</h2>
                    <h4>Dagens aktvitet er: </h4>
                    <p>{date.data.activity}</p>
                    <p className='icon'>{date.data.icon}</p>
                </div>}
                {showWarningPopup && <div className='warning-pop-up'>
                    <button className='close-button' onClick={closeWarningPopup}>
                        &times;
                    </button>
                    <h2>Å nei du, det er ikke {wrongDate}. desember idag.</h2>
                    <p>🎅</p>
                </div>}
                {calendarElements}
            </div>
        </div>
    )
}