import React from 'react'
import "./AddProjectCard.css"
const AddProjectCard = ({setSection}) => {
    return (
        <div className="AddProjectCard" onClick={() =>setSection(1)}>
            <h3>Add Project</h3>
            <h1 >+</h1>

            
        </div>
    )
}

export default AddProjectCard
