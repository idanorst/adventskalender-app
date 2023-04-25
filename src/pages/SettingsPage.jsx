import '../style.css'
import React from 'react'
import Dropdown from '../components/Dropdown'

export default function SettingsPage() {

    function selectCategory(category) {
        console.log(category)
    }

    return (
        <div className='calender-page--container'>
            <h1 className='settings-page--title'>Lag din egen adventskalender</h1>
            <div className='category-container'>
                <h4>Velg kategori:</h4>
                <Dropdown onChange={selectCategory}/>
            </div>
            <button className='button--visit'>Vis kalender</button>
        </div>
    )
}