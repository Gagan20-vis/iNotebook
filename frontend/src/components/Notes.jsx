import { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NotesItems from "./NotesItems";
import { useNavigate } from "react-router-dom";
export default function Notes() {
    const navigate = useNavigate();
    if(!localStorage.getItem('token')) navigate('/login');
    const context = useContext(noteContext);
    const { notes, getNotes, handleEditNote,mode } = context;
    const [note, setNote] = useState({ eid: "", etitle: "", edescription: "", etag: "" });
    useEffect(() => {
        if(localStorage.getItem('token'))
            getNotes();
        else
            navigate('/login');
    }, []);
    const handleEditClick = (e) => {
        swal("Note Edited!", "", "success")
        Closeref.current.click();
        console.log("Editing notes", note)
        handleEditNote(note.eid, note.etitle, note.edescription, note.etag);
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const updateNote = (currentNote) => {
        setNote({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }
    document.body.style.background = (mode==="dark") ? "#091d63": "white";
    const color = (mode==="dark") ? "white": "black";
    const Closeref = useRef(null);
    return (
        <>
            <div className="modal fade" tabIndex="-1" id='staticBackdrop' >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Note</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Add a Note</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} autoComplete="off" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} autoComplete="off" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={Closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleEditClick}>Updte</button>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <h1 style={{color:color}}>Your Notes</h1>
            <hr />
            <div className="row contianer-fluid">
                {notes.map((note, index) => {
                    return (
                        <>
                            <NotesItems note={note} updateNote={updateNote} />
                        </>
                    )
                })}
            </div>
        </>
    )
}
