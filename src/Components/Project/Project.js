import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import { Button, makeStyles, TextField } from '@material-ui/core';
import Table from './Table/Table';
import { useHistory } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';
import { useEffect } from 'react';

const Project = ({currproject,isMentor,setCurrProject}) => {
    const [timeline,setTimeline] = useState(new Date());
    const [btnopen,setbtnopen]=useState(false)
    const [task,setTask] = useState([])
    console.log(currproject)

   
    const useStyles = makeStyles({
        root: {
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderBottomColor: "#ffffff"        
            }},
            input:{
                color:"black",
                padding:5,
                
            },
            icon:{
                fill:'black',
            }
        });
        const classes = useStyles();
        const history=useHistory()
        const handleback=()=>{
            if(isMentor){
                history.push('/mentor')
            }
            else{
                history.push('/employee')
            }
        }
        const getProject=async()=>{
            await axios.get(`${process.env.REACT_APP_URL}/get_project/${currproject?.results[0]?.id}`)
        .then((response) =>{
            console.log(response?.data?.data)
            setCurrProject(response.data.data)
        
        })
        }
        const [taskData,setTaskData]=useState({timeline:timeline,task:task})
        useEffect(()=>{
            setTaskData({...taskData,task:task,timeline:timeline})
        },[task,timeline])
        const handleaddtask = async(e)=>{
            e.preventDefault();
            setbtnopen(false)
            await axios.post(`${process.env.REACT_APP_URL}/addtask`,taskData)
            .then((res)=>{console.log(res)})
            .catch((err)=>{console.log(err)})

            getProject()

        }
    return (
        <div style={{display:'flex',flexDirection:'column',justifyContent: 'flex-start',alignItems:'flex-start',width:"100%",height:"100%",padding:"3%"}}>
            <div className="back" onClick={handleback} style={{backgroundColor:"#ffb600",cursor: 'pointer',paddingLeft: 10,display:'flex',alignItems:"center"}}>
            <ArrowBackIosIcon style={{fontSize:20}}/>
            <Button >Go back</Button>
            
            </div>
            
            <div>
                <div className="row" style={{display: 'flex',margin:0}}>
                <h3 style={{marginRight:15}}>Requirements - </h3>
                <h3 style={{fontWeight:"400"}}>{currproject?.results[0]?.requirements}</h3>
                </div>
                <div className="row" style={{display: 'flex',margin:0}}>
                <h3 style={{marginRight:15}}>Start Date - </h3>
                <h3 style={{fontWeight:"400"}}>{currproject?.results[0]?.startDate}</h3>
                </div>
                <div className="row" style={{display: 'flex',margin:0}}>
                <h3 style={{marginRight:15}}>End Date - </h3>
                <h3 style={{fontWeight:"400"}}>{currproject?.results[0]?.endDate}</h3>
                </div>
                <div className="row" style={{display: 'flex',margin:0}}>
                <h3 style={{marginRight:15}}>Mentor - </h3>
                <h3 style={{fontWeight:"400"}}>{currproject?.results[0]?.mentor_email}</h3>
                </div>
                
            </div>
            <div style={{display:'flex',margin:0}}><AddIcon  style={{margin:0}}/><Button style={{margin:0}} onClick={()=>setbtnopen(true)}>ADD TASK</Button></div>
                {btnopen && 
                <div className="addtask">
                <h3 style={{margin:0}}>Add new task</h3>
                <TextField onChange={(e)=>setTask(e.target.value)} multiline rows={2} placeholder="Task" type="text" style={{ width:"100%",color:"#2D2D2D", border:"2px solid #2d2d2d", marginBottom:"1.5rem"}} className={classes.root} InputProps={{className: classes.input, disableUnderline: true}} name="task"></TextField>
                <h3>Timeline</h3>
                <DatePicker selected={timeline} width={500} style={{ cursor: 'pointer',width:"5rem",color:"#2D2D2D", border:"2px solid #2d2d2d", marginBottom:"1.5rem"}} onChange={(date) => setTimeline(date)} />
                <Button style={{color:"#ffb600"}} onClick={handleaddtask}>ADD</Button>
            </div>
                }
            <Table currproject={currproject}/>
        </div>
    )
}

export default Project
