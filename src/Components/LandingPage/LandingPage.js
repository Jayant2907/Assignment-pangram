import React from 'react'
import Cards from '../Cards/Cards'
import "./LandingPage.css"
const LandingPage = ({setIsMentor}) => {
    return (
        <div className="landing-page">
           <h2 className="landing-page-heading">Welcome to company project management system</h2>
           <Cards setIsMentor={setIsMentor}/>
        </div>
    )
}

export default LandingPage
