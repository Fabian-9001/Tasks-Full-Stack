import React, { useState } from 'react'
import './styles/login.css'
import { useForm } from 'react-hook-form'

const Form = () => {

    const { handleSubmit, register, reset } = useForm()
    const [userData, setUserData] = useState()

    const submit = (data) => {
        setUserData(data)
        reset({
            email: '',
            password: ''
        })
    }

    return (
        <form onSubmit={handleSubmit(submit)} className='login_form'>
            <div>
                <label className='login_form_label' htmlFor="login_form_email">Email</label>
                <input className='login_form_input' type="email" id='login_form_email' placeholder='Enter your email' {...register('email')} />
            </div>
            <div>
                <label className='login_form_label' htmlFor="login_form_password">Password</label>
                <input className='login_form_input' type="password" id='login_form_password' placeholder='Enter your password' {...register('password')} />
            </div>
            <div className='login_form_changePassword'>
                <div>
                    <input className='login_form_checkbox' type="checkbox" id='login_form_checkbox' />
                    <label className='login_form_label' htmlFor="login_form_checkbox">Remember Password</label>
                </div>
                <a href="">Change Password</a>
            </div>
            <div>
                <button className='login_form_button'>Sign In</button>
                <span>Dont have an account?<a href="">Sign up</a></span>
            </div>
        </form>
    )
}

export default Form