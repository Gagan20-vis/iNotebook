import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import modeContext from "../context/notes/noteContext"
export default function Register() {
    const history = useNavigate();
    const [user, setUsers] = useState({ user: "", email: "", password: "" });
    const handleLogin = async (e) => {
        e.preventDefault();
        if (user.email.length === 0) {
            document.getElementById("emailHelp").innerHTML = "Please Enter an email";
            document.getElementById("email").style.border = "2px solid red";
        }
        if (user.password.length === 0) {
            document.getElementById("passwordHelp").innerHTML = "Please Enter a password";
            document.getElementById("password").style.border = "2px solid red";
        }
        if (user.user.length === 0) {
            document.getElementById("nameHelp").innerHTML = "Please Enter a Name";
            document.getElementById("name").style.border = "2px solid red";
        }
        else {
            const response = await fetch(`http://localhost:3000/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: user.user, email: user.email, password: user.password })
            })
            const json = await response.json();
            if (json.success) {
                history("/login");
                swal("User Registered !", "", "success");
            } else {
                history("/register")
                swal(json.message, "", "warning")
            }
        }
    }
    const onChange = (e) => {
        document.getElementById(e.target.name+"Help").innerHTML = "";
        document.getElementById(e.target.name).style.border = "none";
        setUsers({ ...user, [e.target.name]: e.target.value })
    }
    const context = useContext(modeContext);
    const { mode } = context;
    document.body.style.background = (mode === "dark") ? "#091d63" : "white";
    const color = (mode === "dark") ? "white" : "black";
    const bg = (mode === "dark") ? "#8aaaed" : "white";
    return (
        <>
            <h1 className="text-center my-4" style={{ color: color }}>Signup Form</h1>
            <div className='container my-5' style={{ maxWidth: "500px" }}>
                <form className="px-3 " style={{ borderRadius: '10px', boxShadow: 'rgb(0 0 0) 0px 0px 23px 0px', background: bg }} onSubmit={handleLogin}>
                    <div className="form-outline mb-4 pt-4">
                        <input autoComplete="off" type="name" id="user" name="user" className="form-control" placeholder="Name" onChange={onChange} value={user.user} />
                        <div id="userHelp" class="form-text" style={{ color: "red" }}></div>
                    </div>
                    <div className="form-outline mb-4 py-2">
                        <input autoComplete="off" type="email" id="email" name="email" className="form-control" placeholder="Email address" onChange={onChange} value={user.email} />
                        <div id="emailHelp" class="form-text" style={{ color: "red" }}></div>
                    </div>
                    <div className="form-outline mb-4 py-2">
                        <input autoComplete="off" type="password" id="password" name="password" className="form-control" placeholder="Password" onChange={onChange} value={user.password} />
                        <div id="passwordHelp" class="form-text" style={{ color: "red" }}></div>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary btn-block mb-4">Sign up</button>
                    </div>
                    <div className="text-center">
                        <p>Already a member? <Link to="/login">Login</Link></p>
                        <p>or sign up with:</p>
                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-facebook-f"></i>
                        </button>

                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-google"></i>
                        </button>

                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-twitter"></i>
                        </button>

                        <button type="button" className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-github"></i>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
