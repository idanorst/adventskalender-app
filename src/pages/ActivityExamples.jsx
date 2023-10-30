import React from "react"
import '../style.css'
import { data } from '../data.js'
import Dropdown from "../components/Dropdown"


export default function ActivityExamples() {
    const databaseData = data
    const categoryList = ['Familie aktiviteter', 'Kulinariske aktiviteter', 'Fysiske utfordringer']
    const activityList = []
    const [category, setCategory] = React.useState()

    function selectCategory(c) {
        setCategory(c)
    }

    /* document.querySelector(".home-link").style.visibility = "visible" */

    /* document.querySelector(".home-link").style.pointerEvents = "none" */

    /* if (document.querySelector(".home-link").style.visibility !== "hidden"){
        console.log("hiding")
        document.querySelector(".home-link").style.visibility = "hidden"
    } */
   
    /* document.querySelector(".top-row").style.paddingLeft = "1rem" */


    if (category) {
        for (let i = 0; i < databaseData.length; i++) {
            console.log(databaseData[i].category)
            if (category === 'familieaktiviteter' && databaseData[i].category.includes('Familieaktivitet')) {
                activityList.push(
                    <div className="activity-data" key={i}>
                        <p className="activity-name">{databaseData[i].activity}</p>
                    </div>
                )
            } else if (category === 'kulinarisk' && databaseData[i].category.includes('Kulinarisk aktivitet')) {
                activityList.push(
                    <div className="activity-data" key={i}>
                        <p className="activity-name">{databaseData[i].activity}</p>
                    </div>
                )
            } else if (category === 'fysisk' && databaseData[i].category.includes('Fysisk aktivitet')) {
                activityList.push(
                    <div className="activity-data" key={i}>
                        <p className="activity-name">{databaseData[i].activity}</p>
                    </div>
                )
            } else {
                activityList.push(
                    <div className="activity-data" key={i}>
                        <p className="activity-name">{databaseData[i].activity}</p>
                    </div>
                )
            }
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


    return (
        <div className="activity-database-container">
            <h1>Aktivitetsdatabase</h1>
            <Dropdown onChange={selectCategory}/>
            <div className="activity-database">
                {activityList}
             </div>
        </div>
        
    )
}