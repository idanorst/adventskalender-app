import React from 'react'
import '../style.css'

// Creating of the arrow-down icon in the dropdown object.
const Icon = () => {
    return (
        <svg height="20" width="20" viewBox="0 0 20 20">
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  )
}

// The dropdown object is taking three props; a placeholder, the options and a function. 
export default function Dropdown({onChange}) {
    const [showMenu, setShowMenu] = React.useState(false)
    const [selectedValue, setSelectedValue] = React.useState(null)

    const options = [
        {value: "familieaktiviteter", label: "Familieaktiviteter"},
        {value: "fysisk", label: 'Fysiske utfordringer'},
        {value: 'kulinarisk', label: 'Kulinariske aktiviteter'},
        {value: 'blanding', label: 'God blanding'}
    ]

    // A useEffect-hook is used to create a eventlistener to the dropdown object.
    React.useEffect(() => {
        const handler = () => setShowMenu(false)

        window.addEventListener("click", handler)
        return () => {
            window.removeEventListener("click", handler)
        }
    })
    
    // Helper function that handles the click on the dropdown, and changes the state of 'showMenu'. 
    function handleInputClick(e) {
        e.stopPropagation()
        setShowMenu(!showMenu)
    }

    // Helper function that changes the value that is displayed in the dropdown object if a value is chosen. 
    function getDisplay() {
        if (selectedValue){
            return selectedValue.label
        }
        return 'Kategori'
    }

    // A function that handles the clicking of elements in the dropdown menu. 
    function onItemClick(option) {
        // Changes the value of the selectedValue state, 
        setSelectedValue(option)
        // and call the onChange function from the App component, either the 'registerCategory' or the 'registerDifficulty' function. 
        onChange(option.value)
    }

    // A function that changes the state of the selectedValue state.
    function isSelected(option) {
        if (!selectedValue) {
            return false
        }
        return selectedValue.value === option.value
    }
    
    // Rendering of the dropdown object. 
    return (
        <div className='dropdown-container'>
            <div onClick={handleInputClick} className='dropdown-input'>
                <div className='dropdown-selected-value'>{getDisplay()}</div>
                <div className='dropdown-tools'>
                    <div className='dropdown-tool'>
                        <Icon />
                    </div>
                </div>
            </div>
           {showMenu && <div className='dropdown-menu'>
                {options.map((option) => (
                    <div 
                        onClick={() => onItemClick(option)}
                        key={option.value} 
                        className={`dropdown-item ${isSelected(option) && 'selected'}`}>
                        {option.label}
                    </div>
                ))}
            </div>
            }
        </div>
    )
}