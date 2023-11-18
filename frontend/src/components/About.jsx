import {useContext} from 'react'
import modeContext from '../context/notes/noteContext'
export default function About() {
    const context = useContext(modeContext);
    const {mode} = context;
    document.body.style.background = (mode==="dark") ? "#091d63": "white";
    const color = (mode==="dark") ? "white": "black";
    return (
        <div>
            <h1 className='text-center' style={{color:color}}>This is About page</h1>
        </div>
    )
}
