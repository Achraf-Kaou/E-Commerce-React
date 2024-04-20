import { Link } from 'phosphor-react';
import React from 'react'

const ErrorPage = () => {
  return (
    <div className='container'>
        <div>
            <h2>404</h2>
            <h2>You're lost!</h2>
            <p>
            Oops! Something went wrong. 
            We apologize for the inconvenience.
            </p>
            <Link to='./shop'>
                <button>GO BACK TO HOME</button>
            </Link>
            
        </div>
      
    </div>
  )
}

export default ErrorPage;
