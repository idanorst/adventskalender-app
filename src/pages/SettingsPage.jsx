import '../style.css'
import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from '../components/Dropdown'
import DatalistInput from 'react-datalist-input'
/* import { click } from '@testing-library/user-event/dist/click' */
import { FaCircleInfo } from 'react-icons/fa6'
/* import { saveAs } from 'file-saver' */
import ActivityExamples from './ActivityExamples'

export default function SettingsPage() {
    const [category, setCategory] = React.useState()
    const [customMadeData, setCustomMadeData] = React.useState(JSON.parse(localStorage.getItem('custom-data')) || [])
    const [calendarComplete, setCalendarComplete] = React.useState(false)
    const [dateList, setDateList] = React.useState([])
    const [createPopUp, setCreatePopUp] = React.useState(false)
    const [popUp, setPopup] = React.useState(false)
    const [clickedDate, setClickedDate] = React.useState()
    const [activity, setActivity] = React.useState()
    const [icon, setIcon] = React.useState()
    /* const [completeDate, setCompleteDate] = React.useState(false) */
    const [showExamples, setShowExamples] = React.useState(false)
    const [chooseWarning, setChooseWarning] = React.useState(false)

    if (dateList.length === 0 && customMadeData.length !== 0) {
        for (let i = 0; i < customMadeData.length; i++) {
            setDateList(prevList => [...prevList, customMadeData[i].id])
        }
    }

    const icons = [
        '📮','👩‍🍳','🌞','🛍️','🖼️','🎶','✉️',  '✂️','🎁','🤶','🎞️','🔥','🍫','🌲','🤝', '🎲','🎄','💡','🍞','🪪','🎤','🥄','🍽️', '🧊','❄️','💸','🍬','❓','🥶','🏃‍♂️','🏋️','🛷','🧘','⛷️','💪','🦵','🚶','🏃‍♀️','🧗','😅','🥵','🧑‍🤝‍🧑','🐑','🐟','🥨','🥮','🍚','🎀','🍴','💕','☕','🫖','💝','🥣','🐖','🍮','📺'
    ]

    function selectCategory(c) {
        if (localStorage.getItem('calendarCreated')) {
            localStorage.removeItem('calendarCreated')
            localStorage.removeItem('idList')
            localStorage.removeItem('calendarCreated')
        }
        setCategory(c)
    }

    if (popUp || createPopUp) {
        document.querySelector(".settings-page--container").style.display = "none"
        document.querySelector(".make-own-container").classList.add("absolute")
        document.querySelector(".back-btn").style.display = "block"
    }

    const miniCalendar = []
    for (let i = 0; i < 24; i++) {
        miniCalendar.push(
            <div className={`mini-date`} id={i} onClick={openPopup} key={i}>{i+1}</div>
        )
    }

    setTimeout(() => {
        if (customMadeData.length > 0) {
            for (let k = 0; k < customMadeData.length; k++) {
                if (dateList.includes(customMadeData[k].id)) {
                    document.querySelector(".mini-calendar").children[dateList[k]-1].classList.add("date-completed")
                }
            }
    }})

    React.useEffect(() => {
        if (customMadeData.length === 24) {
            setCalendarComplete(true)
        }
    },[customMadeData.length])

    const iconElements = []
    for (let i = 0; i < icons.length; i++) {
        iconElements.push(
            {id: icons[i], value: icons[i]}
        )
    }

    function openPopup(event) {
        let currentDate = event.target.innerText
        setClickedDate(currentDate)

        if (!dateList.includes(currentDate)){
            setDateList(prevList => [...prevList, currentDate])
        }

        const datePos = dateList.indexOf(currentDate)

        if (customMadeData[datePos]) {
            openDatePopUp()
        } else {
            openCreatePopUp()
        }
        
    }

    function openDatePopUp() {
        setPopup(true)
    }

    function openCreatePopUp() {
        /* setCompleteDate(false) */
        const datePos = dateList.indexOf(clickedDate)
        if (customMadeData[datePos]) {
            console.log("already in list")
            setActivity(customMadeData[datePos].activity)
            setIcon(customMadeData[datePos].icon)
            setCreatePopUp(true)
            closePopup()
        } else {
            setCreatePopUp(true)
        }
    }

    function addActivity() {
        const currentActivity = document.querySelector("#activity").value
        const currentIcon = document.querySelector(".react-datalist-input__textbox").value
        const datePos = dateList.indexOf(clickedDate)

        /* if (currentActivity && currentIcon) {
            setCompleteDate(true)
        } */

        if ((!currentActivity || !currentIcon) && customMadeData[datePos]) {
            console.log("hdk")
            if (dateList[datePos] === clickedDate) {
                openWarning("no complete change")
                return
            } 
        } 
    
        if ((!currentActivity || !currentIcon) && !customMadeData[datePos]) {
            openWarning("add")
            return
        }
        
        // Create element from the data
        const activityObject = {
            id: clickedDate,
            activity: activity,
            icon: icon
        }

        if (customMadeData[datePos]) {
            let newArray = [...customMadeData]
                newArray[datePos] = activityObject
                setCustomMadeData(newArray)
        } else {
            setCustomMadeData(prevList => [...prevList, activityObject])
        }

        document.querySelector(".mini-calendar").children[clickedDate-1].classList.add("date-completed")
        setCreatePopUp(false)
        /* setCompleteDate(false) */
        /* setActivity()
        setIcon() */
    }

    function closeCreatePopup(event) {
        const currentIcon = document.querySelector('.react-datalist-input__textbox').value
        const currentActivity = document.querySelector('#activity').value
        const datePos = dateList.indexOf(clickedDate)

        if (event.target.innerText === "Behold det gamle") {
            setCreatePopUp(false)
        }

        if (event.target.innerText === "Lukk") {
            setCreatePopUp(false)
        } 

        if (currentActivity && currentIcon) {
            openWarning("ingen endring")
        } else if ((!currentActivity && currentIcon) || (currentActivity && currentIcon === '')) {
            openWarning("tilbake")
        } else {
            if (customMadeData[datePos] && !currentActivity && !currentIcon) {
                console.log(customMadeData[datePos].id, customMadeData[datePos].activity, customMadeData[datePos].icon )
                setCustomMadeData((prevState) => 
                    prevState.filter((prevItem) => prevItem !== customMadeData[datePos]))
                document.querySelector(".mini-calendar").children[dateList[datePos]-1].classList.remove("date-completed")
                setDateList(dateList.filter(function(item) {
                    return item !== clickedDate
                }))
            }

            if (!currentActivity && !currentIcon && dateList.includes(clickedDate)) {
                dateList.pop()
            }
            /* setCompleteDate(true) */
            setCreatePopUp(false)
        }
        setShowExamples(false)
    }

    function closePopup() {
        setPopup(false)
    }

    function goBack() {
        document.querySelector(".settings-page--container").style.display = "flex"
        document.querySelector(".make-own-container").classList.remove("absolute")
        document.querySelector(".back-btn").style.display = "none"
    }

    function openWarning(string) {
        console.log("2")
        if (string === "tilbake") {
            document.querySelector(".warning").style.display = "block"
            /* setCompleteDate(true) */
        } else if (string === "ingen endring") {
            document.querySelector(".no-change-warning").style.display = "block"
        } else if (string === "no complete change") {
            console.log("3")
            document.querySelector(".no-complete-change-warning").style.display = "block"
        } else {
            document.querySelector(".add-warning").style.display = "block"
        }
        
    }

    function closeWarning() {
        document.querySelector(".warning").style.display = "none"
        document.querySelector(".add-warning").style.display = "none"
        document.querySelector(".no-change-warning").style.display = "none"
        document.querySelector(".no-complete-change-warning").style.display = "none"
        /* setCompleteDate(false) */
    }

    function openExamples() {
        setShowExamples(true)
        document.querySelector('.create-popup').style.transform = 'translateX(-100px)'
    }

    function closeExamples() {
        setShowExamples(false)
        document.querySelector('.create-popup').style.transform = 'translateX(100px)'
    }

    function showChooseWarning() {
        setChooseWarning(prevState => !prevState)
    }

    localStorage.setItem('custom-data', JSON.stringify(customMadeData))
    

    return (
        <div className='settings-page'>
            <div className='info-div'>
                <h3>Lag en kalender</h3>
                <p>Her kan du lage din egen adventskalender. Du kan velge mellom fire kategorier i dropdown-menyen, som setter sammen en kalender basert på kategorien du velger. Kategoriene du kan velge mellom er <span className='italic'>familieaktiviteter</span>, <span className='italic'>fysiske utfordringer</span>, <span className='italic'>kulinariske aktiviteter</span> og <span className='italic'>god blanding</span>.</p>
                <p>Alternativ to er at du selv fyller inn kalenderaktiviteter etter eget ønske. Her vil det også være mulig å velge mellom aktiviteter som allerede ligger i databasen.</p>
            </div>
            <div className='options-div'>
                <div className='settings-page--container'>
                    <div className='category-container'>
                        <h4>Velg kategori:</h4>
                        <Dropdown onChange={selectCategory}/>
                    </div>
                    {category ? 
                        <Link 
                            className='link-button settings-btn' 
                            relative='path' 
                            to='../calendar'
                            state={{
                                search: `?${category}`
                            }}
                        >Vis kalender</Link>
                    : 
                        <Link 
                            className='link-button settings-btn' 
                            onClick={showChooseWarning}
                        >Vis kalender</Link>
                    }
                    {chooseWarning && 
                        <div className='choose-warning'>
                            <span className='close-button' onClick={showChooseWarning}>
                                &times;
                            </span>
                            <p>Du må velge kategori før du kan se kalender.</p>
                            <p className='choose-icon'>🎅</p>  
                        </div>
                    }
                </div>
                <button className='back-btn' onClick={goBack}>Tilbake</button>
                <div className='make-own-container'>
                    <h4>Legg inn egne aktiviteter</h4>
                    <div className='mini-calendar'>
                        {miniCalendar}
                    </div>
                    <Link 
                        className={`link-button ${!calendarComplete && 'not-clickable'} settings-btn`}
                        relative='path' 
                        to='../calendar'
                        state={{
                            search: '?customMade'
                        }}
                    >Vis kalender</Link>
                    <div className='tooltip-text'>
                        <p>Du må fylle ut alle de 24 lukene før du kan se kalenderen.</p>
                    </div>
                </div>
                {createPopUp && <div className='pop-up-container'>
                    <div className='settings-popup create-popup'>
                        <h4>Legg til aktivitet for {clickedDate}. desember</h4>
                        {dateList.includes(clickedDate) && customMadeData[dateList.indexOf(clickedDate)] ? 
                            <div className='input-trio'>
                                <div className='input-pair activity'>
                                    <label htmlFor="activity">Fyll inn aktivitet: </label>
                                    <FaCircleInfo className='info-btn'/>
                                    <div className='tooltip-text'>
                                        <p>Skriv inn en aktivitet som skal utføres denne datoen. Klikk på "se eksempler" for å få inspirasjon.</p>
                                    </div>
                                </div>
                                <Link
                                    target='_blank' 
                                    to='../activity-examples'
                                    className='examples-link'
                                >Se eksempler</Link>
                                <textarea type="text" id='activity' name="activity" autoComplete='off' onChange={(text) => setActivity(text.target.value)} defaultValue={activity}/>
                            </div>
                        :
                        <div className='input-trio'>
                            <div className='input-pair activity'>
                                <label htmlFor="activity">Fyll inn aktivitet: </label>
                                <FaCircleInfo className='info-btn'/>
                                <div className='tooltip-text'>
                                    <p>Skriv inn en aktivitet som skal utføres denne datoen. Klikk på "se eksempler" for å få inspirasjon.</p>
                                </div>
                            </div>
                            <button
                                className='examples-link'
                                onClick={openExamples}
                            >Se eksempler</button>
                            <textarea type="text" id='activity' name="activity" autoComplete='off' onChange={(text) => setActivity(text.target.value)}/>
                        </div>
                        }   
                        {dateList.includes(clickedDate) && customMadeData[dateList.indexOf(clickedDate)] ?
                            <div className='input-pair datalist'>
                                <DatalistInput
                                className='datalist-icons' 
                                label="Velg ikon: "
                                onSelect={(item) => setIcon(item.value)}
                                items={iconElements}
                                value={icon}
                                />
                                <FaCircleInfo className='info-btn'/>
                                <div className='tooltip-text'>
                                    <p>Velg et ikon som skal vises med aktiviteten. Velg fra lista ved å klikke i input-feltet, eller lim inn et eget ikon.</p>
                                </div>
                            </div>
                                
                            :
                            <div className='input-pair datalist'>
                                <DatalistInput
                                className='datalist-icons' 
                                label="Velg ikon:"
                                onSelect={(item) => setIcon(item.value)}
                                items={iconElements}
                                />
                                <FaCircleInfo className='info-btn'/>
                                <div className='tooltip-text'>
                                    <p>Velg et ikon som skal vises med aktiviteten. Velg fra lista ved å klikke i input-feltet, eller lim inn et eget ikon.</p>
                                </div>
                            </div>
                            
                        }
                        <div className='popup-btn-div'>
                            <button className='popup-btn' onClick={closeCreatePopup}>Tilbake</button>    
                            <button className='popup-btn' onClick={addActivity}>Legg til</button>
                        </div>
                        <div className='warning' style={{display: 'none'}}>
                            <p>Dataene dine vil ikke bli lagret dersom du går tilbake.</p>
                            <button onClick={closeWarning}>Fortsett redigering</button>
                            <button onClick={closeCreatePopup}>Lukk</button>
                        </div>
                        <div className='warning add-warning' style={{display: 'none'}}>
                            <p>Du må både skrive inn aktivitet og velge ikon.</p>
                            <button onClick={closeWarning}>Ok</button>
                        </div>
                        <div className='warning no-change-warning' style={{display: 'none'}}>
                            <p>Du har ikke gjort noen endringer.</p>
                            <button onClick={closeWarning}>Fortsett redigering</button>
                            <button onClick={closeCreatePopup}>Behold det gamle</button>
                        </div>
                        <div className='warning no-complete-change-warning' style={{display: 'none'}}>
                            <p>Du har ikke fullført endringen.</p>
                            <button onClick={closeWarning}>Fortsett redigering</button>
                            <button onClick={closeCreatePopup}>Behold det gamle</button>
                        </div>
                    </div>
                </div>}
                {popUp && <div className='pop-up-container'>
                    <div className='settings-popup date-popup'>
                        <h4>{customMadeData[dateList.indexOf(clickedDate)].id}. desember</h4>
                        <p className='date-activity'>{customMadeData[dateList.indexOf(clickedDate)].activity}</p>
                        <p className='date-icon'>
                        {customMadeData[dateList.indexOf(clickedDate)].icon}</p> 
                        <div className='popup-btn-div'>
                            <button className='popup-btn' onClick={openCreatePopUp}>Endre</button>
                            <button className='popup-btn' onClick={closePopup}>Lukk</button>
                        </div>
                    </div>
                </div>
                }
                {showExamples && 
                <div className='examples-popup'>
                    <button className='close-button' onClick={closeExamples}>
                        &times;
                    </button>
                    <ActivityExamples />
                </div>
                }
            </div>
            
        </div>
    )
}