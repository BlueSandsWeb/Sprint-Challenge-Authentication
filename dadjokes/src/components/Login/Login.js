import React from 'react';

function Login() {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <div><label htmlFor="username"></label><input type="text" /></div>
      <div><label htmlFor="password"></label><input type="text" /></div>
      <button>Submit</button>
    </form>
  )
}

export default Login;