import { useState } from 'react'
import NoteContext from './noteContext';
const NoteState = (props) => {
    const getNotes = async () => {
        const response = await fetch('http://localhost:3000/fetchNotes', {
            method: 'GET',
            headers: {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();
        setNotes(json);
    }
    const [notes, setNotes] = useState([]);

    const handleAddNote = async (title, description, tag) => {
        await fetch('http://localhost:3000/addNotes', {
            method: 'POST',
            headers: {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: title, description: description, tag: tag }),
        });
        const date = new Date();
        setNotes(notes.concat({ title, description, tag, date }));

    }
    const handleDeleteNote = async (id) => {
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
        await fetch(`http://localhost:3000/deleteNotes/${id}`, {
            method: 'DELETE',
            headers: {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
        })
    }
    const handleEditNote = async (id, title, description, tag) => {
        await fetch(`http://localhost:3000/updateNotes/${id}`, {
            method: 'PUT',
            headers: {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: title, description: description, tag: tag })
        })
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {
            if (notes[index]._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    const [mode, setMode] = useState((!localStorage.getItem('mode')?'light':localStorage.getItem('mode')));
    const toggleMode = (mode) => {
        setMode(mode);
        localStorage.setItem('mode',mode);
    }
    return (
        <NoteContext.Provider value={{ notes, handleAddNote, handleDeleteNote, handleEditNote, getNotes,mode,toggleMode }}>
            {props.children}
        </NoteContext.Provider>
    )
};
export default NoteState;