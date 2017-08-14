import React from 'react';

// component that renders content
// this will render when there is a valid user
const Content = (props) => {
  return(
    <div className="content">
      <h2>Welcome, {props.user.name}</h2>
      <button onClick={props.logout}>Click here to log out!</button>
    </div>
  )
}

export default Content;
