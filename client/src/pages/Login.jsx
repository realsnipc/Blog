import React, { useState , useContext} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {UserContext} from '../UserContext'
import{Button} from '@nextui-org/react'

function Login() {

// login form
  const [username,setUsername]= useState("")
  const [password,setPassword]= useState("")

  const [redirect,setRedirect]= useState(false) // check if user should be redirected to home

  const {setUserInfo}= useContext(UserContext) //userInfo context
  const backendUrl= import.meta.env.VITE_SERVER || "http://localhost:7777"

  // Authenticate 
  async function login() {
    const response = await fetch(backendUrl+'/login',{
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include'
    })

    if (response.ok){
      // Login Successful
      response.json().then(userinfo =>{
        // Set userInfo after user authenticated successfully
        setUserInfo(userinfo)
        setRedirect(true)
      })
      
    }else if (response.notExist){
      // User don't exist
      alert("User don't exist")
    }else if (response.wrongPassword){
      // Wrong Password
      alert("Wrong Password")}
    else{
      // Unknown Error
      alert("Invalid Credentials")
    }
  }


  // redirects to home is redirect==true
  if (redirect){
    return <Navigate to='/'/>
  }
  return (
    <div className="flex justify-center flex-col items-center animated tdFadeIn font-work">
      <h1 className='font-work text-2xl font-bold'>Sudo Login</h1>

      <form action="" className='flex flex-col'>

        <input type="text" placeholder='username'name="" className='bg-bg border-solid border-gray-500 border rounded-md h-8 mt-5 p-3 ' value={username} onChange={(event=>{
          setUsername(event.target.value)
        })}/>
        <input type="text" placeholder='password'className="bg-bg border-solid border-gray-500 border rounded-md mt-1 h-8 p-3" value={password}onChange={(event=>{
          setPassword(event.target.value);
        })}/>

        <Button color='primary' className="mt-2" onPress={login}>Login</Button>

      </form>
      or
<Button color='primary'>Guest login</Button>

      
    </div>
  )
}

export default Login