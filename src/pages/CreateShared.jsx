import React from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert"

export default function CreateShared() {
    /* const [item, setItem] = React.useState() */
    const [calendarData, setCalendarData] = React.useState()
    const [warning, setWarning] = React.useState()

    function readData(item) {
        const file = item.target.files[0]
        let fr = new FileReader()
        fr.onload = function () {
            const recivedData = JSON.parse(fr.result)
            setCalendarData(recivedData)
            localStorage.setItem('calendar-data', JSON.stringify(recivedData))
        }

        fr.readAsText(file)
        document.querySelector('.show-link').classList.remove('blocked')
        localStorage.setItem('calendarCreated', true)
        if (localStorage.getItem('idList')) {
            localStorage.removeItem('idList')
        }
    }

    function showWarning() {
        setWarning(prevState => !prevState)
    }
    

    return (
        <div className="create-shared-container">
            <div className="file-selector-popup">
                <h3>Last opp aktivitets-fil</h3>
                <input id="file-selector" type="file" onChange={(e) => readData(e)}/>
                {calendarData ? 
                <Link
                    to='/shared' 
                    className="show-link"
                >Vis kalender</Link>:
                <Link
                    onClick={showWarning}
                    className="show-link"
                >Vis kalender</Link>}
                {warning && <Alert type='create-error' message='Du må velge fil før du kan se kalenderen.' onClick={showWarning}/>}
            </div>
        </div>
        
    )
}