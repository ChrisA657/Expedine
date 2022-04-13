import { useState } from "react";
import { Link } from "react-router-dom";
import '../Login/Login.css';
export const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [rUser, setRUsername] = useState("");
    const [rPassword, setRPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    
    

    return <form>
        <div className="login-container">
            <div className="text-center fs-3 fw-bold mb-4">Sign up</div>

            <div className="row mb-4 align-items-end">
                    <div className="col">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text"
                                className="form-control"
                                value={firstName}
                                name="firstName"
                                id="firstName"
                                onChange={e => setFirstName(e.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="lastName"
                               className="form-control"
                               value={lastName}
                               name="lastName"
                               id="lastName"
                               onChange={e => setLastName(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-4 align-items-end">
                    <div className="col">
                        <label htmlFor="user">Username</label>
                        <input type="text"
                                className="form-control"
                                value={rUser}
                                name="rUser"
                                id="rUser"
                                onChange={e => setRUsername(e.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                               className="form-control"
                               value={email}
                               name="email"
                               id="email"
                               onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="row align-items-end">
                    <div className="col">
                        <label htmlFor="rPassword">Password</label>
                        <input type="password"
                               className="form-control"
                               value={rPassword}
                               name="rPassword"
                               id="rPassword"
                               onChange={e => setRPassword(e.target.value)} />
                    </div>
                    <div className="col">
                        <label htmlFor="cPassword">Confirm Password</label>
                        <input type="password" className="form-control"
                                value={cPassword}
                                name="cPassword"
                                id="cPassword"
                                onChange={e => setCPassword(e.target.value)} />
                    </div>
                </div>
                <button type="button" className="btn btn-primary mb-4 mt-4" >Sign up</button>
                <div className="text-center">
                    <span>Already have an account? </span><Link to="/login">Login</Link>
                </div>
           
        </div>
    </form>
}