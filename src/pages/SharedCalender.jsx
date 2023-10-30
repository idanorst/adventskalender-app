import React from "react"
import '../style.css'
import CalendarBox from "../components/CalendarBox"
import { 
    useOutletContext,
    useLocation
} from 'react-router-dom'

export default function SharedCalendar() {
    document.querySelector("body").style.overflow = "hidden"
    const [item, setItem] = React.useState()
    const calendarCreated = localStorage.getItem('calendar-created')
    const [ day ] = useOutletContext()
    const [date, setDate] = React.useState()
    const [calendarData, setCalendarData] = React.useState(restoreCalendarData)
    /* const [newCalendarData, setNewCalendarData] = React.useState(createNewCalendarElements) */
    const [earlyDate, setEarlyDate] = React.useState()
    const [showPopup, setShowPopup] = React.useState(false)
    const [showEarlyPopup, setShowEarlyPopup] = React.useState(false)
    const [showWarningPopup, setShowWarningPopup] = React.useState(false)
    const [wrongDate, setWrongDate] = React.useState()
    const [showFileSelector, setShowFileSelector] = React.useState(calendarCreated ? false : true)
    const [showButton, setShowButton] = React.useState(true)

    /* console.log("Rerendering")
    console.log(newCalendarData )*/

    /* const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    
    React.useEffect(() => {
        if (!showFileSelector) {
            console.log("setting data")
            forceUpdate()
        }    
    }, []) */
    /* let file

    
    if (document.querySelector('#file-selector')) {
        console.log("file")
        file = document.querySelector('#file-selector').files[0]
    } */
    

    /* const [dataSet, setDataSet] = React.useState(false) */

    // Getting the calendar-data
    /* React.useEffect(() => {
        if (item) {
            const file = item.target.files[0]
            var fr = new FileReader()
            fr.onload = function() {
                setRecievedCalendarData(fr.result)
            }
            fr.readAsText(file)
        }
    }, [item]) */

    /* if (recievedCalendarData) {
        console.log("ok")
        setCalendarData(setData())
    } */

   /*  function refreshPage() {
        window.location.reload(false);
      } */

    function closeFileSelector() {
        setShowFileSelector(false)

        /* let calendarElements = []
        let recievedData
        const file = item.target.files[0]
        let fr = new FileReader()
        fr.onload = function() {
            recievedData = JSON.parse(fr.result)
            for (let i = 0; i < 24; i++){
                calendarElements.push(
                    <CalendarBox 
                        id={recievedData[i].id}
                        key={recievedData[i].id}
                        date={recievedData[i].id}
                        data={recievedData[i]}
                        onClick={calendarBoxClicked}
                    />
                )
            }
            setTodaysDate(calendarElements)
            localStorage.setItem('calendar-data', JSON.stringify(recievedData))
            localStorage.setItem('calendar-created', true)
            //refreshPage()
        }
        fr.readAsText(file) */
        /* setData() */
        /* const file = document.querySelector('#file-selector').files[0] */
        /* let data 
        let fr = new FileReader()
        fr.onload = function() {
            setRecievedCalendarData(fr.result)
        }
        fr.readAsText(file) */
    }

    /* function setData() {
        let calendarElements = []
        if (!calendarCreated) {
            console.log('Creating...')
            calendarElements = createNewCalendarElements()
            //setDataSet(true)
            setCalendarData(calendarElements)
            forceUpdate()
        } else if (calendarCreated) {
            const calendarData = JSON.parse(localStorage.getItem('calendar-data'))
            calendarElements = restoreCalendarData(calendarData)
            console.log('Restoring...')
            //setDataSet(true)
        } 
        return calendarElements
    } */

    function setTodaysDate(data) {
        for (let i = 0; i < data.length; i++) {
            if (parseInt(data[i].props.date) === day) {
                setDate(data[i])
            }
        }
    }

    function restoreCalendarData() {
        const calendarData = JSON.parse(localStorage.getItem('calendar-data'))
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

    function createNewCalendarElements() {
        const calendarElements = []
        console.log(JSON.parse(localStorage.getItem('calendar-data')))
        /* for (let i = 0; i < recievedCalendarData.length; i++){
            calendarElements.push(
                <CalendarBox 
                    id={recievedCalendarData[i].id}
                    key={recievedCalendarData[i].id}
                    date={recievedCalendarData[i].id}
                    data={recievedCalendarData[i]}
                    onClick={calendarBoxClicked}
                />
            )
        }
        setTodaysDate(calendarElements)
        localStorage.setItem('calendarData', JSON.stringify(calendarElements)) */

        /* let recievedData
        const file = item.target.files[0]
        let fr = new FileReader()
        fr.onload = function() {
            recievedData = JSON.parse(fr.result)
            for (let i = 0; i < 24; i++){
                calendarElements.push(
                    <CalendarBox 
                        id={recievedData[i].id}
                        key={recievedData[i].id}
                        date={recievedData[i].id}
                        data={recievedData[i]}
                        onClick={calendarBoxClicked}
                    />
                )
            }
            setTodaysDate(calendarElements)
            localStorage.setItem('calendar-data', JSON.stringify(recievedData))
            localStorage.setItem('calendar-created', true)
        }
        fr.readAsText(file) */
        return calendarElements
    }

    function calendarBoxClicked(date) {
        if (day === parseInt(date)) {
            for (let i = 0; i < calendarData.length; i++){
                if (calendarData[i].props.date === date){
                    setShowPopup(true)
                    document.getElementById(calendarData[i].props.id).innerHTML = ''
                }
            }
        } else if (date < day) {
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
        if (localStorage.getItem(date.props.date)) {
            document.getElementById(date.props.id).innerHTML = date.props.data.icon
            document.getElementById(date.props.id).style.backdropFilter = 'blur(5px)';
        } else {
            document.getElementById(date.props.id).innerHTML = date.props.date
        }
    }

    function closeEarlyPopup() {
        setShowEarlyPopup(false)
        if (localStorage.getItem(earlyDate.props.date)) {
            document.getElementById(earlyDate.props.id).innerHTML = earlyDate.props.data.icon
            document.getElementById(earlyDate.props.id).style.backdropFilter = 'blur(5px)';
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
        } else {
            localStorage.setItem(date.props.date, true)
        }
        
    }

    function setEarlyDateChecked() {
        if (localStorage.getItem(earlyDate.props.date)){
            console.log('Checked')
            localStorage.removeItem(earlyDate.props.date)
        } else {
            localStorage.setItem(earlyDate.props.date, true)
        }
        
    }

    function checkIfChecked(date) {
        if (localStorage.getItem(date)){
            return 'checked'
        } else {
            return ''
        }
    }

    

    return (
        <div className="calendar-page--container shared-container">
            <div className='calendar-page--content'>
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
                                    checked={checkIfChecked(date.props.date)}
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
                                    checked={checkIfChecked(earlyDate.props.date)} 
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
                {/* {showFileSelector && 
                    <div className="file-selector-popup">
                        <h3>Last opp aktivitets-fil</h3>
                        <input id="file-selector" type="file" onChange={(e) => setItem(e)}/>
                        <button className="add-btn" onClick={closeFileSelector}>Legg til</button>
                    </div>
                } */}
                
                {calendarData}
            </div>
        </div>
        
    )
}
