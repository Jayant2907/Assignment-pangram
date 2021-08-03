import React from 'react'
import "./ProjectCard.css"
import { Button, Card,  CardMedia, Typography ,Grid} from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
const ProjectCard = ({project,setCurrProject}) => {
    const history=useHistory()
    const handleProject=async() => {

        await axios.get(`${process.env.REACT_APP_URL}/get_project/${project?.id}`)
        .then((response) =>{console.log(response?.data?.data)
            setCurrProject(response.data.data)
        }
        
        )

        history.push('/project')
        console.log(project,"project")
    }
    return (
            // <Grid xs={6}>
               <Card className="project-card" onClick={handleProject}>
                <h3 style={{textDecoration:'none'}}>{project?.requirements}</h3>
                <span>View Details</span>
               

            </Card> 
            // </Grid>
            

    )
}

export default ProjectCard
