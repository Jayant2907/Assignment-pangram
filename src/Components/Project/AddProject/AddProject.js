import React, { useState,useEffect } from 'react'
import {FormControlLabel,Checkbox,Button,Popover} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {  InputLabel, MenuItem  } from "@material-ui/core";
import { makeStyles,TextField } from '@material-ui/core'
import "./AddProject.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import FileBase from "react-file-base64"

const AddProject = ({user,getProjectsOfMentor,setSection}) => {
    const [userId,setUserId] = useState(JSON.parse(localStorage.getItem('profile'))?.data?.id)

      const getMembers = async () => {
        await axios.get(`${process.env.REACT_APP_URL}/get_employee_list`)
        .then((res) =>
        {
            let temp = res?.data?.data
            setMembers(temp?.map((mem) => mem?.email))
        })
        .catch((err) => console.log(err,'Failed To Get Employee List'))
      }

      useEffect(() => { getMembers() } ,[])
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
        const [projectdata,setProjectData]=useState({mentor_id:userId,requirements:"",startDate:new Date(),endDate:new Date(),docs:"",members:[],email:user?.email})
        const [startDate, setStartDate] = useState(new Date());
        const [endDate, setEndDate] = useState(new Date());
        const [selectedFile,setSelectedFile] = useState(null)
        const [members,setMembers] = useState([])


        const onSelect = (selectedList, selectedItem) => 
        {
            setProjectData({...projectdata,members: selectedList})
            console.log(selectedList,members,selectedItem)
        }
        const onRemove = (selectedList, selectedItem) => 
        {
            setProjectData({...projectdata,members: selectedList})
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            await axios.post(`${process.env.REACT_APP_URL}/add_project`,projectdata)
                .then((res) => console.log(res))
                .catch((err) => console.log('Failed To Upload Data'))
                setSection(0)
                getProjectsOfMentor()

        }
    return (
        <div className="add-project">

            <form action="" className="project">
                <div className="requirements">
                    <h3 style={{margin:0}}>Requirements</h3>
                    <TextField onChange={(e) => setProjectData({...projectdata ,  requirements:e.target.value})} multiline rows={5} placeholder="Requirements" type="text" style={{ width:"100%",color:"#2D2D2D", border:"2px solid #2d2d2d", marginBottom:"1.5rem"}} className={classes.root} InputProps={{className: classes.input, disableUnderline: true}} name="requirements"></TextField>
                </div>
                
            <div className="requirements">
            <h3 style={{margin:0}}>Start Date</h3>
            <DatePicker selected={startDate} width={500} style={{ cursor: 'pointer',width:"5rem",color:"#2D2D2D", border:"2px solid #2d2d2d", marginBottom:"1.5rem"}} onChange={(date) => {setStartDate(date);setProjectData({...projectdata ,  startDate:date})}}/>
            </div>
            <div className="requirements">
            <h3 style={{margin:0}}>End Date</h3>
            <DatePicker selected={endDate} width={500} style={{ cursor: 'pointer',width:"5rem",color:"#2D2D2D", border:"2px solid #2d2d2d", marginBottom:"1.5rem"}} onChange={(date) => {setEndDate(date);setProjectData({...projectdata ,  endDate:date})}} />
            </div>
            <div className="requirements">
            <h3 style={{margin:0}}>Add Members</h3>

            <Multiselect
                isObject={false}
                onRemove={onRemove}
                onSelect={onSelect}
                options={members}
                style={{chips:{backgroundColor:'#ffb600'}}}
                
            />
  
            </div>
            <div className="requirements">
            <h3 style={{margin:0}}>Add Documents</h3>
                <FileBase type="file" multiple={true} onDone={({base64}) => {
                setProjectData({...projectdata ,  docs:base64})
                }
                }/>
            </div>
                
            </form>
            <Button onClick={handleSubmit} style={{backgroundColor:'#ffb600',color:'white',marginTop:'2%'}}>Submit</Button>
        </div>
    )
}

export default AddProject