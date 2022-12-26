import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import NewContext from '../Context/NewContext';

function Auth(props) {
  const Navigate = useNavigate();
  const context = useContext(NewContext);
  const [Luser, setLuser] = useState({email: "", password: ""});

  const onChange =(e) => {
    setLuser({...Luser, [e.target.name]: e.target.value});
  }
  const onSubmit = async (e) => {
    e.preventDefault();

     let Wtoken = await context.Login(Luser.email, Luser.password);

     if (Wtoken.success) {
          localStorage.setItem('Token', Wtoken.resjson.webtokendata);
          Navigate('/');
          context.FetchNotes();
     }else if(("error" in Wtoken.resjson)){ 
        props.showAlert('danger', Wtoken.resjson.error);
      }else{
       props.showAlert('danger', Wtoken.resjson.errors[0].msg);

     } 
  }
  return (
    <>
      <form className='Lgin' onSubmit={onSubmit}>
        <div className="mb-3">
    <h4 className='text-center mb-3' style={{color:'darkblue'}}>Login Page</h4>
          <label htmlFor="LName" className="form-label">Email address</label>
          <input type="email" className="form-control" id="LName" aria-describedby="emailHelp" name="email" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="LPass" className="form-label">Password</label>
          <input type="password" className="form-control" id="LPass" name='password' onChange={onChange}/>
        </div>
        <button type="submit" className="auth-btn" >Submit</button>
      </form>
    </>
  )
}

export default Auth