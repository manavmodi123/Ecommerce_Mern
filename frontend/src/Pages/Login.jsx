import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData , setFormData] = useState({
    email:"",
    password:""
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async () => {
    console.log(formData)
    let responseData;
    await fetch('http://localhost:4000/login' ,{
      method: 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    }).then((response) =>response.json()).then((data) => responseData=data);
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.error);
    }
  }
  

  return (
    <div className='bg-customPink w-full h-screen flex justify-center items-center'>
      <div className='bg-white w-[500px] h-[500px] p-6 -mt-10 shadow-lg font-serif'>
        <h1 className='mt-5 text-2xl font-semibold ml-2'>Sign In</h1>
        <div className='flex flex-col my-10 '>
          <input type='email' name='email'  placeholder='Email Address' className='border-[2px] py-3 px-2 mx-2 mb-6 text-[13px] h-14' onChange={handleInputChange}/>
          <input type='password' name='password'  placeholder='Password' className='border-[2px] py-3 px-2 mx-2 mb-6  text-[13px] h-14' onChange={handleInputChange}/>
          <div className="flex mb-2 ml-2 gap-2">
            <input type="checkbox" />
            <p className="text-gray-500 text-[14px]">
              By Continuing , I agree to the terms of use & privacy policy
            </p>
          </div>
          <button className='bg-red-500 text-white mx-2 h-10 mb-2' onClick={handleSubmit}>Continue</button>
          <p className='ml-2 text-gray-500'>Create an Account? <Link to='/register'><span className='text-red-700 cursor-pointer'>Click here</span></Link></p> 
        </div>
        
      </div>
    </div>
  )
}

export default Login
