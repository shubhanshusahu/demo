import axios from 'axios'
import React, { useState } from 'react'
import { baseUrl } from '../Registeration'
import {useNavigate} from 'react-router-dom'
export default function Login() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate= useNavigate()
    const checkLogin=()=>{
        if(email ==='' || password ===''){
            alert("Email and password is required!")
        }
        else{  
            axios.post(`${baseUrl}identity/token`,
        {
            "email":email,
            "password":password
        },
        { headers: { 'accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(respo => {
            alert(respo.data.message)
            if(respo.data.failed===false){
                navigate('/home')
                localStorage.setItem('user',JSON.stringify(respo.data.data))
            }
                
            console.log(respo)
        }).catch(e => {
            console.log(e)
            alert(e.response.data.Message)
        })
    }}
  return (
    <div>
          <label>Email id:</label> <input type="email" onChange={e=>{ setemail((e.target.value)) }} value={email}/><br></br>
          <label>passowrd:</label> <input type="passowrd" onChange={e=>{ setpassword((e.target.value)) }} value={password}/><br></br>
          <button type="button" onClick={() => checkLogin()} className="btn"> Login </button>
          <button type="button" onClick={() => navigate('/')} className="btn"> Signup </button>

    </div>
  )
}
