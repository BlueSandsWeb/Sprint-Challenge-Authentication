import React from 'react';

function Register() {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <div><label htmlFor="username"></label><input type="text" /></div>
      <div><label htmlFor="password"></label><input type="text" /></div>
      <button>Submit</button>
    </form>
  )
}

export default Register;