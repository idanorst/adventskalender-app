import '../style.css'
import React from 'react'
import { 
    useOutletContext,
    useLocation
} from 'react-router-dom'
import { data } from '../data'
import CalendarBox from '../components/CalendarBox'
import { saveAs } from 'file-saver'

export default function CalenderPage() {
    let randomNumbers = [
        60, 10, 64, 30, 22, 51, 1, 8, 39, 36, 62, 50, 18, 25, 
        26, 11, 31, 2, 43, 14, 55, 66, 59, 32, 54, 23, 5, 20, 
        17, 49, 16, 0, 48, 29, 57, 65, 41, 61, 42, 53, 7, 13, 
        12, 19, 3, 37, 35, 15, 38, 52, 40, 34, 47, 44, 46, 28,
        63, 58, 27, 4, 24, 56, 45, 9, 21, 6, 33
    ]
    
    const calendarCreated = localStorage.getItem('calendarCreated')
    const customMadeData = JSON.parse(localStorage.getItem('custom-data')) || JSON.parse(localStorage.getItem('calendar-data')) || []
    const customCreated = JSON.parse(localStorage.getItem('custom-data'))
    const [idList, setIdList] = React.useState(JSON.parse(localStorage.getItem('idList')) || [])
    const [ day ] = useOutletContext()
    const [date, setDate] = React.useState()
    const location = useLocation()
    const [calendarData] = React.useState(setData)
    const [earlyDate, setEarlyDate] = React.useState()
    const [sharePopup, setSharePopup] = React.useState()
    const [emailInfo, setEmailInfo] = React.useState()
    const [showPopup, setShowPopup] = React.useState(false)
    const [showEarlyPopup, setShowEarlyPopup] = React.useState(false)
    const [showWarningPopup, setShowWarningPopup] = React.useState(false)

    const [dateStatus, setDateStatus] = React.useState()
    const [earlyDateStatus, setEarlyDateStatus] = React.useState()
    
    const [wrongDate, setWrongDate] = React.useState()
    const december = true

    const [godJul, setGodJul] = React.useState(localStorage.getItem('god-jul') || false) 

    function setData() {
        var calendarElements = []
        if (!calendarCreated) {
            calendarElements = createNewCalendarElements()
            localStorage.setItem('calendarCreated', true) 
        } else if (calendarCreated) {
            calendarElements = restoreCalendarData()
        } 
        return calendarElements
    }

    function setTodaysDate(data) {
        for (let i = 0; i < data.length; i++) {
            if (parseInt(data[i].props.date) === day) {
                setDate(data[i])
            }
        }
    }

    function restoreCalendarData() {
        const calendarElements = []
        if (customMadeData.length === 24) {
            for (let i = 0; i < 24; i++) {
                calendarElements.push(
                    <CalendarBox 
                        id={customMadeData[i].id} 
                        key={customMadeData[i].id}
                        date={customMadeData[i].id}
                        data={customMadeData[i]}
                        onClick={calendarBoxClicked}
                    />
                )
            }
        } else {
            for (let i = 0; i < 24; i++) {
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
        }
        setTodaysDate(calendarElements)
        return calendarElements
    }

    function createNewCalendarElements() {
        const calendarElements = []
        if (location.state?.search === '?customMade'){
            for (let i = 0; i < customMadeData.length; i++) {
                setIdList(prevList => [...prevList, customMadeData[i].id])
                calendarElements.push(
                    <CalendarBox 
                        id={customMadeData[i].id} 
                        key={customMadeData[i].id}
                        date={customMadeData[i].id}
                        data={customMadeData[i]}
                        onClick={calendarBoxClicked} 
                    />
                )
            }

        } else {
            if (location.state?.search === '?familieaktiviteter') {
                let count = 0
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
                let count = 0
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
                let count = 0
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
        }
        setTodaysDate(calendarElements)
        return calendarElements
    }

    localStorage.setItem('idList', JSON.stringify(idList))
        
    function calendarBoxClicked(date) {
        if (day === parseInt(date) && december != false) {
            for (let i = 0; i < calendarData.length; i++){
                if (calendarData[i].props.date === date){
                    setShowPopup(true)
                    document.getElementById(calendarData[i].props.id).innerHTML = ''
                }
            }
        } else if (date < day && december != false) {
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
        console.log("checking")
        if (localStorage.getItem(date)){
            return 'checked'
        } else {
            return ''
        }
    } */

    function shareCalendar() {
        if (JSON.parse(localStorage.getItem('custom-data')).length > 0){
            // Creating a txt file with the custom-made activities
            const file = new Blob([JSON.stringify(customMadeData)], {type: 'text/plain;charset=utf-8'})
            saveAs(file, 'activities.txt')
        } else {
            const calendarElements = []
            for (let i = 0; i < idList.length; i++) {
                const activityObject = {
                    id: i + 1,
                    activity: data[idList[i]].activity,
                    icon: data[idList[i]].icon
                }
                calendarElements.push(activityObject)
            }
            // Creating a txt file with the custom-made activities
            const file = new Blob([JSON.stringify(calendarElements)], {type: 'text/plain;charset=utf-8'})
            saveAs(file, 'activities.txt')
        }
        setSharePopup(true)
        const url = (window.location.href).slice(0, -9)
        setEmailInfo(`mailto:?subject=Adventskalender&body=Det har blitt delt en julekalender med deg.%0D%0A%0D%0AKopier linken under får å åpne adventskalenderen.%0D%0A%0D%0A${url}`)
    }

    function closeSharePopup() {
        setSharePopup(false)
    }

    function closeShare() {
        setSharePopup(false)
    }
    
    function closeGodJul() {
        setGodJul(true)
        localStorage.setItem('god-jul', true)
    }

    return (
        <div className='calendar-page--container'>
            <div className='calendar-page--content'>
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
            {customCreated && <button className='share-btn' onClick={shareCalendar}>Del 🔗</button>}
            {sharePopup && <div className='pop-up-container'>
                <div className='share-popup'>
                    <span className='close-button' onClick={closeShare}>
                        &times;
                    </span>
                    <h3>Del kalenderen med andre</h3>
                    <p>Legg med 'activities.txt' som vedlegg og del kalenderen med andre.</p>
                    <a href={emailInfo} onClick={closeSharePopup}>Send kalender</a>
                </div>
            </div>
            }
        </div>
    )
}
