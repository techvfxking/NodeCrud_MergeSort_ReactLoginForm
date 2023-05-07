import React, { useState } from 'react'

const Login = () => {
    return (
        <>
            <div className='form'>
                LOG-IN
            </div>
            <div className='name'>
                {/*  {/* <div id="hero"> LOG-IN  </div><p>  */}<p>
                    Enter your name :
                    <input type='text '></input><br/>
                    Enter your password :
                    <input type='password' /></p>

            </div>

            <button type='submit' value='Submit' id='submit'>Submit</button>


        </>
    )
}

export default Login;