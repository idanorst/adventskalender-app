import React from "react"
import '../style.css'
import { data } from '../data.js'
import Dropdown from "../components/Dropdown"


export default function ActivityExamples() {
    const databaseData = data
    /* const categoryList = ['Familie aktiviteter', 'Kulinariske aktiviteter', 'Fysiske utfordringer'] */
    const activityList = []
    const [category, setCategory] = React.useState()

    function selectCategory(c) {
        setCategory(c)
    }

    console.log(category)

    if (category) {
        for (let i = 0; i < databaseData.length; i++) {
            if (category === 'familieaktiviteter' && databaseData[i].category.includes('Familieaktivitet')) {
                console.log("familie")
                activityList.push(
                    <div className="activity-data" key={i}>
                        <p className="activity-name">{databaseData[i].activity}</p>
                    </div>
                )
            } else if (category === 'kulinarisk' && databaseData[i].category.includes('Kulinarisk aktivitet')) {
                console.log("kulinarisk")
                activityList.push(
                    <div className="activity-data" key={i}>
                        <p className="activity-name">{databaseData[i].activity}</p>
                    </div>
                )
            } else if (category === 'fysisk' && databaseData[i].category.includes('Fysisk aktivitet')) {
                console.log("fysisk")
                activityList.push(
                    <div className="activity-data" key={i}>
                        <p className="activity-name">{databaseData[i].activity}</p>
                    </div>
                )
            } else if (category === 'blanding') {
                activityList.push(
                    <div className="activity-data" key={i}>
                        <p className="activity-name">{databaseData[i].activity}</p>
                    </div>
                )
            }
            console.log(activityList.length)
        } 
    } else {
        for (let i = 0; i < databaseData.length; i++) {
            activityList.push(
                <div className="activity-data" key={i}>
                    <p className="activity-name">{databaseData[i].activity}</p>
                </div>
            )
        }
    }

    console.log(activityList)


    return (
        <div className="activity-database-container">
            {/* <h1>Aktivitetsdatabase</h1> */}
            <Dropdown onChange={selectCategory}/>
            <div className="activity-database">
                {activityList}
             </div>
        </div>
        
    )
}