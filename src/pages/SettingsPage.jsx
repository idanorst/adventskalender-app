import '../style.css'
import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from '../components/Dropdown'
/* import { data } from '../data' */

export default function SettingsPage() {
    const [category, setCategory] = React.useState()
    /* const [activities, setActivities] = React.useState() */

    function selectCategory(c) {
        setCategory(c)
        console.log(category)
    }

    return (
        <div className='settings-page'>
            <div className='settings-page--container'>
                <div className='category-container'>
                    <h4>Velg kategori:</h4>
                    <Dropdown onChange={selectCategory}/>
                </div>
                <Link 
                    className='link--visit' 
                    relative='path' 
                    to='../calendar'
                    state={{
                        search: `?${category}`
                    }}
                    >Vis kalender</Link>
            </div>
        </div>
    )
}