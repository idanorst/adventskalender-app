import '../style.css'
import React from 'react'

export default function Alert(props) {
    const [isShow, setIsShow] = React.useState(true)

    console.log(props)

    /* const renderElAlert = function () {
        return React.cloneElement(children)
    } */

    /* const handleClose = (e) => {
        e.preventDefault()
        setIsShow(false)
    } */

    return (
        <div className='alert'>
            <span className='closebtn' onClick={() => props.onClick()}>
                &times;
            </span>
           message
        </div>
    )
}