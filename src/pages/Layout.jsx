import React from 'react'
import '../style.css'
import { 
    Outlet,
    Link
} from 'react-router-dom'
import Snowfall from 'react-snowfall'

export default function Layout() {
    const months = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']

    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const stringifiedMonth = months[month]

    const christmas = new Date('12/24/2024')

    const windowWidth = window.innerWidth

    let difference =  christmas.getTime() - date.getTime()
    let daysUntilChristmas = Math.ceil(difference / (1000 * 3600 * 24))

    return (
        <div className='container'>
            <Snowfall style={{zIndex: '100'}}/>
            <div className='top-row'>
                <Link path='realtive' to='..' className='home-link'>🏠</Link>
                {(windowWidth > 450 && windowWidth < 1000) && <h2>🎄</h2>}
                {windowWidth > 1000 && <h2>🎄🎄</h2>}
                <h2>{(day === 24) ? 'Juleaften' : `${day}. ${stringifiedMonth}`}</h2>
                {windowWidth >= 450 && <h2>🎄🎅🎄</h2>}
                {windowWidth < 450 && <h2>🎄🎄</h2>}
                {(day >= 24) ? <h2>God jul!</h2> : <h2>Dager igjen til jul: {daysUntilChristmas} </h2>}
                {(windowWidth > 450 && windowWidth < 1000) && <h2>🎄</h2>}
                {windowWidth > 1000 && <h2>🎄🎄</h2>}
            </div>
            <Outlet context ={[day, month]}/>
        </div>
    )
}
