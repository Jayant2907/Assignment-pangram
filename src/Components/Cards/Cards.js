import React from 'react'
import { Button, Card,  CardMedia, Typography } from '@material-ui/core'
import {Link } from 'react-router-dom'
import "./Cards.css"
import mentor from "../../Images/mentor.png"
import employee from "../../Images/employee.png"
const Cards = ({setIsMentor}) => {
    return (
        <div className="cards">
            <Card className="vendor_card" onClick={() => {setIsMentor(true)}} component={Link} to={"/auth"}>      
                      <CardMedia
                        className="vendor_icon"
                        image={mentor}
                        title="Mentor"
                        // style={{width:"200px",height:"200px",marginBottom:"2rem"}}
                      />      
                      <Button size="small" color="primary" className="title-button" style={{color:"#FFB600",textTransform:"capitalize",fontSize:"1.75rem",marginBottom:"-5px",fontWeight:"600"}}>
                        Mentor
                      </Button>
                      <Typography gutterBottom className="landingpage-signin" style={{color:"white",padding:"0px 1px",textAlign:"center",fontWeight:"600"}}>
                        SignIn as a Mentor
                      </Typography>     
            </Card>
            <Card className="vendor_card" onClick={() => {setIsMentor(false)}} component={Link} to={"/auth"}>      
                      <CardMedia
                        className="vendor_icon"
                        image={employee}
                        title="Mentor"
                        // style={{width:"200px",height:"200px",marginBottom:"2rem"}}
                      />      
                      <Button size="small" color="primary" className="title-button" style={{color:"#FFB600",textTransform:"capitalize",fontSize:"1.75rem",marginBottom:"-5px",fontWeight:"600"}}>
                        Employee
                      </Button>
                      <Typography gutterBottom className="landingpage-signin" style={{color:"white",padding:"0px 1px",textAlign:"center",fontWeight:"600"}}>
                        SignIn as a Employee
                      </Typography>     
            </Card>
            
        </div>
    )
}

export default Cards
