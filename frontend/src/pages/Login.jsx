import React from 'react'
import Form from '../components/login/Form'
import '../components/login/styles/login.css'

const Login = () => {
    return (
        <div className='login__section'>
            <div className='login__container'>
                <h1 className='login__title'>Welcome back</h1>
                <p className='login__subTitle'>Enter your details for entrie</p>

                <div className='login__container__form'>
                    <Form />
                </div>
            </div>
            <div className='login__container'>
                <img className='login__img' src="/img/me.png" alt="" />
            </div>
        </div>
    )
}

export default Login