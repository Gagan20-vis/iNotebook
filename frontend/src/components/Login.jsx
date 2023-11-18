import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import modeContext from "../context/notes/noteContext"
export default function Login() {
    const history = useNavigate();
    const [user, setUsers] = useState({ email: "", password: "" });
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
        else {
            const response = await fetch(`http://localhost:3000/login`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: user.email, password: user.password })
            })
            const json = await response.json();
            if (json.error) {

            }
            if (json.success) {
                localStorage.setItem("token", json.token);
                history("/");
            }
            else {
                history("/login")
                swal(json.message, "", "warning");
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
        <div>
            <h1 className="text-center mt-4" style={{ color: color }}>Login Form</h1>
            <div className='container my-5' style={{ maxWidth: "500px" }}>
                <form onSubmit={handleLogin} className="px-3 py-3" style={{ borderRadius: '10px', boxShadow: 'rgb(0 0 0) 0px 0px 23px 0px', background: bg }}>
                    <div className="form-outline my-4">
                        <input autoComplete="off" type="email" id="email" name="email" value={user.email} onChange={onChange} className="form-control" placeholder="Email address" />
                        <div id="emailHelp" class="form-text" style={{ color: "red" }}></div>
                    </div>
                    <div className="form-outline mb-4">
                        <input autoComplete="off" type="password" id="password" name="password" value={user.password} onChange={onChange} className="form-control" placeholder="Password" />
                        <div id="passwordHelp" class="form-text" style={{ color: "red" }}></div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                                <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                            </div>
                        </div>

                        <div className="col-4">
                            <a href="#!">Forgot password?</a>
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                    </div>
                    <div className="text-center">
                        <p>Not a member? <Link to="/register">Register</Link></p>
                        <p>or login with:</p>
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
        </div>
    )
}
