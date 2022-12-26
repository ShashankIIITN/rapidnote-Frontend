import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Navbar(props) {
    const Navigate = useNavigate();
    const onLogout=()=>{
        localStorage.removeItem("Token");
        Navigate("/Login");
    }
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{props.title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/">Notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/About">About</Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        {!localStorage.getItem("Token") && <Link className="btn btn-outline-success me-1" type="button" to="/Login">Login</Link>}
                        {!localStorage.getItem("Token") && <Link className="btn btn-outline-success ms-1" type="button" to="/Signup">Signup</Link>}
                        {localStorage.getItem("Token") && <button className="btn btn-outline-success ms-1" type="button" onClick={onLogout}>Logout</button>}    
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar