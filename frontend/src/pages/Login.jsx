import React from 'react'
import Form from '../components/login/Form'
import '../components/login/styles/login.css'

const Login = () => {
    return (
        <div className='login_section'>
            <div className='login_container'>
                <h1>Welcome back</h1>
                <p>Enter your details for entrie</p>
                <Form />
            </div>
            <div className='login_container'>
                <img className='login_img' src="https://i.pinimg.com/736x/f0/cf/3c/f0cf3ca5520b735df72753235ad4af57.jpg" alt="" />
            </div>
        </div>
    )
}

export default Login