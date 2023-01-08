import React, { useState } from 'react'
import './styles/login.css'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

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

    useEffect(() => {

    }, [])

    console.log(userData)

    return (
        <form onSubmit={handleSubmit(submit)} className='login__form'>
            <div>
                <label className='login__form__label' htmlFor="login__form__email">Email</label>
                <input className='login__form__input' type="email" id='login__form__email' placeholder='Enter your email' {...register('email')} />
            </div>
            <div>
                <label className='login__form__label' htmlFor="login__form__password">Password</label>
                <input className='login__form__input' type="password" id='login__form__password' placeholder='Enter your password' {...register('password')} />
            </div>
            <div className='login__form__configuration'>
                <div>
                    <input className='login__form__checkbox' type="checkbox" id='login__form__checkbox' />
                    <label className='login__form__label' htmlFor="login__form__checkbox">Remember Password</label>
                </div>
                <a href="">Change Password</a>
            </div>
            <div className='login__form__sign'>
                <button className='login__form__button'>Sign In</button>
                <p>Dont have an account? <a href="">Sign up</a></p>
            </div>
        </form>
    )
}

export default Form