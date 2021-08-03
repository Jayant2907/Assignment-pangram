import * as api from "../api/axios"
import axios from "axios"


export const signin = (formData , history,isMentor) => async (dispatch) =>
{
    // console.log(formData,"formData")
    try{
        console.log(formData,"formData")
        const {data} = await api.signIn(formData)
        console.log(data.status,"auth.js",isMentor)
        if(data.status === "Password Incorrect" || data.status === "User doesn't exists" || data.status === "Type Incorrect"||data.status=== "Please Check your email for verification link")
        {
            dispatch({type: "AUTH" , data})
            // localStorage.clear()
            return data

        }
        else
        {
            dispatch({type: "AUTH" , data})      
            if(isMentor){
                history.push("/mentor")
            }
            else{
                history.push("/employee")
            }
            
        }
    }
    catch(error)
    {
        console.log(error)
    }
}
   
export const signup = (formData  ,history,isUser) => async (dispatch) =>
{
    console.log(formData,"signup")
    try{
        const {data} = await api.signUp(formData)
        // await axios.post().then().catch()
        console.log(data, ' joo');
        if(data.status === "User Already Exists" || data.status === "Passwords do not match")
        {
            await dispatch({type: "AUTH" , data})
            console.log(data)
            return data;  
        }
        else
        {
            let temp,temp1;
            dispatch({type: "AUTH" , data})

            if(data?.status==="User Created")
            {
                temp=data?.data.id;
                console.log(temp)
                return data
      
            }
            
        }
        //token and status
        
    }
    catch(error)
    {
        console.log(error)
    }
}