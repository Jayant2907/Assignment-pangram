import React, { useState,useEffect } from 'react'
import { Button, makeStyles , TextField  } from '@material-ui/core'
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { passwordStrength } from 'check-password-strength';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from '@material-ui/core/InputAdornment';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator'
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import {signup,signin} from "../../actions/auth"

import "./Login.css"
const Login = ({isMentor,isSignup,setIsSignup}) => {
    
    const dispatch = useDispatch()
    const history = useHistory()

    const [showpassword,setshow]=useState(false);
    const [formData,setFormData] = useState({ email:"" ,phone:"", password: "" , confirmPassword:"" , isMentor:1});
    const [formData1,setFormData1] = useState({ email:"" ,password: "",isMentor:isMentor });
    const [alert,setAlert] = useState({show:false,msg:''});
    const [check,setCheck]=useState(false);
    const [col,setcol]=useState("red");
    useEffect(() => {
        setFormData({...formData , isMentor: isMentor})
        setFormData1({...formData1,isMentor:isMentor})
    },[isMentor])
    
    const handleshow=()=>{
        setshow((prev)=>!prev);
    }
    const handleChange = (e) =>
    {
        if(passwordStrength(formData.password).value==="Weak"||passwordStrength(formData.password).value==="Too weak"){
         setAlert({show:true,msg:"Your password Strength is "+passwordStrength(formData.password).value})   
        }
        else if(passwordStrength(formData.password).value==="Medium"){
            setcol("orange")
            setAlert({show:true,msg:"Your password Strength is "+passwordStrength(formData.password).value})

        }
        else{
            setcol("green")
            setAlert({show:true,msg:"Your password Strength is "+passwordStrength(formData.password).value})

        }
        setFormData({...formData , [e.target.name]: e.target.value})
    }
    const handleChange1 = (e) =>
    {
        setFormData1({...formData1 , [e.target.name]: e.target.value})
    }
    const notify = (msg) => 
    toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

    const useStyles = makeStyles({
        root: {
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderBottomColor: "#ffffff"        
            }},
            input:{
                color:"white",
                
            },
            icon:{
                fill:'white',
            }
        });
        const classes = useStyles();
        let valueReturned;
        const handleSignup= async (e)=> {
            e.preventDefault();
            console.log('here');         
            if(isSignup)

            {
                if(formData.email === "" || formData.phone_no === "" || formData.password === "" || formData.confirmPassword === "")
                        {
                          console.log("Please Fill The Details")
                            notify('Please Fill The Details');
                        }
                else
                {
                        
                              
                            if (validator.isEmail(formData.email) && validator.isMobilePhone(formData.phone_no)) 
                            {
                                console.log("validated",formData)
                                valueReturned=await dispatch(signup(formData  , history,isMentor))
                                console.log(valueReturned,"valueReturned")
                    
                                if(valueReturned?.status && (valueReturned?.status==="User Already Exists"||valueReturned?.status==="invalid inputs" || valueReturned?.status==="Passwords do not match" ))
                                {
                                    
                                    // setAlert({show:true,msg:valueReturned?.status})
                                    console.log(valueReturned?.status,"valueReturned?.status")
                                    notify(valueReturned?.status);
                                    // localStorage.clear()
                                }
                                else{
                                        
                                    
                                    if(isMentor){
                                        history.push("/mentor")
                                    }
                                    else{
                                        history.push("/employee")
                                    }







                                    
                              
                                }
                               
                            } 
                            else 
                            {
                                if(!validator.isEmail(formData.email))
                                {
                                    // setAlert({show:true,msg:"Enter Valid Email"})'
                                    console.log("Email not validated")
                                    notify("Enter Valid Email");
                                }
                                else
                                {
                                    // setAlert({show:true,msg:"Enter Valid Mobile Number"})
                                    console.log("Mobile Number not validated")
                                    notify("Enter Valid Mobile Number");
                                }
                            }      
                        }
                       
                                          
            
            }
            else
            {
                console.log('i am here');
                if(formData1.email === "" || formData1.password === "" )
                {
                    // setAlert({show:true,msg:'Please Fill The Details'})
                    notify('Please Fill The Details');
                }
                else
                {
                    setFormData1({...formData1,isMentor:isMentor})
                    valueReturned=await dispatch(signin(formData1 , history,isMentor))
                    console.log(isMentor,"isMentor",formData1)
                    if(valueReturned?.status && (valueReturned?.status==="Password Incorrect"||valueReturned?.status==="User doesn't exists" ||valueReturned?.status==="Type Incorrect"|| valueReturned?.status=== "Please Check your email for verification link"))
                    {
                        // setAlert({show:true,msg:valueReturned?.status})
                        notify(valueReturned?.status);
                        // localStorage.clear()

                    }
                }            
            }
    

        
    }

        

    return (
        <>
        <div className="login">
            {
                isSignup
                ?
                <>
                <TextField onChange={handleChange} placeholder="E-mail Id" type="email" style={{ width:"100%",color:"#2D2D2D", borderBottom:"2px solid #ffffff", borderBottomColor:"#ffffff", marginBottom:"1.5rem"}} className={classes.root} InputProps={{className: classes.input, disableUnderline: true}} name="email"></TextField>
            <TextField onChange={handleChange} placeholder="Mobile No" type="number" style={{ width:"100%",color:"#2D2D2D", borderBottom:"2px solid #ffffff", borderBottomColor:"#ffffff", marginBottom:"1.5rem"}} className={classes.root} InputProps={{className: classes.input, disableUnderline: true}} name="phone_no"></TextField>
            <TextField onChange={handleChange} placeholder="Password(Length Min 8 and have special character , both cases and numbers)" type={showpassword?"text":"password"}  style={{ width:"100%",color:"#2D2D2D", borderBottom:"2px solid #ffffff", borderBottomColor:"#ffffff", marginBottom:"1.5rem"}} className={classes.root} InputProps={{className:classes.input, disableUnderline:true,endAdornment:<InputAdornment style={{cursor:'pointer'}} onClick={handleshow} >{showpassword?<Visibility/>:<VisibilityOff />}</InputAdornment>}} name="password"></TextField>                          
            <TextField onChange={handleChange} placeholder="Confirm Password" type="password"  style={{ width:"100%",color:"#2D2D2D", borderBottom:"2px solid #ffffff", borderBottomColor:"#ffffff" }} className={classes.root} InputProps={{className: classes.input, disableUnderline: true}} name="confirmPassword"></TextField>
            <Button className="login-button"  onClick={handleSignup}>Sign Up as {isMentor ? "Mentor":"Employee"}</Button>
            <h3 style={{color:'white',fontWeight:"600"}}>Already a mentor ? <span style={{color:"#ffb600",cursor:"pointer"}} onClick={()=>setIsSignup(false)}>Sign In</span></h3>
            </>
            :
            <>
                <TextField onChange={handleChange1} name="email" placeholder="E-mail Id" type="email" style={{ width:"100%",color:"#2D2D2D", borderBottom:"2px solid #ffffff", borderBottomColor:"#ffffff", marginBottom:"2rem"}} className={classes.root} InputProps={{className: classes.input, disableUnderline: true}}></TextField> 
                <TextField onChange={handleChange1} name="password" placeholder="Password" type={showpassword?"text":"password"}   style={{ width:"100%",color:"#2D2D2D", borderBottom:"2px solid #ffffff", borderBottomColor:"#ffffff"}} className={classes.root} InputProps={{className:classes.input, disableUnderline:true,endAdornment:<InputAdornment style={{cursor:'pointer'}} onClick={handleshow} >{showpassword?<Visibility/>:<VisibilityOff />}</InputAdornment>}}></TextField>

                <Button className="login-button" onClick={handleSignup} >Sign In as {isMentor ? "Mentor":"Employee"}</Button>
                <h3 style={{color:'white',fontWeight:"600"}}>New mentor ? <span style={{color:"#ffb600",cursor:"pointer"}} onClick={()=>setIsSignup(true)}>Sign Up</span></h3>
            </>
            }
           
        </div>
         <ToastContainer/>
        </>
    )
}

export default Login