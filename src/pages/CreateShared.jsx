import React from "react"
import { Link } from "react-router-dom"

export default function CreateShared() {
    const [item, setItem] = React.useState()
    const [calendarData, setCalendarData] = React.useState()

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
    }
    

    return (
        <div className="create-shared-container">
            <div className="file-selector-popup">
                <h3>Last opp aktivitets-fil</h3>
                <input id="file-selector" type="file" onChange={(e) => readData(e)}/>
                <Link
                    to='/shared' 
                    className="show-link blocked"
                >Vis kalender</Link>
            </div>
        </div>
        
    )
}