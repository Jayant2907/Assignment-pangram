import { Button, Grid } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ProjectCard from '../Project/ProjectCard/ProjectCard'

const Employee = ({setCurrProject}) => {
    
    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
        history.push('/');
    }
    const [userId,setUserId] = useState(JSON.parse(localStorage.getItem('profile'))?.data?.id)
    const [user,setUser]=useState(null)
    const [employeeprojects,setEmployeeProjects] = useState([])
    const getUser=async()=>{
        await axios.get(`${process.env.REACT_APP_URL}/user/${userId}`)
        .then((response)=>setUser(response?.data?.data[0]))
    }
    const getProjectsOfEmployee=async()=>{
        await axios.get(`${process.env.REACT_APP_URL}/get_projects_of_mentor/${userId}`)
        .then((response)=>setEmployeeProjects(response?.data?.data))
    }
    useEffect(
        ()=>{
            getUser()
            getProjectsOfEmployee()
            console.log(employeeprojects,"employeeprojects")
        },[]
    )
    return (
        <div className="mentor">
            <Button onClick={handleLogout} style={{backgroundColor: '#ffb600',color:'black'}}>Logout</Button>
            <h1>Hello Employee .</h1>
            {employeeprojects.length===0 && <h3>You are not assigned to any project</h3>}
            <Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="flex-start"
 className="projectcards">
                {employeeprojects?.map((project,index)=>(
                    <Grid item sm={12} md={3} lg={4}>
                        <ProjectCard project={project} setCurrProject={setCurrProject}/>
                    </Grid>
                ))}
                </Grid>
        </div>
    )
}

export default Employee
