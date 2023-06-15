import '../style.css'
import React from 'react'
import { 
    useOutletContext,
    useLocation
} from 'react-router-dom'
import { data } from '../data'
import CalendarBox from '../components/CalendarBox'

export default function CalenderPage() {
    var randomNumbers = [
        60, 10, 64, 30, 22, 51, 1, 8, 39, 36, 62, 50, 18, 25, 
        26, 11, 31, 2, 43, 14, 55, 66, 59, 32, 54, 23, 5, 20, 
        17, 49, 16, 0, 48, 29, 57, 65, 41, 61, 42, 53, 7, 13, 
        12, 19, 3, 37, 35, 15, 38, 52, 40, 34, 47, 44, 46, 28,
        63, 58, 27, 4, 24, 56, 45, 9, 21, 6, 33]
    
    const calendarCreated = localStorage.getItem('calendarCreated')
    const [idList, setIdList] = React.useState(JSON.parse(localStorage.getItem('idList')) || [])
    const [ day ] = useOutletContext()
    const [date, setDate] = React.useState()
    const location = useLocation()
    const [calendarData, setCalendarData] = React.useState(setData)
    
    const [showPopup, setShowPopup] = React.useState(false)
    const [showWarningPopup, setShowWarningPopup] = React.useState(false)
    
    const [wrongDate, setWrongDate] = React.useState()

    

    /* React.useEffect(() => {
        if (!calendarData && !calendarCreated) {
            console.log('Creating...')
            createNewCalendarElements()
            localStorage.setItem('calendarCreated', true) 
        } else if (calendarCreated) {
            restoreCalendarData()
            console.log('Restoring...')
        } 
    }, []) */

    function setData() {
        var calendarElements = []
        if (!calendarCreated) {
            console.log('Creating...')
            calendarElements = createNewCalendarElements()
            localStorage.setItem('calendarCreated', true) 
        } else if (calendarCreated) {
            calendarElements = restoreCalendarData()
            console.log('Restoring...')
        } 
        return calendarElements
    }

    function setTodaysDate(data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].props.date === day) {
                setDate(data[i])
            }
        }
    }
    
    function restoreCalendarData() {
        const calendarElements = []
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
        setTodaysDate(calendarElements)
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
        setTodaysDate(calendarElements)
        return calendarElements
    }

    localStorage.setItem('idList', JSON.stringify(idList))
        
    function calendarBoxClicked(date) {
        if (day === date) {
            for (let i = 0; i < calendarData.length; i++){
                if (calendarData[i].props.date === date){
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
    }

    function closePopup() {
        setShowPopup(false)
        document.getElementById(date.props.id).innerHTML = date.props.data.icon
    }

    function closeWarningPopup() {
        setShowWarningPopup(false)
    }

    console.log(date)


    return (
        <div className='calendar-page--container'>
            <div className='calendar-page--content'>
                {showPopup && <div className='pop-up'>
                    <button className='close-button' onClick={closePopup}>
                        &times;
                    </button>
                    <h2>{date.props.date}. desember</h2>
                    <h4>Dagens aktvitet er: </h4>
                    <p>{date.props.data.activity}</p>
                    <p className='icon'>{date.props.data.icon}</p>
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