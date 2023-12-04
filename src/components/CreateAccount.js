import React from 'react';

const CreateAccount = () => {
  return (
    <div>
      <div>
        <form action="">
          <div className='mb-3'> 
            <label htmlFor="Name">Name </label>
            <input type="name" placeholder="Enter Name"/>
          </div> 
          <div className='mb-3'>
            <label htmlFor="bloodtype">Blood Type </label>
            <input type="bloodtype" placeholder="Your blood type"/>
          </div>
          <div className='mb-3'> 
            <label htmlFor="email">Email </label>
            <input type="email" placeholder="Enter Email"/>
          </div>
          <div className='mb-3'>
            <label htmlFor="password">Password </label>
            <input type="password" placeholder="Enter Password"/>
          </div>
          <button className='btn btn-default border'>Create Account</button>
        </form>
      </div>
    </div>
  )
}

export default CreateAccount;