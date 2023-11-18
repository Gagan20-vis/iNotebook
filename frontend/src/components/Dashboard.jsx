import { useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import modeContext from '../context/notes/noteContext'
export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const context = useContext(modeContext);
    const {mode} = context;
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }
            try {
                const response = await fetch('http://localhost:3000/getUser', {
                    method: 'POST',
                    headers: {
                        'auth-token': token,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [navigate]);
    document.body.style.background = (mode==="dark") ? "#091d63": "white";
    const color = (mode==="dark") ? "white": "black";
    return (
        <div className='container-fluid mx-5 my-5' style={{color:color}}>
            {user && (
                <div className='container mx-6 my-5'>
                    <h1> Hello {user.name}!</h1>
                    <p>Your email is {user.email}</p>
                </div>
            )}
        </div>
    );
}
