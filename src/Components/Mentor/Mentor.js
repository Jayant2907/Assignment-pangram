import { Button, Grid } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AddProject from '../Project/AddProject/AddProject'
import AddProjectCard from '../Project/AddProject/AddProjectCard'
import ProjectCard from '../Project/ProjectCard/ProjectCard'
import "./Mentor.css"
const Mentor = ({setCurrProject}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
        history.push('/');
    }
    const [section,setSection]=useState(0)
    const [userId,setUserId] = useState(JSON.parse(localStorage.getItem('profile'))?.data?.id)
    const [user,setUser]=useState(null)
    const [mentorprojects,setMentorProjects] = useState([])
    const getUser=async()=>{
        await axios.get(`${process.env.REACT_APP_URL}/user/${userId}`)
        .then((response)=>{
            console.log(response,userId)
            setUser(response.data?.data[0])
        })
    }
    const getProjectsOfMentor=async()=>{
        await axios.get(`${process.env.REACT_APP_URL}/get_projects_of_mentor/${userId}`)
        .then((response)=>setMentorProjects(response?.data?.data))
    }
    console.log(mentorprojects,"mentorprojects",userId)
    useEffect(
        ()=>{
            getUser()
            getProjectsOfMentor()
            console.log(mentorprojects,"mentorprojects")
        },[]
    )
    return (
        <div className="mentor">
            <Button onClick={handleLogout} style={{backgroundColor: '#ffb600',color:'black'}}>Logout</Button>
           <h2 style={{color:"black"}}>Hii mentor1</h2> 
           {section ===0 && <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                className="projectcards">
                <Grid item sm={12} md={3} lg={4}>
                <AddProjectCard setSection={setSection}/>
                </Grid>
                {mentorprojects?.map((project,index)=>(
                    <Grid item sm={12} md={3} lg={4}><ProjectCard project={project} setCurrProject={setCurrProject}/></Grid>
                ))}
                

                
                
                
                </Grid>
            
            }
            {section===1 && <AddProject setSection={setSection} getProjectsOfMentor={getProjectsOfMentor}  user={user}/>}
            

        </div>
    )
}

export default Mentor
