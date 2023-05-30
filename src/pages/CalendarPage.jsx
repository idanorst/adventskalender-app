import '../style.css'
import React from 'react'
import { 
    useOutletContext,
    useLocation
} from 'react-router-dom'
import { data } from '../data'
import CalendarBox from '../components/CalendarBox'

export default function CalenderPage(props) {
    const [calendarData, setCalendarData] = React.useState()
    const [idList, setIdList] = React.useState(JSON.parse(localStorage.getItem('idList')) || [])
    const [showPopup, setShowPopup] = React.useState(false)
    const [showWarningPopup, setShowWarningPopup] = React.useState(false)
    const [date, setDate] = React.useState()
    const [wrongDate, setWrongDate] = React.useState()

    const [ day ] = useOutletContext()
    const location = useLocation()
    const calendarCreated = localStorage.getItem('calendarCreated')

    var randomNumbers = [
        60, 10, 64, 30, 22, 51, 1, 8, 39, 36, 62, 50, 18, 25, 
        26, 11, 31, 2, 43, 14, 55, 66, 59, 32, 54, 23, 5, 20, 
        17, 49, 16, 0, 48, 29, 57, 65, 41, 61, 42, 53, 7, 13, 
        12, 19, 3, 37, 35, 15, 38, 52, 40, 34, 47, 44, 46, 28,
        63, 58, 27, 4, 24, 56, 45, 9, 21, 6, 33]

    React.useEffect(() => {
        if (!calendarData && !calendarCreated) {
            console.log('Creating...')
            setCalendarData(createNewCalendarElements())
            localStorage.setItem('calendarCreated', true) 
        } else if (calendarCreated) {
            console.log(localStorage.getItem('idList'))
            setCalendarData(restoreCalendarData())
            console.log('Restoring...')
        } 
    }, [])
    

    function restoreCalendarData() {
        const calendarElements = []
        console.log(idList.length)
        for (let i = 0; i < idList.length; i++) {
            calendarElements.push(
                <CalendarBox 
                    id={idList[i]} 
                    key={i}
                    date={i + 1}
                    data={data[idList[i]]}
                    onClick={calendarBoxClicked} 
                />
            )
        }
        return calendarElements
    }

    function createNewCalendarElements() {
        const calendarElements = []
        if (location.state?.search === '?familieaktiviteter') {
            var count = 0
            for (let i = 0; i < randomNumbers.length; i++) {
                if (data[randomNumbers[i]].category.includes('Familieaktivitet') && count < 24) {
                    count += 1
                    setIdList(prevList => [...prevList, randomNumbers[i]])
                    console.log(data[randomNumbers[i]])
                    calendarElements.push(
                        <CalendarBox 
                            id={randomNumbers[i]} 
                            key={randomNumbers[i]}
                            date={count}
                            data={data[randomNumbers[i]]}
                            onClick={calendarBoxClicked} 
                        />
                    )
                }
            }
        } else if (location.state?.search === '?fysisk') {
            var count = 0
            for (let i = 0; i < randomNumbers.length; i++) {
                if (data[randomNumbers[i]].category.includes('Fysisk aktivitet') && count < 24) {
                    count += 1
                    setIdList(prevList => [...prevList, randomNumbers[i]])
                    calendarElements.push(
                        <CalendarBox 
                            id={randomNumbers[i]} 
                            key={i}
                            date={count}
                            data={data[randomNumbers[i]]}
                            onClick={calendarBoxClicked} 
                        />
                    )
                }
            }
        } else if (location.state?.search === '?kulinarisk') {
            var count = 0
            for (let i = 0; i < randomNumbers.length; i++) {
                if (data[randomNumbers[i]].category.includes('Kulinarisk aktivitet') && count < 24) {
                    count += 1
                    setIdList(prevList => [...prevList, randomNumbers[i]])
                    calendarElements.push(
                        <CalendarBox 
                            id={randomNumbers[i]} 
                            key={i}
                            date={count}
                            data={data[randomNumbers[i]]}
                            onClick={calendarBoxClicked} 
                        />
                    )
                }
            }
        } else {
            for (let i = 0; i < 24; i++) {
                setIdList(prevList => [...prevList, randomNumbers[i]])
                calendarElements.push(
                    <CalendarBox 
                        id={randomNumbers[i]} 
                        key={i}
                        date={i + 1}
                        data={data[randomNumbers[i]]}
                        onClick={calendarBoxClicked} 
                    />
                )
            }
        }
        return calendarElements
    }

    localStorage.setItem('idList', JSON.stringify(idList))
        
    /* for (let i = 0; i < 24; i++) {
        calendarElements.push(
            <CalendarBox 
                id={randomNumbers[i]} 
                key={i}
                date={i + 1}
                data={data[randomNumbers[i]]}
                onClick={calendarBoxClicked} 
            />
        )
    } */

    /* React.useEffect(() => {
        for (let i = 0; i < calendarData.length; i++) {
            if (calendarData[i].props.date === day) {
                setDate(calendarData[i].props)
            }
        }
    }, []) */

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
        /* console.log(day, date) */
        if (day === date) {
            for (let i = 0; i < calendarData.length; i++){
                if (calendarData[i].props.date === date){
                    /* console.log(calendarElements[i]) */
                    localStorage.setItem(date, true)
                    setShowPopup(true)
                    document.getElementById(calendarData[i].props.id).style.backdropFilter = 'blur(5px)';
                    document.getElementById(calendarData[i].props.id).innerHTML = ''
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
                {calendarData}
            </div>
        </div>
    )
}