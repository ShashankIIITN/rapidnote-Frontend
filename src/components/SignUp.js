import React, { useContext, useState } from 'react';
import NewContext from '../Context/NewContext';
import {useNavigate} from 'react-router-dom';


function Signup(props) {
  const Navigate = useNavigate();
  const context = useContext(NewContext);
  const [Nuser, setNuser] = useState({ name: "", email: "", password: "", cpassword: "" });

  const onChange =(e) => {
    setNuser({...Nuser, [e.target.name]: e.target.value});
  }
  const onSubmit = async (e) => {
    e.preventDefault();
      if(Nuser.password !== Nuser.cpassword)
      {
        props.showAlert('danger', "password and Confirm password doesn't match!");
          return;
      }

     let Wtoken = await context.SignUp(Nuser.name, Nuser.email, Nuser.password);

     if (Wtoken.success) {
       await context.FetchNotes();
          localStorage.setItem('Token', Wtoken.resjson.webtokendata);
          Navigate('/');
     }else if(("error" in Wtoken.resjson)){
        props.showAlert('danger', Wtoken.resjson.error);
      }else{
       props.showAlert('danger', Wtoken.resjson.errors[0].msg);

     }
  }
  return (
    <>
      <form className='Lgin' onSubmit={onSubmit} style={{marginTop:'4vh'}}>
          <h4 className='text-center mb-3' style={{ color: 'darkblue' }}>Signup Page</h4>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
          <input type="text" className="form-control" id="Nname" onChange={onChange} name="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="NEmail" onChange={onChange} name="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="Npass" onChange={onChange} name="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="NCpass" onChange={onChange} name="cpassword" />
        </div>
        <button type="submit" className="auth-btn">Submit</button>
      </form>
    </>
  )
}

export default Signup