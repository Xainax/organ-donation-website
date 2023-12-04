import React from 'react';
import {Link} from 'react-router-dom';

const UserSignup = () => {
  return (
    <div>
      <div className='mb-3'>
        <form action="">
            <label htmlFor="email">Email </label>
            <input type="email" placeholder="Enter Email"/>

            <label htmlFor="password">Password </label>
            <input type="password" placeholder="Enter Password"/>
            
          <button className='btn btn-success'>Log In</button>
          <Link to="/create-account">
            <button className='btn btn-default border'>Create Account</button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default UserSignup;