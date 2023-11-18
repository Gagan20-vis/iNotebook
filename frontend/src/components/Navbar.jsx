import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import modeContext from '../context/notes/noteContext';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    const context = useContext(modeContext);
    const {mode,toggleMode} = context;
    const handletoggle = () => {
        toggleMode(mode === "dark" ? "light" : "dark");
    }
    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-dark bg-${mode==="light"?"primary":mode}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <button className='btn btn-dark' style={{ borderRadius: "50px" }} onClick={handletoggle}><i class={`fa-regular fa-1x fa-${mode==="light"?"moon":"sun"}`}></i></button>
                        {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                            <Link className={`btn btn-${mode==="light"?"success":"outline-primary"} mx-2`} type="button" to="/login">Login</Link>
                            <Link className={`btn btn-${mode==="light"?"success":"outline-primary"} mx-2`} type="button" to="/register" >SignUp</Link>
                        </form> :
                            <><Link to="/dashboard"><i class="fa-regular fa-user fa-2x mx-4" style={{ color: "#ffffff" }}></i></Link><button className={`btn btn-${(mode==="dark"? "outline-primary": "danger")} mx-2`} type="button" onClick={handleLogout}>Logout</button></>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
