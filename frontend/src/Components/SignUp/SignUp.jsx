import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/account";
import '../Login/Login.css';
import { UserContext } from "../userContext";
export const SignUp = () => {
    const [first_name, setfirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [email, setEmail] = useState("");
    const [rUser, setRUsername] = useState("");
    const [password, setpassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isFarmer, setIsFarmer] = useState(false);


    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    
    const handleSubmit = () =>{
        register({first_name, last_name, email, rUser, password, isFarmer}).then((res)=>{
            userContext.setUserData(res.data);
            navigate("/dashboard");
        })
    }
    return <form>
        <div className="login-container">
            <div className="text-center fs-3 fw-bold mb-4">Sign up</div>
            <div className="row mb-4 align-items-end">
                <div className="col">
                    <label htmlFor="first_name">First Name</label>
                    <input type="text"
                        className="form-control"
                        value={first_name}
                        name="first_name"
                        id="first_name"
                        onChange={e => setfirst_name(e.target.value)} />
                </div>
                <div className="col">
                    <label htmlFor="last_name">Last Name</label>
                    <input type="last_name"
                        className="form-control"
                        value={last_name}
                        name="last_name"
                        id="last_name"
                        onChange={e => setlast_name(e.target.value)} />
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
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        className="form-control"
                        value={password}
                        name="password"
                        id="password"
                        onChange={e => setpassword(e.target.value)} />
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
            <div className="row flex align-items-end mt-4">
                <div className="col">
                    <input className="form-check-input" type="checkbox" value={isFarmer} id="isFarmer" />
                    <label className="form-check-label ms-2" htmlFor="isFarmer">
                        Sign up as farmer
                    </label>
                </div>
            </div>
            <button type="button" className="btn btn-primary mb-4 mt-4" onClick={handleSubmit}>Sign up</button>
            <div className="text-center">
                <span>Already have an account? </span><Link to="/login">Login</Link>
            </div>

        </div>
    </form>
}