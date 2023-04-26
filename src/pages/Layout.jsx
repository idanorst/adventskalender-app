import React from 'react'
import '../style.css'
import { Outlet } from 'react-router-dom'

export default function Layout() {

    const months = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']

    const date = new Date()
    /* const day = date.getDate() */
    const day = 2
    const month = 11
    const stringifiedMonth = months[month]

    const christmas = new Date('12/24/2023')

    let difference =  christmas.getTime() - date.getTime()
    let daysUntilChristmas = Math.ceil(difference / (1000 * 3600 * 24))

    return (
        <div>
            <div className='top-row'>
                <h2>🎄🎄</h2>
                <h2>{day} {stringifiedMonth}</h2>
                <h2>🎄🎅🎄</h2>
                <h2>Dager igjen til jul: {daysUntilChristmas} </h2>
                <h2>🎄🎄</h2>
            </div>
            <Outlet context ={[day]}/>
        </div>
    )
}