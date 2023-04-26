import '../style.css'
import React from 'react'
import { useOutletContext } from 'react-router'
import { data } from '../data'

export default function CalenderPage() {
    const [showPopup, setShowPopup] = React.useState(false)
    const [showWarningPopup, setShowWarningPopup] = React.useState(false)
    const [date, setDate] = React.useState()
    const [ day ] = useOutletContext()

    console.log(day)
    

    const calendarElements = data.map(e => {
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
    })

    function calendarBoxClicked(e) {
        setDate(e)
        if (day === e.id) {
            setShowPopup(true)
            document.getElementById(e.id).style.backdropFilter = 'blur(5px)';
            document.getElementById(e.id).innerHTML = ''
        } else {
            setShowWarningPopup(true)
        }
    }

    function closePopup() {
        setShowPopup(false)
        document.getElementById(date.id).innerHTML = date.icon
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
                    <h2>{date.id}. desember</h2>
                    <h4>Dagens aktvitet er: </h4>
                    <p>{date.activity}</p>
                    <p className='icon'>{date.icon}</p>
                </div>}
                {showWarningPopup && <div className='warning-pop-up'>
                    <button className='close-button' onClick={closeWarningPopup}>
                        &times;
                    </button>
                    <h2>Å nei du, det er ikke {date.id}. desember idag.</h2>
                    <p>🎅</p>
                </div>}
                {calendarElements}
                {/* <div id='1' className='calendar-box' onClick={() => calendarBoxClicked(1)}>1</div>
                <div id='2' className='calendar-box' onClick={() => calendarBoxClicked(2)}>2</div>
                <div id='3' className='calendar-box' onClick={() => calendarBoxClicked(3)}>3</div>
                <div id='4' className='calendar-box' onClick={() => calendarBoxClicked(4)}>4</div>
                <div id='5' className='calendar-box' onClick={() => calendarBoxClicked(5)}>5</div>
                <div id='6' className='calendar-box' onClick={() => calendarBoxClicked(6)}>6</div>
                <div id='7' className='calendar-box' onClick={() => calendarBoxClicked(7)}>7</div>
                <div id='8' className='calendar-box' onClick={() => calendarBoxClicked(8)}>8</div>
                <div id='9' className='calendar-box' onClick={() => calendarBoxClicked(9)}>9</div>
                <div id='10' className='calendar-box' onClick={() => calendarBoxClicked(10)}>10</div>
                <div id='11' className='calendar-box' onClick={() => calendarBoxClicked(11)}>11</div>
                <div id='12' className='calendar-box' onClick={() => calendarBoxClicked(12)}>12</div>
                <div id='13' className='calendar-box' onClick={() => calendarBoxClicked(13)}>13</div>
                <div id='14' className='calendar-box' onClick={() => calendarBoxClicked(14)}>14</div>
                <div id='15' className='calendar-box' onClick={() => calendarBoxClicked(15)}>15</div>
                <div id='16' className='calendar-box' onClick={() => calendarBoxClicked(16)}>16</div>
                <div id='17' className='calendar-box' onClick={() => calendarBoxClicked(17)}>17</div>
                <div id='18' className='calendar-box' onClick={() => calendarBoxClicked(18)}>18</div>
                <div id='19' className='calendar-box' onClick={() => calendarBoxClicked(19)}>19</div>
                <div id='20' className='calendar-box' onClick={() => calendarBoxClicked(20)}>20</div>
                <div id='21' className='calendar-box' onClick={() => calendarBoxClicked(21)}>21</div>
                <div id='22' className='calendar-box' onClick={() => calendarBoxClicked(22)}>22</div>
                <div id='23' className='calendar-box' onClick={() => calendarBoxClicked(23)}>23</div>
                <div id='24' className='calendar-box' onClick={() => calendarBoxClicked(24)}>24</div> */}
            </div>
        </div>
    )
}